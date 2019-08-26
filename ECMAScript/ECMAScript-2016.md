#### includes(),startWith(),endWith()

includes() 包含指定字符串，返回布尔值

startWith()  字符串头部包含指定字符串，返回布尔值

endWith   字符串尾部包含指定字符串，返回布尔值

#### repeat(n)

'x'.repeat(n),x重复n次

#### 箭头函数

```javascript
// 返回对象的时候要用括号括起来
var v = () => ({name: 'aaa', a: '111'})
```

1.箭头函数没有自己的this，它的this指向的是定义时所在的对象

2.不可以当构造函数，不能使用new命令

3.函数体内没有arguments对象，使用Rest参数代替

4.不能作为Generator函数，不能使用yield

#### Rest参数

rest参数（形式为“...变量名”），用于获取函数的多余参数，不需要使用arguments对象了

