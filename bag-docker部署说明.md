- 下拉代码 `这步由jenkins`

  ``` python
  git clone git@tg.ft2sa.com:jpz-php/bag.git  
  ```

- docker说明

  - 进入工作目录

    ``` python
    cd bag
    ```

  - composer install

    ``` python
    docker-compose run --rm -w /data/www/repo php-fpm composer install
    ```

  - 编辑配置文件

    vim bag/config/settings.php

    ``` php
    # 修改db 数据库连接
    ```

  - 运行容器编排

    ``` python
    docker-compose up -d
    ```

  - 配置nginx

    - 具体目录说明

      - bag/docker/nginx
        - conf.d `配置文件目录`
        - ssl `ssl证书目录`

    - nginx 只提供参考 建议自行到 /docker/nginx/conf.d配置

    - admin.conf

      ``` nginx
      server {
          listen        80;
          server_name www.tgphp.com;
      
          root /data/www/api.www/public;
          index index.php index.html index.htm;
      
          charset utf-8;
          client_max_body_size 100M;
          fastcgi_read_timeout 1800;
      
          location / {
              # Matches URLS `$_GET['_url']`
              try_files $uri $uri/ /index.php?_url=$uri&$args;
          }
      
          location ~ \.php$ {
              try_files $uri =404;
      
              #fastcgi_pass  unix:/var/run/php/php7.0-fpm.sock;
              fastcgi_pass  php-fpm:9000;
      
              fastcgi_index /index.php;
      
              include fastcgi_params;
              fastcgi_split_path_info       ^(.+\.php)(/.+)$;
              fastcgi_param PATH_INFO       $fastcgi_path_info;
              fastcgi_param PATH_TRANSLATED /data/www/api.www/public/$fastcgi_path_info;
              fastcgi_param SCRIPT_FILENAME /data/www/api.www/public/$fastcgi_script_name;
          }
      
          location ~ /\.ht {
              deny all;
          }
      
          location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
              expires       max;
              log_not_found off;
              access_log    off;
          }
      }
      ```

    - www.conf

      ```` python
      server {
          listen        80;
          server_name www.tgphp.com;
      
          root /data/www/api.www/public;
          index index.php index.html index.htm;
      
          charset utf-8;
          client_max_body_size 100M;
          fastcgi_read_timeout 1800;
      
          location / {
              # Matches URLS `$_GET['_url']`
              try_files $uri $uri/ /index.php?_url=$uri&$args;
          }
      
          location ~ \.php$ {
              try_files $uri =404;
      
              #fastcgi_pass  unix:/var/run/php/php7.0-fpm.sock;
              fastcgi_pass  php-fpm:9000;
      
              fastcgi_index /index.php;
      
              include fastcgi_params;
              fastcgi_split_path_info       ^(.+\.php)(/.+)$;
              fastcgi_param PATH_INFO       $fastcgi_path_info;
              fastcgi_param PATH_TRANSLATED /data/www/api.www/public/$fastcgi_path_info;
              fastcgi_param SCRIPT_FILENAME /data/www/api.www/public/$fastcgi_script_name;
          }
      
          location ~ /\.ht {
              deny all;
          }
      
          location ~* \.(js|css|png|jpg|jpeg|gif|ico)$ {
              expires       max;
              log_not_found off;
              access_log    off;
          }
      }
      
      ````

      

