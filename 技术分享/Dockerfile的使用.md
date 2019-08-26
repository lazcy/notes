## 基础知识

- Shell 和 Exec 格式

  - Shell格式 `当指令执行时，shell 格式底层会调用 /bin/sh -c <command> `

    ``` dockerfile
    RUN apt-get install python3  
    CMD echo "Hello world"  
    ENTRYPOINT echo "Hello world" 
    ```

    使用变量

    ``` dockerfile
    ENV name world
    ENTRYPOINT echo "hello $name"
    # 输出hello world
    ```

  - Exec 格式 `当指令执行时，会直接调用 <command>，不会被 shell 解析`

    ``` dockerfile
    RUN ["apt-get", "install", "python3"]
    CMD ["/bin/echo", "Hello world"]
    ENTRYPOINT ["/bin/echo", "Hello world"]
    ```

    使用变量

    ``` dockerfile
    ENV name world 
    ENTRYPOINT ["/bin/echo", "hello $name"]
    # 输出hello $name
    ```

    ``` dockerfile
    ENV name world  
    ENTRYPOINT ["/bin/sh", "-c", "echo Hello $name"]
    # 输出hello world
    ```

- 常用指令

  - **RUN** `通常用于安装应用和软件包`

    <font color=red>每个RUN指令都会重新创建一个容器，所以命令不要连续使用</font>

    ``` dockerfile
    RUN apt-get update && apt-get install -y \  
    
     bzr \
    
     cvs \
    
     git \
    
     mercurial \
    
     subversion
    ```

  - **CMD** `指令允许用户指定容器的默认执行的命令`

    - 注意在容易<font color=red>没有指定命令时</font>运行

      - 如果 docker run 指定了其他命令，CMD 指定的默认命令将被忽略。
      - 如果 Dockerfile 中有多个 CMD 指令，只有最后一个 CMD 有效。
      - Exec模式下 可以为 <font color=red>ENTRYPOINT</font> 提供额外的参数

    - 案例

      ``` 
      CMD echo "Hello world"
      ```

      - docker run -it [image]  输出

        ``` java
        Hello world
        ```

      - docker run -it [image] /bin/bash

        ``` shell
        root@10a32dc7d3d3:/#
        ```

  - **ENTRYPOINT** `指令可让容器以应用程序或者服务的形式运行。`

    -  Dockerfile片段

      ``` dockerfile
      ENTRYPOINT ["/bin/echo", "Hello"]  
      CMD ["world"]
      ```

    - 当容器通过 docker run -it [image] 启动时，输出为：

      `hello world`

    - 而如果通过 docker run -it [image] CloudMan 启动，则输出为：

      ``` dockerfile
      Hello CloudMan
      ```

  - ENV 设置环境变量 

    `Shell 和 Exec 格式`

    ``` dockerfile
    ENV NODE_VERSION 7.2.0
    ```

  -  ARG 设置变量 <font color=red>仅构建时存在</font>

    ``` dockerfile
     ARG NODE_VERSION 11
    ```

  - VOLUME 定义匿名卷

    ``` dockerfile
    VOLUME /data
    # or
    VOLUME ["/data1","/data2"]
    # 将 mydata 命名卷挂载到了 /data 这个位置，替换默认
    docker run -d -v mydata:/data xxxx
    ```

  - COPY 复制文件 

    `Shell 和 Exec 格式`

    ``` dockerfile
    COPY package.json /usr/src/app/
    ```

  - ADD 更高级的复制文件

    压缩格式为 `gzip`, `bzip2` 以及 `xz` 的情况下

    `需要自动解压缩的场合使用`

    ``` dockerfile
    ADD ubuntu-xenial-core-cloudimg-amd64-root.tar.gz /
    ```

  - WORKDIR 指定工作目录

    ``` dockerfile
    WORKDIR /data
    ```

  - EXPOSE 暴露端口 <font color=red>仅仅只是声明</font>

    ``` dockerfile
    EXPOSE 3306
    ```

  - USER 指定当前用户

    ``` dockerfile
    RUN groupadd -r redis && useradd -r -g redis redis
    USER redis
    RUN [ "redis-server" ] # 以 redis 用户运行
    ```

    

- 先复习一下，来个简单的入门

  - 创建目录，并进入

    ``` shell
    mkdir mynginx
    cd mynginx
    ```

  - 编写 dockerfile

    ``` shell
    vim Dockerfile
    # 加入以下内容，并保存
    FROM nginx
    RUN echo '<h1>Hello, Docker!</h1>' > /usr/share/nginx/html/index.html
    ```

  - 构建镜像

    ``` shell
    docker build -t nginx:v3 .
    ```

  - 运行镜像

    ``` shell
    docker run -d -p 8080:80 nginx:v3
    ```

  - 测试是否成功

    ``` shell
    curl localhost:8080/index.html
    ```

  - 本机访问虚拟机

    <http://192.168.205.10:8080/index.html>

