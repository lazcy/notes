#### 什么是shell

shell是指一种应用程序，提供一个操作界面，用户通过这个界面访问操作系统呃逆和的服务。

#### shell第一行指定一种编译器执行

#!就是一个约定的标记，告诉系统脚本需要什么编辑器来执行，/env是系统的PATH目录中查找

```
#!/usr/bin/php
#!/usr/bin/env python3
#!/usr/bin/env bash
```

#### shell运行的两种方式

###### 作为可执行程序

第一行设置 op_base.sh可执行权限 第二行执行op_base.sh

```
chmod +x op_base.sh
./op_base.sh
```

###### 作为参数

```
/bin/sh op_base.sh
```

#### shell脚本执行方式

###### 1.工作目录执行

```python
$ ./test.sh
```

###### 2.绝对路径执行

```python
$ pwd
$ /home/xxx/desktop
$ `pwd`/test.sh
$ /home/xxx/desktop/test.sh
```

###### 3.sh执行

```python
$ sh test.sh
$ bash test.sh
```

###### 4.shell环境执行

```python
$ . test.sh
$ source test.sh
```

#### shell遇到的问题

###### 1.解决linux的-bash: ./xx: Permission denied

```python
$ chmod 777 xx.sh
```

###### 2.shell脚本执行错误 $'\r':command not found

存现这种错误是因为 编写的  shell脚本是在win下编写的，每行结尾是\r\n 的Unix 结果行是\n

```python
$ yum install -y dos2unix
$ dos2unix  脚本名
```

