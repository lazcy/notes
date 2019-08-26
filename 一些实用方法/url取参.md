#### 使用split分割参数

```javascript
var url = decodeURI(location.href);//location.href;--中文乱码

var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");

var paraObj = {};

var j;

for (var i = 0; j = paraString[i]; i++) {

  paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);

} 
```

#### 使用match

```javascript
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]);
    return null;
}
alert(GetQueryString("参数名1"));
alert(GetQueryString("参数名2"));
alert(GetQueryString("参数名3"));
```

#### 使用url模块的parse方法，直接解析出数据。

```javascript
// parse方法第二个参数若传true，则会直接将解析出的query值转为对象形式，否则它只是字符串形式
const url = require('url');
const { pathname, query } = url.parse(req.url, true);
console.log(pathname, query);
```



