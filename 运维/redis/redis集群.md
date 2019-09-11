# RedisCluster docker-compose部署
[Docker方式部署redis-cluster - 简书](https://www.jianshu.com/p/b7dea62bcd8b)
[SpringBoot 2.0 如何使用Redis-Cluster - 掘金](https://juejin.im/post/5b66ad825188251af1220a57)

## Redis容器初始化 
> 这里引用了别人的一个镜像publicisworldwide/redis-cluster，方便快捷。  
这里使用host(主机)网络模式，把redis数据挂载到本机目录/data/redis/500*下。

创建一个 docker-compose.yml
```
version: '3'

services:
 redis1:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5001:5001'
  volumes:
   - /data/redis/5001/data:/data
  environment:
   - REDIS_PORT=5001

 redis2:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5002:5002'
  volumes:
   - /data/redis/5002/data:/data
  environment:
   - REDIS_PORT=5002

 redis3:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5003:5003'
  volumes:
   - /data/redis/5003/data:/data
  environment:
   - REDIS_PORT=5003

 redis4:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5004:5004'
  volumes:
   - /data/redis/5004/data:/data
  environment:
   - REDIS_PORT=5004

 redis5:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5005:5005'
  volumes:
   - /data/redis/5005/data:/data
  environment:
   - REDIS_PORT=5005

 redis6:
  image: publicisworldwide/redis-cluster
  network_mode: host
  restart: always
  ports:
    - '5006:5006'
  volumes:
   - /data/redis/5006/data:/data
  environment:
   - REDIS_PORT=5006
```

### Redis容器集群配置
上面只是启动了6个redis容器，并没有设置集群，通过下面的命令可以设置集群。

172.19.165.222 这个是你本机的IP
```
docker run --rm -it inem0o/redis-trib create --replicas 1 172.19.165.222:5001 172.19.165.222:5002 172.19.165.222:5003 172.19.165.222:5004 172.19.165.222:5005 172.19.165.222:5006
```

### 登录集群
```
docker run -it 任意一个redis容器ID bash
redis-cli -c -p 5003
set a
get a
```

#Redis #环境搭建/Redis #Docker/Redis