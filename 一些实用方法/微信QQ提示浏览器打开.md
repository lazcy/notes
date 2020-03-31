##### 微信/QQ里打开的页面提示浏览器打开

```html
<div id="actions" class="actions"></div>

//样式
.actions {
      display: none;
      position: fixed;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      top: 0;
      left: 0;
      overflow: hidden;
      z-index: 1112;
    }

    .actions p {
      position: absolute;
      right: 5px;
      top: 10px;
      width: 3.5rem;
      background-color: #fff;
      font-size: 0.24rem;
      line-height: 0.36rem;
      border-radius: 5px;
      padding: 8px;
      color: #e9af5b;
      text-align: center;
    }
    .actions p span{
      margin: 5px;
      background-color: #e9af5b;
      color: #fff;
      padding: 2px 5px;
      border-radius: 3px;
    }
    .actions p::before {
      position: absolute;
      content: '';
      top: -7px;
      right: 0.25rem;
      border-width: 0 7px 7px 7px;
      border-style: solid;
      border-color: transparent transparent rgba(255, 255, 255, 1) transparent;
    }

//js
var isUnabledInstall =
    /MicroMessenger/gi.test(navigator.userAgent.toLowerCase()) ||
    /QQ\/\d/gi.test(navigator.userAgent.toLowerCase());

if(isUnabledInstall){
    $('#actions').show()
    $('#actions').html('<p class="strong">微信/QQ 内无法下载应用<br>请点击右上角<br>选择"在浏览器打开"</p>').css('marginTop', '0px')
  }
```





##### 设备或应用判断

```javascript
var device = {
  isAndroid: -1 < navigator.userAgent.toLowerCase().indexOf('android'),
  isIos: null != navigator.userAgent.match(/(iPod|iPhone|iPad)/),
  isChrome: /chrom(e|ium)/.test(navigator.userAgent.toLowerCase()),
  isUnabledInstall:
    /MicroMessenger/gi.test(navigator.userAgent.toLowerCase()) ||
    /QQ\/\d/gi.test(navigator.userAgent.toLowerCase()),
  isQQ: -1 < navigator.userAgent.toLowerCase().indexOf('qq'),
  isSafari: (/iPhone/i.test(navigator.platform) || /iPod/i.test(navigator.platform) || /iPad/i.test(navigator.userAgent)) && !!navigator.appVersion.match(/(?:Version\/)([\w\._]+)/)
}
```

