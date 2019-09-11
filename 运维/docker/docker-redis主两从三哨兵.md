# 基于Docker搭建Redis一主两从

三台虚拟机

```bash
192.168.205.18 # 主机 redis-1
192.168.205.11  # redis-2
192.168.205.14 # redis-3
```

1. 安装docker

2. 下载redis

   ```bash
   docker pull redis
   ```

3. 下载redis配置文件

   ```bash
   wget http://download.redis.io/redis-stable/redis.conf
   ```

4. 修改redis配置文件

   ```bash
   # master 主
   
   # 注释这一行，表示Redis可以接受任意ip的连接
   # bind 127.0.0.1
   # 关闭保护模式
   protected-mode no
   # 让redis服务后台运行
   daemonize yes
   # 设定密码(可选，如果这里开启了密码要求，slave的配置里就要加这个密码. 只是练习配置，就不使用密码认证了)
   # requirepass masterpassword
   # 配置日志路径，为了便于排查问题，指定redis的日志文件目录
   logfile "/var/log/redis/redis.log"
   
   
   
   # slave 从
   
   # 注释这一行，表示Redis可以接受任意ip的连接
   # bind 127.0.0.1 
    
   # 关闭保护模式
   protected-mode no 
    
   # 让redis服务后台运行
   daemonize yes 
    
   # 设定密码(可选，如果这里开启了密码要求，slave的配置里就要加这个密码)
   requirepass masterpassword 
    
   # 设定主库的密码，用于认证，如果主库开启了requirepass选项这里就必须填相应的密码
   masterauth <master-password>
    
   # 设定master的IP和端口号，redis配置文件中的默认端口号是6379
   # 低版本的redis这里会是slaveof，意思是一样的，因为slave是比较敏感的词汇，所以在redis后面的版本中不在使用slave的概念，取而代之的是replica
   # 将35.236.172.131做为主，其余两台机器做从。ip和端口号按照机器和配置做相应修改。
   replicaof 35.236.172.131 6379
    
   # 配置日志路径，为了便于排查问题，指定redis的日志文件目录
   logfile "/var/log/redis/redis.log"
   ```

5. 启动redis容器

   ```bash
   docker run -it --name redis-1 -v /root/redis.conf:/usr/local/etc/redis/redis.conf -d -p 6379:6379 redis /bin/bash
   ```

6. 进入容器操作

   ```bash
   $docker exec -it redis-3 bash
   $redis-cli
   
   # 查看容器主从属性
   $info  # 或 info replication
   
   # 设置slave
   slave 主机iP 端口
   ```

   