#### 为什么选择Nginx

1.作为Web服务器：相比较Apache,Nginx使用更是的资源，支持更多的并发连接，高达5万个

2.作为负载均衡的服务器

3.作为邮件代理服务器

#### 什么是Nginx

Nginx是开源且高性能，可靠的HTTP中间件，代理服务。

#### 类似的HTTP服务

- HTTPD（Apache）

- IIS（微软）
- GWS（Google）

#### 使用Nginx的原因

- IO的多路复用epoll，没有最大连接数限制（其他方式还有：select-有最大连接数限制,poll）

- 轻量级（功能模块少、代码模块化）

- CPU的亲和（affinity）

- sendfile

#### Nginx日志类型

- error_log
- access_log

log_format 可以指定日志输出的格式

```
log_format main[格式名称] '$http_user'
access_log logs/access.log[路径]  main
```

#### Nginx变量

- HTTP请求变量-arg_PARAMETER    http_HEEADER    sent_http_HEADER

- 内置变量-Nginx内置的变量

- 自定义变量、

  

#### Nginx模块

1. 模块分为Nginx模块和第三方模块

