#### awk(侧重于复杂逻辑处理)

可编程，统计，制表...

$0：当前整行

$1：第一个参数

$2：第二个参数

-F：分隔符

```bash
# 以：分割
awk -F ':' '{print $1}' filename

# 两个字段中间空格
awk -F ':' '{print $1,$3}' filename
awk -F ':' '{print $1" "$3}' filename
awk -F ':' '{print $1"\t "$3}' filename

# 增加说明字段
awk -F ':' '{print "User:"$1"\t UID:"$3}' filename
```

NR：每行的记录号，行号

NF：字段数量变量

FILENAME：正在处理文件名

```bash
awk -F ':' '{print NR,NF}' filename
awk -F ':' '{print FILENAME}' filename

awk -F ':' '{print "Line:"NR,"Col:"NF,"User:"$1}' filename

awk -F ':' '{printf("Line:%3s Col:%s User:%s\n",NR,NF,$1)}' filename

# 用户id大于100的
awk -F ':' '{if ($3>100) print "Line:"NR,"Col:"NF,"User:"$1}' filename
 
# log中error发生的日期
sed '/Error/p' filename | awk '{print $1}'
awk '/Error/{print $1}' filename
```

###### 逻辑判断式

~,!~   匹配表达式

==,！=,<,> 判断

```bash
# m开头的字符串,非m开头
awk -F ':' '$1~/^m.*/{print $1}' filename
awk -F ':' '$1!~/^m.*/{print $1}' filename

# 条件输出
awk -F ':' '$3>100{print $1,$3}' filename
awk -F ':' '$3<100{print $1,$3}' filename
awk -F ':' '$3==100{print $1,$3}' filename
```

###### 扩展格式

```bash
# 制表显示每行的行号，列数，对应的用户名
awk -F ':' 'BEGIN{print "Line	Col	User"}{print NR,NF,$1}END{print "--------"FILENAME"---------"}' filename

# 所有文件大小的和
ls -l | awk 'BEGIN{size=0}{size+=$5}END{print "size  is " size/1024/1024"M}'

# 统计显示账户总人数
awk -F ':' 'BEGIN{count=0}$1!~/^$/{count++}END{print " count = " count}' filename

# 统计UID大于100的用户名
awk -F ':' 'BEGIN{count=0}{if ($3 > 100) name[count++]=$1}END{for (i=0;i<count;i++) print i,name[i]}' filename

#netstat -anp  统计connected和listen的连接数
# [ ]表示两个字段
netstat -anp | awk '$6~/CONNECTED|LISTEN/{sum[$6]++}END{for (i in sum) print i,sum[i]}'

```

![1570183101548](D:\markdown\notes\img\1570183101548.png)

