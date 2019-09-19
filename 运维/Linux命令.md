#### 重置root密码

```python
# 重置root用户的密码
sudo passwd root
# 接着连续两次输入新密码
# 切换root用户
su
# 输入密码即可
```

#### 文件修改

```python
#mv命令既可以重命名，又可以移动文件或文件夹。

#例子：将目录A重命名为B
mv A B

#例子：将/a目录移动到/b下，并重命名为c
mv /a /b/c

#其实在文本模式中要重命名文件或目录，只需要使用mv命令就可以了，比如说要将一个名为abc的文件重命名为1234：
mv abc 1234
```

```bash
tree /html # 树形结构显示目录 yum -y install tree
clear  # 清屏·
chmod/usermod
```

##### 从一个文件夹拷贝到另一个文件夹

```bash
cp -ri /home/vagrant/labs/* /usr/share/nginx/test  # -ri如果需要覆盖文件会提示是否覆盖,-rf不会提示直接覆盖

```



```
mv nginx.back.conf access_mod.conf
```

