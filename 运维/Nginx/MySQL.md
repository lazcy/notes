#### 1.安装编译工具及库文件

```
yum -y install gcc gcc-c++ make autoconf libtool-ltdl-devel gd-devel freetype-devel libxml2-devel libjpeg-devel libpng-devel openssl-devel curl-devel bison patch unzip libmcrypt-devel libmhash-devel ncurses-devel sudo bzip2 flex libaio-devel
```

#### 2.安装cmake编译器

###### 下载安装包

[下载地址]: http://www.cmake.org/files/v3.1/cmake-3.1.1.tar.gz

```
$ wget http://www.cmake.org/files/v3.1/cmake-3.1.1.tar.gz
```

###### 解压安装包

```
$ tar zxvf cmake-3.1.1.tar.gz
```

###### 进入安装目录

```
$ cd cmake-3.1.1
```

###### 编译安装

```
$ ./bootstrap
$ make && make install
```

#### 3.安装MySQL

