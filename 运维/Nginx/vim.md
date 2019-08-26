#### vim常用命令

```
vim nginx.conf      打开文件
输入r                可修改文件
Ctrl+c              退出编辑模式
:wq                 保存文件并退出
:q!                 不保存文件退出
```

```python
# vim 保存提示 readonly option is set （add！to override）
:wq!  保存不了时，root权限下可以使用这个命令保存修改的文件
```

#### VIM的设置方式

- 临时性设置
- 永久性质设置（/etc/vimrc）

1.语法高亮（syntax on/syntax off）

2.显示行号（set number）

3.自动缩进（set autoindent/set cindent）

4.自动加入文件头

5.shell高亮显示

#### 进入编辑模式

```python
#如果卡在其他模式先按ESC
按i
```

###### Linux Vim不明原因卡死解决办法

`Ctrl+S在Linux里是锁定屏幕的快捷键，如果要解锁，按下Ctrl+Q就可以了`

