- 我们如何快速搭建 nginx 环境？

  - 下拉镜像

    ``` python
    docker pull nginx
    ```

  - 运行容器

    ``` python
    docker run -p 80:80 nginx
    ```

  - 后台运行容器

    ``` python
    docker run -d -p 80:80 nginx
    ```

  - 容易混淆的概念

    - 环境变量

      ``` python
      docker run -p 80:80 -e DB_TEST=123456 -d nginx
      ```

      ``` python
  echo $DB_TEST
      ```
    
      ``` python
  -e DB_TEST=127.0.0.1
      ```

    - 暴露端口
    
      ``` python
  -p 宿主端口：容器内的端口
      ```
    
    - 以守护方式运行
    
  ``` python
      -d
    ```
    
    - 如果我要运行外面的容器 改怎么办
    
      ``` python
      echo '<h1>Hello, Docker!</h1>' > /html/index.html
      ```
    
      ``` python
      docker run -p 80:80 -p 443:443 --name mynginx -v $PWD/html:/usr/share/nginx/html -d nginx:1.15.11-alpine
      ```
    
    
  
  

