##### 可自动关闭的消息提示

```html
<div class="alert">发送成功</div>


// 样式
.alert {
    display: none;
    position: fixed;
    top: 50%;
    left: 45%;
    width: 10%;
    z-index: 99999;
    padding: 0.15rem;
    border: 1px solid transparent;
    border-radius: 4px;
    text-align: center;
    background: rgba(0,0,0,.6);
    color: #fff;
}


//js
$('.alert').html('发送失败').show().delay(800).fadeOut();
```





