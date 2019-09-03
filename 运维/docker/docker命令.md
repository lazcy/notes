```dockerfile
# 帮助命令
docker version 
docker info
docker --help

# 镜像命令
# 列出本地所有镜像（包含中间镜像）
docker images -a 
# 只显示镜像的ID
docker images -q 
# 显示镜像的摘要信息
docker images --digests 
# 显示完整的镜像信息
docker images --no-trunc 


# 查找某个镜像
docker search xx镜像 [--no-trunc/-s/--au] 
# 下载某个镜像
docker pull xx镜像[:lastest标签] 

# 删除某个镜像（正在运行的镜像不能删除）
docker rmi/rm 镜像ID 
# 强制删除
docker rmi/rm -f [镜像ID1 镜像ID2/镜像名称1 镜像名称2] 
# 删除全部镜像
docker rmi/rm -f $(docker images -qa) 
docker ps -a -q | xargs docker rm

# 容器命令
# 运行容器 ，-it已交互式运行容器 -P随机端口 -p指定端口
docker run -it 镜像ID 
ps -ef
# 列出正在运行的容器 -l最近创建 -n最近创建的n个 -lq最近创建的容器ID
docker ps [option] 
# 退出容器
exit/ctrl+P+Q 
# 启动容器
docker start 容器ID/容器名称 
# 重启容器
docker restart 容器ID/容器名称 
# 停止容器
docker stop 容器ID/容器名称 
# 强制停止容器
docker kill 容器ID/容器名称 

# 启动守护式容器
docker run -d 容器ID/容器名称 
docker run -d centos /bin/sh -C "while true;do echo hello 111;sleep 2;done"
# -t加入时间戳 -f跟随最新日志打印 -tail 数字显示最后多少条
docker logs -f -t -tail 容器ID 
# 查看容器内进程
docker top 容器ID 
# 查看内部细节
docker inspect 容器ID 
# 重新进入容器
docker attach 容器ID
docker exec 容器ID

# 容器内的资源拷贝到宿主机
docker cp 容器ID:/temp/yum.log /root
```

##### 1--查看docker的帮助会发现有两个与删除有关的命令`rm`和`rmi`

```
rm Remove one or more containers
rmi Remove one or more images
```

这里有两个不同的单词，**images**和**container**。其中images很好理解，跟平常使用的虚拟机的镜像一个意思，相当于一个模版，而container则是images运行时的的状态。docker对于运行过的image都保留一个状态（container），可以使用命令`docker ps`来查看正在运行的container，对于已经退出的container，则可以使用`docker ps -a`来查看。 如果你退出了一个container而忘记保存其中的数据，你可以使用`docker ps -a`来找到对应的运行过的container使用`docker commit`命令将其保存为image然后运行。

##### 2--镜像提交

```
docker  commit -m="描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]
```

```bash
# 镜像运行
docker run -it -p 8888:8080 tomcat # 8888为主机访问容器的映射端口，访问方式:http://虚拟机IP:8888
# 提交镜像例子
docker commit -a="del tomcat docs" -a="qianli" 容器ID qianli/tomcat:1.0
# 清掉当前运行的容器
docker rm -f $(docker ps -q)
# 后台运行容器
docker run -d  -p 8888:8080 tomcat
```

##### 3--数据卷

类似redis里的rdb和aof文件。做什么用：容器的持久化、容器间继承+共享数据

###### 1.直接命令添加

```bash
docker run -v /宿主机绝对路径目录:/容器内目录 容器名/容器ID
docker run -v /myDataVolume:/dataVolumeContainer centos # 类似创建同步目录
docker run -v /myDataVolume:/dataVolumeContainer:ro centos # 创建时带权限 ro只读不可写
```

###### 2.DockerFile生成镜像

```bash
vi DockerFile

# 生成镜像
docker build -f /mydocker/DockerFile -t qianli/centos:1.2 .

# 查看容器container配置
docker inspect 容器ID

# 运行容器
docker run -it/-d -p/-P qianli/centos:1.2

# 查看容器变更历史
docker history 容器ID
```

###### 3.DockerFile文件内容

```bash
# volume test
FROM centos
VOLUME ["/dataVolumeContainer1","/dataVolumeContainnere2"] # n个容器卷
CMD echo "finished,-------------success1"
CMD /bin/bashSS

# 上述相当于下面的命令
# docker run -it -v /host1:/dataVolumeContainer1 -v /host2:/dataVolumeContainer2 centos /bin/bash
```

```bash
touch container.txt
cat host.txt
```

###### 4.容器卷添加

```bash
docker run -it --name dco1 qianli/centos
docker run -it --name dco2 --volumes-from dco1 qianli/centos
```

