##### 1. stub_status,查看连接数，状态

```bash
server{
 ...
 		localtion /mystatus{
			stub_status;
		}
	...
}

```

##### 2.random_index,随机主页

```bash
server{
	...
		location / {
			root /usr/share/nginx/html;
			random_index on; # 新增的
			# index index.php index.html index.htm; # 加#号注释
		}
}
```

##### 3.http_sub_module,http内容替换

```bash
sub_filter string repalcement    # http,server,location
sub_filter_last_modified on | off # http,server,location校验服务端内容是否有变更
sub_filter_once on | off  # off匹配所有，on匹配第一个
```

##### 4.limit_conn_module(连接频率限制) 和 limit_req_module(请求频率限制)

```bash
limit_conn_zone key zone=name:size; # http层设置
limit_conn name number;  # http,server,location都可以设置。并发限制个数number

limit_req_zone key zone=name:size rate=rate; # http层设置 rate = 1r/s,name=req_zone:1m
limit_req zone=name [burst=number][nodelay]; # http,server,location都可以设置。burst延迟个数

#压力测试工具ab
yum -y install httpd-tools # 安装命令
ab -n 50 -c 20 http://192.168.205.17/index.html   # 50为连接数，20为并发数
```

##### 5.IP访问控制（http_access_module）

allow address |CIDR(网段) | unix:|all

deny address |CIDR(网段) | unix:|all

context: http,server,location,limit_except

```bash
location ~ ^/admin.html{
	root /usr/share/nginx/random-index;
	deny 61.244.66.226;
	allow all;
	index index.html index.htm;
}
```

###### 局限性：

IP1->IP2(代理)->服务器  ，nginx只能限制IP2，不能限制IP1

###### 解决方法：

1. 采用别的HTTP头信息控制访问，如：HTTP_X_FORWARD_FOR
2. 结合geo模块
3. 通过HTTP自定义变量

- ###### http_x_forwarded_for

  http_x_forwarded_for = clientIP,Proxy(1),Proxy(2)....

![1568792697872](D:\markdown\notes\img\http_x_forwarded_for.png)

##### 6.基于用户信任的控制（http_auth_basic_module）

syntax: auth_basic string | off; #默认off

syntax: auth_basic_user_file file;

context: http,server,location,limit_except

```bash
mv access_mod.conf auth_mod.conf  # 修改名称
# 添加以下内容

location ~ ^/admin.html{
	root /usr/share/nginx/random-index;
	auth_basic "Auth access!Input your passward!";
	auth_basic_user_file /etc/nginx/auth_conf;
	index index.html index.htm;
}

# 生成账号密码文件，jeson为账号，路径/etc/nginx/
# htpasswd的安装命令:  yum install -y httpd-tools
htpasswd -c ./auth_conf jeson

# 访问,页面显示需要输入账号密码才能访问
http://IP/admin.html 
```

###### 局限性：

1. 用户信息依赖文件方式

2. 操作管理机械，效率低下

   

###### 解决方案：

1. Nginx结合LUA实现高效验证
2. Nginx和LDAP打通，利用nginx-auth-ldap模块

