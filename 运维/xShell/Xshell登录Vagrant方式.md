#### Vagrant账号登录

###### 在虚拟机 vagrantfile 的目录位置 打开控制台，输入vagrant ssh-config

![1566208009419](C:\Users\lazcy\AppData\Roaming\Typora\typora-user-images\1566208009419.png)

###### 修改/etc/ssh/sshd_config 文件

```python
# 运行vagrant
vagrant up

# ssh登录
vagrant ssh

# 重置root密码
sudo passwd root

# 切换root账号
su

# 打开sshd_config
vim /etc/ssh/sshd_config

# 修改下列参数
PermitRootLogin yes #自己输入
PasswordAuthentication yes #修改
# 命令修改
#sed -i "s/PasswordAuthentication no/PasswordAuthentication no \n PermitRootLogin yes/" /etc/ssh/sshd_config
# 保存文件
:wq
  
# 重启sshd服务
systemctl restart sshd
```

#### window可以通过rz,sz将文件上传到linux服务器中

```python
# rz: command not found
yum install lrzsz -y
```

