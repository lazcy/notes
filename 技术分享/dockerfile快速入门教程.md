- 首先讲解下最容易被误解的概念

  ``` dockerfile
  FROM ubuntu:14.04
  ENTRYPOINT ["/bin/echo", "Hello"]
  CMD ["world"]
  ```

  

- 根据 dockerfile 编译一个镜像

  ``` python
  docker build -t demo/test1 .
  ```

- 运行

  ``` python
  docker run demo/test2 www
  ```

  输出 hello www



- 常用操作

  ``` python
  # 列出所有
  docker container ls -a
  # 删除指定id
  docker container rm 652ea2027122
  # 可以区分不同，不需要对应，比如可以使用 《条件一致都删除》
  docker container rm 65
  # docker container ls -a 简单版
  docker ps -a
  # docker container rm xxx  简单版
  docker rm 65
  # docker image ls  简单版
  docker images
  # 删除image rm <ID>
  docker image rm 652ea2027122
  # 简写
  docker rmi 652ea2027122
  # 列出所有 container id
  docker container ls -aq
  # 删除所有 container
   docker rm $(docker container ls -aq)
  # 列出 已退出的
  docker container ls -f "status=exited"
  # 列出 已退出的 id
  docker container ls -f "status=exited" -q
  # 删除已退出的
   docker rm $(docker container ls -f "status=exited" -q)
  ```

  