登录默认路径

支持vim 编译器

查看网络配置ifconfig支持

```bash
FROM centos
MAINTAINER qinali<qinali.com>
# 环境变量
ENV mypath /tmp

# 设置默认路径
WORKDIR $mypath

RUN yum -y install vim
RUN yum -y install net-tools

EXPOSE 80

CMD echo $mypath
CMD echo "Success-------"
CMD ["/bin/bash"]
```

curl命令查询iP

```bash
FROM centos
RUN yum -y install curl
CMD ["curl","-s","http://ip.cn"]
# docker run myip 后面不能跟参数，会覆盖配置文件里的CMD
```

ENTRYPOINT，支持参数追加

```bash
FROM centos
RUN yum -y install curl
ENTRYPOINT ["curl","-s","http://ip.cn"]
# docker run myip -i相当于CMD ["curl","-s","-i",http://ip.cn"]
```

ONBUILD

```bash
# father 
FROM centos
RUN yum -y install curl
ENTRYPOINT ["curl","-s","http://ip.cn"]
ONBUILD echo "father is Run ---------"
```

```bash
# son
FROM father
RUN yum -y install curl
ENTRYPOINT ["curl","-s","http://ip.cn"]
# 创建时会打印father is Run ---------
```

ADD和COPY

```bash
FROM centos 
MAINTAINER qianli<qianli.com>

#把宿主机当前上下文的c.txt拷贝到容器/usr/local/路径下
COPY c.txt /usr/local/cincontainer.txt

#把java与tomcat添加到容器中
ADD jdk-8u191-linux-x64.tar.gz /usr/local/
ADD apache-tomcat-9.0.24.tar.gz /usr/local/

#安装vim编译器
RUN yum -y install vim

#设置工作访问时候的WORKDIR路径，登录落脚点
ENV MYPATH /usr/local
WORKDIR $MYPATH

#配置java和tomcat环境变量
ENV JAVA_HOME /usr/local/jdk1.8.0_191
ENV CLASSPATH $JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar
ENV CATALINA_HOME /usr/local/apache-tomcat-9.0.24
ENV CATALINA_BASE /usr/local/apache-tomcat-9.0.24
ENV PATH $PATH:$JAVA_HOME/bin:$CATALINA_HOME/lib:$CATALINA_HOME/bin

#容器运行时监听的端口
EXPOSE 8080

#启动运行tomcat
# ENTRYPOINT ["/usr/local/apache-tomcat-9.0.24/bin/startup.sh"]
# CMD ["/usr/local/apache-tomcat-9.0.24/bin/catalina.sh","run"]
CMD /usr/local/apache-tomcat-9.0.24/bin/startup.sh && tail -F /usr/local/apache-tomcat-9.0.24/bin/logs/catalina.out

```

下载jdk和tomcat

```bash
wget https://mirrors.cnnic.cn/apache/tomcat/tomcat-9/v9.0.24/bin/apache-tomcat-9.0.24.tar.gz

wget --no-check-certificate --no-cookies --header "Cookie: oraclelicense=accept-securebackup-cookie" https://repo.huaweicloud.com/java/jdk/8u191-b12/jdk-8u191-linux-x64.tar.gzll

```

```bash
# 创建镜像
docker build -f /tomcat9/DockerFile -t mytomcat9 .
```

```bash
# 运行镜像
docker run -d -p 9080:8080 --name myt9 -v /qianli/mydockerfile/tomcat9/test:/usr/local/apache-tomcat-9.0.24/webapps/test -v /qianli/mydockerfile/tomcat9/tomcat9logs/:/usr/local/apache-tomcat-9.0.24/logs --privileged=true mytomcat9

# --privileged=true设置权限
```

备注：

镜像后台运行时，docker exec和docker attach没反应，需要加上-it进入交互界面

```bash
docker exec -it 容器ID  /bin/bash
docker attach -it 容器ID /bin/bash
```



