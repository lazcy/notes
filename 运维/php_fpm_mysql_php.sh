#!/bin/bash
echo "开始啦。。。。"

# 安装Nginx
echo "开始安装Nginx"
yum -y install epel-release Open
yum -y install nginx 

systemctl start nginx
systemctl enable nginx

# 安装mysql
echo "开始安装MySQL"
yum -y install mariadb-server mariadb
systemctl start mariadb
mysql_secure_installation
systemctl enable mariadb

# 安装php
echo "开始安装PHP"
yum -y install php php-mysql php-fpm
cd /etc/
sed -i "s/;cgi.fix_pathinfo=1/cgi.fix_pathinfo=0/g"  php.ini

cd /etc/php-fpm.d/
a='listen = 127.0.0.1:9000'
b='listen = \/var\/run\/php-fpm\/php-fpm.sock'
sed -i "s/$a/$b/" www.conf
sed -i "s/;listen.owner = nobody/listen.owner = nobody/" www.conf
sed -i "s/;listen.group = nobody/listen.group = nobody/" www.conf

sed -i "s/user = apache/user = nginx/" www.conf
sed -i "s/group = apache/group = nginx/" www.conf

systemctl start php-fpm
systemctl enable php-fpm

# 测试php文件
cd /usr/share/nginx/html
echo "<?php phpinfo(); ?>">info.php

echo  "手动配置部分，请看文件内容"
# nginx.conf的配置只能手动改了
#cd /etc/nginx/
# root   
:<<EOF server{
  /usr/share/nginx/html;
  #后面加一句 
  index index.php index.html index.htm;
  location ~ \.php$ {
        try_files $uri =404;
        fastcgi_pass unix:/var/run/php-fpm/php-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }
}
EOF
# 修改完成后重启Nginx  命令：systemctl restart nginx

cd /etc/ssh/
sed -i "s/PasswordAuthentication no/PasswordAuthentication yes/" /etc/ssh/sshd_config