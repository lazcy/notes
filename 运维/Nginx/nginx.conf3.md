##### rewrite替换

rewrite regex replacement[flag];

```bash
rewrite ^(.*)$ /pages/maintain.html break;
```

![1569923215515](C:\Users\lazcy\AppData\Roaming\Typora\typora-user-images\1569923215515.png)

![1569923232471](C:\Users\lazcy\AppData\Roaming\Typora\typora-user-images\1569923232471.png)

```bash
if ($http_user_agent ~ MSIE) {
	rewrite ^(.*)$ /msie/$1 break;
}
```

#### pcretest正则

在linux下需要对正则表达式的验证，使用的验证工具是pcretest，这个工具集成在pcre库中

``` bash
# 查看版本https://ftp.pcre.org/pub/pcre/
wget https://ftp.pcre.org/pub/pcre/pcre-8.13.tar.gz
tar -xzvf  pcre-8.13.tar.gz
cd pcre-8.13

# 错误提示configure: error: Invalid C++ compiler or C++ compiler flags安装下面的
yum install -y gcc-c++

./configure
make && make intall
```

