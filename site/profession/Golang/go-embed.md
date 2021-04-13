---
title: Go embed 简介
---

# Go embed 简介

在刚刚发布的 Go 1.16 版本更新中，加入了 `embed` 功能，可以将静态资源文件直接打包到二进制可执行文件中，真正实现单个二进制文件部署。这篇文章主要简单地介绍一下 `embed` 的用法。

## 引入文件

### 引入单个文件

我们可以直接将单个资源文件作为字符串、字节切片或者文件系统引入到代码中：

```go
import "embed"

//go:embed hello.txt
var s string

//go:embed hello.txt
var b []byte

//go:embed hello.txt
var f embed.FS
```

### 引入文件夹

也可以引入一整个文件夹，但是，文件夹只能以文件系统的形式引入：

```go
import "embed"

//go:embed html
var content embed.FS
```

### 说明

使用相对路径引入文件，相对路径的根路径是 Go 源代码所在的文件夹。

文件或文件夹的名称可以使用通配符 `*`，表示同时引入多个文件或文件夹下的全部文件，默认情况下，任何以 `.` 或 `_` 开头的文件或文件夹不会被引入，但使用通配符后将无视这一规则。

`go:embed` 指令后可以接多个文件以及文件夹，这个指令本身也可以连续出现多次。

```go
import "embed"

//go:embed image/* template/*
//go:embed html/index.html
var content embed.FS
```

## 使用文件

引入文件后就可以使用文件，`embed.FS` 文件系统是一种只读的文件系统，只提供了以下三种 API：

```go
func (f FS) Open(name string) (fs.File, error)

func (f FS) ReadFile(name string) ([]byte, error)

func (f FS) ReadDir(name string) ([]fs.DirEntry, error)
```

分别用来打开文件、读文件以及读文件夹。

## 应用

`embed` 可以很好地将静态的网页文件嵌入二进制可执行文件中。

```go
package main

import (
	"embed"
	"io/fs"
	"net/http"
)

//go:embed html
var context embed.FS

func main() {
	htmlFS, _ := fs.Sub(context, "html")
	http.Handle("/", http.FileServer(http.FS(htmlFS)))
	http.ListenAndServe(":80", nil)
}
```
