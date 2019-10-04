#### sed行处理（侧重于正则处理）

一次只处理一行，不改变原文件除非重定向

- ###### -a新增行

```bash
# 第五行后面加======
nl filename | sed '5a======' 

# 第1行到第5行后面加======
nl filename | sed '1,5a======'
```

- ###### -i插入

```bash
# 第5行之前插入
nl filename | sed '5i======'

# 第1行到第5行前面插入======
nl filename | sed '1,5i======'
```

- ###### -c替换行

```bash
# 第5行替换成======
nl filename | sed '5c======'

# 第1行到第5行整体替换成======
nl filename | sed '1,5c======'
```

- ###### -d删除行

```bash
nl filename | sed '/mooc/d'
```

例子：

1. 优化服务器配置，在ssh的配置文件中加入相应文本

   ```bash
   # $文档末
   sed '$a port52113 \npermitrootlogin no ' filename
   
   # 保持文档对齐
   sed '$a \	port52113 \n	permitrootlogin no ' filename
   ```

   

2. 删除文本中的空行

   ```bash
   sed '/^$/d' filename
   ```

   

3. 服务器日志处理

   ```bash
   sed -n '/Error/p' filename
   ```

   

##### 替换-s：分隔符/,#等

```bash
# false替换成true
sed 's/false/true/' filename

# :替换成% ，只替换第一个
sed 's/:/%/' filename

# 全局替换
sed 's/:/%/g' filename
```

例子：

数据筛选，筛选ip

```bash
# inet addr:192.168.241.128 Bash:192.... 
ifconfig ens33 | sed -n '/inet /p'|sed 's/inet.*r://'|sed 's/B.*$//'
```

##### 高级操作{}，多个命令合并用;分隔

```bash
nl filename | sed '{20,30d;s/false/true/}'
```

-n：读取下一个行

```bash
# 偶数行输出
nl filename | sed -n '{n;p}'

# 奇数行输出
nl filename | sed -n '{p;n}'

# 间隔行输出，1~2p奇数，2-2p偶数
nl filename | sed -n '1~2p' 
nl filename | sed -n '2~2p'

# 3,6,9...顺序输出
nl filename | sed -n '{n;n;p}'

# 2,5,8,11....
nl filename | sed -n '{n;p;n}'
```

-&：替换固定的字符串

```bash
# s/w/w123/ = s/w/&123/
#在用户名后面加空格
sed 's/^[a-z_-]\+/&	/' filename
```

\u \l \U \L：转换大小写

```bash
# 用户名首字母大写
sed 's/^[a-z_-]\+/\u&/' filename

# 文件夹下的.txt文件名转为大写
ls *.txt | sed 's/^\w\+/\U&/'
```

( )

```bash
# 获取字段
sed 's/\(^[a-z_-]\+\):x:\([0-9]\+\):\([0-9]\+\):.*$/USER:\1	UID:\2	GID\3/' filename

# 获取IP,ifconfig ens33按行取出
ifconfig ens33 | sed -n '/inet /p'| sed 's/ine.*r:\([0-9.]\+\) .*$/\1/'
```

-r：复制指定文件插入到匹配行，不改变文件内容

-w：复制匹配行拷贝到指定文件

```bash
echo -e '3543252352\n2345234234\n3243242' >123.txt
echo -e 'sdfdsfdsfs\nsdfsdfsdfsd\ndsfsdfsdfs' >abc.txt

# 第一行后面,123内容插入到abc文件
sed '1r 123.txt' abc.txt

# 123的第一条数据插入到abc文件，abc原来的内容被删除
sed '1w abc.txt' 123.txt

# 123的内容拷贝到abc文件，abc原来的内容被删除
sed 'w abc.txt' 123.txt
```

q：退出sed

```bash
# 第10行退出
nl filename | sed '10q'

# 检测到第一个false退出
nl filename | sed '/false/q'
```



![1570177385498](D:\markdown\notes\img\1570177385498.png)