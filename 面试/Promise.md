##### Promise

promise是一个对象，对象和函数的区别是对象可以保存状态，函数不可以（闭包除外）

没有剥夺函数的return能力，不需要层层传递callback，进行回调获取数据

代码风格，容易理解，便于维护

多个异步等待合并便于解决

```javascript
new Promise(
	function (resolve, reject){
  	resolve('成功')
  }
).then(
	(res) => {console.log(res)}, // 成功
  (res) => {console.log(res)}  // 失败
)
```

* resolve的作用是将Promise对象的状态从“未完成”变为“成功”，“pendding”变为“resolved”,将异步操作结果作为参数传递出去
* reject的作用是将Promise对象的状态从“未完成”变为“失败”，“pendding”变为“rejected”,将异步操作报出的错误作为参数传递出去

promise状态一经改变，不会再变了

pendding->fulfilled

Pedding->rejected