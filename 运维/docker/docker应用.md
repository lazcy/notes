##### 常用安装

###### 查找镜像mysql

```bash
docker search  mysql
```

```bash
docker run -p 12345:3306 --name mysql
-v /qianli/mysql/conf:/etc/mysql/conf.d
-v /qianli/mysql/logs:/logs
-v /qianli/mysql/data:/var/lib/mysql
-e MYSQL_ROOT_PASSWORD=123456
-d mysql:5.6
```

###### 数据备份

```bash
docker exec 容器ID sh -c ' exec mysqldump --all-databases -uroot -p"123456" ' > /qianli/all-database.sql
# 打印的警告不用理会
```

###### redis启动

```bash
docker run -p 6379:6379
-v /qianli/myredis/data:/data
-v /qianli/myredis/conf/redis.conf:/usr/local/etc/redis/redis.conf
-d redis:3.2 redis-server /usr/local/etc/redis/redis.conf
--appendonly yes
```

###### 进入Redis容器

```bash
docker exec -it 运行Redis的容器ID redis-cli
```



