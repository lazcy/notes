#### cd 1.安装编译工具及库文件

```python
yum -y install make zlib zlib-devel gcc-c++ libtool  openssl openssl-devel
yum -y install wget     #下载包用
yum install lrzsz -y    # 允许window上传文件到linux
yum install -y unzip zip  #压缩和解压缩zip文件
```

#### 2.安装PCRE

PCRE作用是让Nginx支持Rewrite功能。

###### 下载安装包

```python
[root@bogon src]# cd /usr/local/src/
[root@bogon src]# wget http://downloads.sourceforge.net/project/pcre/pcre/8.35/pcre-8.35.tar.gz
```

###### 解压安装包

```python
[root@bogon src]# tar zxvf pcre-8.35.tar.gz
```

###### 进入安装目录

```python
[root@bogon src]# cd pcre-8.35
```

###### 编译安装

```python
[root@bogon pcre-8.35]# ./configure
[root@bogon pcre-8.35]# make && make install
```

###### 查看安装版本

```python
[root@bogon pcre-8.35]# pcre-config --version
```

#### 3.安装Nginx

###### 下载安装包

```
[root@bogon src]# cd /usr/local/src/
[root@bogon src]# wget http://nginx.org/download/nginx-1.6.2.tar.gz
```

###### 解压安装包

```python
[root@bogon src]# tar zxvf nginx-1.6.2.tar.gz
```

###### 进入安装目录

```python
[root@bogon src]# cd nginx-1.6.2
```

###### 编译安装

```python
[root@bogon nginx-1.6.2]# ./configure --prefix=/usr/local/webserver/nginx --with-http_stub_status_module --with-http_ssl_module --with-pcre=/usr/local/src/pcre-8.35
[root@bogon nginx-1.6.2]# make  编译
[root@bogon nginx-1.6.2]# make install  安装
```

###### 查看Nginx版本

```python
[root@bogon nginx-1.6.2]# /usr/local/webserver/nginx/sbin/nginx -v
```

#### 4.Nginx配置

###### 创建Nginx运行使用的用户www

```python
[root@bogon conf]# /usr/sbin/groupadd www 
[root@bogon conf]# /usr/sbin/useradd -g www www
```

###### Nginx.conf配置文件的修改

```python
[root@bogon conf]#  vim /usr/local/webserver/nginx/conf/nginx.conf
```

```python
// Nginx.conf文件
user www www;
worker_processes auto; #设置值和CPU核心数一致，可以说具体数字，auto则自动获取配置
```

###### 检查Nginx.conf的正确命令

```python
[root@bogon conf]# /usr/local/webserver/nginx/sbin/nginx -t
```

###### 启动Nginx

```python
[root@bogon conf]# /usr/local/webserver/nginx/sbin/nginx
```

###### Nginx其他命令

```python
/usr/local/webserver/nginx/sbin/nginx -s reload            # 重新载入配置文件
/usr/local/webserver/nginx/sbin/nginx -s reopen            # 重启 Nginx
/usr/local/webserver/nginx/sbin/nginx -s stop              # 停止 Nginx
```

