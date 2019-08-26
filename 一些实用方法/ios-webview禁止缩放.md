##### 通过ios 的webview调用h5页面，页面点击Input框页面自动放大

```html
<meta name="viewport" content="width=device-width, height=device-height, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, minimal-ui">
<meta name="apple-touch-fullscreen" content="yes">
<!-- apple safari 全屏，工具栏和菜单栏，状态栏，数字加超链接 -->
<meta name="apple-mobile-web-app-capable" content="yes"> 
<!-- 删除默认的苹果工具栏和菜单栏  -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"> 
<!-- 控制状态栏显示样式 -->
<meta name="format-detection" content="telephone=no"> 
<!-- 格式检测 禁止识别我们页面中的数字，防止把其当作电话识别，email=no 禁止识别邮箱 -->
<meta name="screen-orientation" content="portrait">
<!-- 设置屏幕方向为横屏还是竖屏   portrait(横向)|landscape(竖向) -->
<meta name="layoutmode" content="standard">
<!-- 排版   fitscreen 简化页面处理      standard 标准浏览器一致-->
<meta name="imagemode" content="force"> 
<meta name="x5-orientation" content="portrait">
<!-- QQ强制竖屏 QQ强制全屏 -->
<meta name="x5-page-mode" content="app">
<meta http-equiv="x-dns-prefetch-control" content="on">
```

