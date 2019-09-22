##### 1. gzip

```bash
location ~ .*\.(jpg|gif|png)$ {
	gzip on | off;
	gzip_http_version 1.1;
	gzip_comp_level 2;
	gzip_types text/plain application/javascript application/x-javascript text/css appliction/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	root /usr/share/nginx/test;
}
location ~ .*\.(txt|xml)$ {
	gzip on | off;
	gzip_http_version 1.1;
	gzip_comp_level 2;
	gzip_types text/plain application/javascript application/x-javascript text/css appliction/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
	root /usr/share/nginx/test;
}
location ~ ^/download {
	gzip_static on;
	tcp_nopush on;
	root /usr/share/nginx/test;
}
```

http_gzip_static_module（预读gzip文件）   http_gunzip_module（处理不支持gzip的）

##### 2. 跨域设置

```bash
location ~ .*\.(htm|html)$ {
	add_header Access-Control-Allow-Origin *|网站域名;
	add_header Access-Control-Allow-Methods GET,POST,PUT,DELETE,OPTIONS;
	root /usr/share/nginx/random-index;
}
```

##### 3. 防盗链,防止网站资源被盗用(http_referer)

syntax: valid_referers none | blocked | server_names | string...

context: server,location

```bash
location / {
	...
	valid_referers none blocked 192.168.205.17 ~/google\./;
	# 注意！！！    if和()后面都要有空格
  if ($invalid_referer) {
     return 403;
  }
  ...
}

# 测试 -I是只显示头信息 -e访问来源地址 []里面的内容代表可写可不写
curl [-e "http://www.baidu.com"] -I http://192.168.205.17/test.jpg
```

##### 4. 代理服务

- http代理

  正向代理的对象是客户端

  反向代理的对象是服务端

syntax:proxy_pass URL;

context: location,if in location,limit_except

```bash
location ~ /test_proxy.html$ {
	proxy_pass http://127.0.0.1:8080;
}

# http://192.168.205.17:8080/admin.html  无法访问
# yum -y install net-tools支持netstat
netstat -luntp|grep nginx # 查看nginx使用的端口信息
```

```bash
# 正向代理的客户端 192.168.205.13
resolver 8.8.8.8; # 代理dns
location / {
	proxy_pass http://$http_host$request_uri
}

# 另一台服务器 192.168.205.17
location / {
	if ($http_x_forward_for !~* "^192\.168\.205\.13") {
		return 403;
	}
}
```

配置项

```bash
proxy_pass http://127.0.0.1:8080

#以下内容可以写成配置文件proxy_params
# include proxy_params;
proxy_redirect default;
proxy_set_header Host $http_host;
proxy_set_header X-Real-IP $remote_addr;

proxy_connect_timeout 30;
proxy_send_timeout 60;
proxy_read_timeout 60;

proxy_buffer_size 32k;
proxy_buffering on;
proxy_buffers 4 128k;
proxy_busy_buffers_size 256k;
proxy_max_temp_file_size 256k;
```

