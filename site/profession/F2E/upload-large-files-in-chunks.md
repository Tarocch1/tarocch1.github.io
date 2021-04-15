---
title: 前端大文件分片上传的实现
---

# 前端大文件分片上传的实现

为了方便管理服务器文件，之前用 Go 写了一个简易的文件管理工具。最近 Go 1.16 发布，就想借着 `embed` 特性，重构一下这个工具，可以将前端做的好看一些，也可以加一些功能。在重构的过程中，想到之前只是听说过但是没实际做过的大文件分片上传，于是决定在这个项目上尝试一下。

在原理上来说，大文件分片上传这一需求，需要前后端配合实现。前端需要把文件切片，将每一个切片分别上传到服务器，并且需要标记切片的顺序；后端将每一个切片按特定格式保存好，最终将所有切片合成成一个完整的文件。原理并不复杂，下面看具体实现[^1]。

## 前端实现

前端的核心是使用 [`Blob.prototype.slice()`](https://developer.mozilla.org/en-US/docs/Web/API/Blob/slice) API 将文件切片。为了调用方便，我们定义一个 `Uploader` 类，构造函数需传入文件等其他信息，在初始化的时候将文件切片。

```js {.line-numbers}
function Uploader(options) {
  this.options = options;
  this.chunks = [];
  this.uploadingChunks = 0; // 正在上传的分块数量
  this.curChunk = 0; // 分块指针
  this.cancelTokens = []; // axios 的 cancel token
  this._createChunks();
  return this;
}

Uploader.prototype._createChunks = function () {
  const size = this.options.chunkSize || defaultChunkSize;
  let cur = 0;
  while (cur < this.options.file.size) {
    this.chunks.push({
      file: this.options.file.slice(cur, cur + size),
      loaded: 0,
    });
    cur += size;
  }
};
```

之后编写一个暴露的 `start` 函数，让我们可以手动调用开始上传。这里我设计的逻辑是先调一个开始上传的接口，后端这时应该根据文件名信息创建一个用于存放切片的文件夹，之后上传的切片都保存在这个文件夹里。

```js {.line-numbers}
Uploader.prototype.start = function () {
  startUpload(this.options.path).then(res => {
    if (!res.erred) {
      for (let i = 0; i < (this.options.thread || defaultThread); i++) {
        this._uploadChunk();
      }
    } else {
      typeof this.options.onError === 'function' &&
        this.options.onError(res.message);
    }
  });
};
```

接口返回正常后开始上传分片，`_uploadChunk` 函数将分片指针指向的分片上传到服务器上，获取到分片后，移动分片指针，开始上传，上传完后，继续调用 `_uploadChunk` 函数上传剩下的分片，如果遇到错误，应该停止。上传过程中监听 `progress` 事件，从事件参数的 `loaded` 字段拿到该分片已上传的字节数，方便计算进度。根据线程设置调用若干次该函数开启若干个上传线程。

```js {.line-numbers}
Uploader.prototype._uploadChunk = function () {
  if (this.uploadingChunks >= (this.options.thread || defaultThread)) return;
  if (this.curChunk >= this.chunks.length) {
    if (this.uploadingChunks === 0) {
      this._end();
    }
    return;
  }
  const id = this.curChunk;
  const chunk = this.chunks[id];
  const cancelSource = CancelToken.source();
  this.cancelTokens.push(cancelSource);
  uploadChunk(this.options.path, id, chunk.file, cancelSource.token, e => {
    this.chunks[id].loaded = e.loaded;
    this._onProgress();
  }).then(res => {
    if (!res.erred) {
      this._onProgress();
      this.uploadingChunks--;
      this._uploadChunk();
    } else {
      this._cancel();
      typeof this.options.onError === 'function' &&
        this.options.onError(res.message);
    }
  });
  this.uploadingChunks++;
  this.curChunk++;
};

// 取消所有正在上传的请求
Uploader.prototype._cancel = function () {
  this.cancelTokens.forEach(source => {
    source.cancel();
  });
};

// 计算总体上传进度
Uploader.prototype._onProgress = function () {
  const loaded = this.chunks.reduce((acc, chunk) => acc + chunk.loaded, 0);
  typeof this.options.onProgress === 'function' &&
    this.options.onProgress({ loaded });
};
```

所有分片上传完后，调用服务器接口，通知服务器上传完毕，将所有分片合成成完整的文件。

```js {.line-numbers}
Uploader.prototype._end = function () {
  endUpload(this.options.path).then(res => {
    if (!res.erred) {
      typeof this.options.onSuccess === 'function' && this.options.onSuccess();
    } else {
      typeof this.options.onError === 'function' &&
        this.options.onError(res.message);
    }
  });
};
```

## 后端实现

后端我这里使用 Go 编写，主要是三个接口，整体比较简单。

首先是开始上传的接口，在上传路径目录下建立一个同名文件夹。

```go {.line-numbers}
func uploadStartHandler(c echo.Context) error {
	var body map[string]interface{}
	c.Bind(&body)
	targetPath, err := getTargetPath(body["path"].(string))
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	if isDir, err := pathIsDir(targetPath); err != nil && !os.IsNotExist(err) {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	} else if isDir {
		return endWithError(c, 3)
	}
	err = os.RemoveAll(targetPath)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	err = os.MkdirAll(targetPath, 0777)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	return end(c, http.StatusOK, 0, "SUCCESS", nil)
}
```

上传分片的接口比较简单，将上传的分片数据保存到刚建立的文件夹中，并给文件名添加从 0 开始按顺序排列的后缀。

```go {.line-numbers}
func uploadChunkHandler(c echo.Context) error {
	path := c.QueryParam("path")
	id := c.QueryParam("id")
	targetPath, err := getTargetPath(path)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	bytes, err := io.ReadAll(c.Request().Body)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	filePath := filepath.Join(targetPath, filepath.Base(targetPath)+"."+id)
	err = os.WriteFile(filePath, bytes, 0777)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	return end(c, http.StatusOK, 0, "SUCCESS", nil)
}
```

最后是结束上传的接口，这个接口应该将所有的分片组合起来。这里需要注意的是，由于之前创建了与文件同名的文件夹用于保存分片，所以这里在合成文件的时候，应先在文件后加后缀 `.UPLOADING`，这样才能正常创建文件，合并完后，将原文件夹删除，再把 `.UPLOADING` 后缀去掉即可。

```go {.line-numbers}
func uploadEndHandler(c echo.Context) error {
	var body map[string]interface{}
	c.Bind(&body)
	targetPath, err := getTargetPath(body["path"].(string))
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	tempTargetPath := targetPath + ".UPLOADING"
	file, err := os.Create(tempTargetPath)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	defer file.Close()
	var id int64 = 0
	for {
		filePath := filepath.Join(targetPath, filepath.Base(targetPath)+"."+strconv.FormatInt(id, 10))
		if pathNotExist(filePath) {
			break
		}
		bytes, err := os.ReadFile(filePath)
		if err != nil {
			return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
		}
		file.Write(bytes)
		id++
	}
	err = os.RemoveAll(targetPath)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	err = os.Rename(tempTargetPath, targetPath)
	if err != nil {
		return end(c, http.StatusInternalServerError, -1, err.Error(), nil)
	}
	return end(c, http.StatusOK, 0, "SUCCESS", nil)
}
```

[^1]: 本文代码均从实际项目中直接摘抄而来，使用了一些项目封装的函数，所以无法直接运行，但不影响代码逻辑及实现方式的展示。
