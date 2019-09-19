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

