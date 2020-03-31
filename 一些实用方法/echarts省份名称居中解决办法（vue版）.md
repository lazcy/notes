### echarts map   省份名称居中的问题

```javascript
import './china.js'   这样引入会导致内存泄漏，程序崩溃

解决方式：

安装依赖，npm install --save echars之后

下载修正版的china.js

找到node_modules->echarts->map->js>china.js

将修正版替换就可以了
```



