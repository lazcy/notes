#### Promise的定义

Promise是异步编程的一种解决方案。它就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上来说，Promise是一个对象，从它可以获取异步操作的消息。

###### 两个特点

1.对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：Pending(进行中)、Resolved(已完成，又成Fulfilled)、Rejected(已失败)

2.一旦状态改变，就不会再变，任何时候都可以得到这个结果。

Promise状态的改变只有两种：Pending->Resolved或者Pending->Rejected

###### Promise实例

```javascript
var promise = new Promise(function(resolve, reject){
  if(/*异步成功*/){
  	resolve(value);   
  }else{
    reject(value);
  }
})
```

