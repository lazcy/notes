##### nrpm -ql nginx

安装目录

```python
/etc/logrotate.d/nginx     #日志轮转，分割
/etc/nginx/**              #Nginx的相关配置文件
/etc/sbin/nginx            #Nginx启动
```

```python
vim /user/local/nginx/conf/nginx.conf  #修改niginx配置文件
cp nginx.conf nginx_bf.conf   #将配置文件备份一下
nginx -s reload     #当配置信息发生修改时,重新载入nginx,才能生效 
```

##### 安装编译参数

```python
nginx -V           #查看nginx安装信息
--with-http-***    #安装模块
```

ENTRYPOINT，支持参数追加

##### 查看安装配置文件

```bash
rpm -ql nginx # nginx,php
```

##### 查看网站请求头信息

```bsdh
curl -v http://www.imooc.com>dev>null
```

#####  查看已开启端口

```bash
netstat -luntp|grep nginx   # 查看nginx使用的端口
```

##### 停掉现在运行的端口

```bash
# systemctl stop httpd
pkill -f nginx
```

##### 停掉某个端口

```bash
iptables -I INPUT -p tcp --dport 8004 -j DROP
```

