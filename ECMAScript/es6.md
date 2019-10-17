### es6笔记

- ##### let，const和var

  ```
  let只在所在的代码块有效，在其他地方会报Undefined，不能重复声明
  
  var在任何地方都可以访问并赋值，所以会存在变量升级
  
  cosnt声明一个常量，保持不变的不是它值，而是指向内存地址所保存的数据的指针，并不要求数据结构不变
  ```

- es6声明变量的六种方式

  ```
  es5只有两种，就是var和function
  es6有六种，除了上述的两种，还有let,const,import和class
  ```

- 变量的解构用途

  ```
  1.交换变量
  let x=2,y=3;
  [x,y] = [y,x];
  
  2.函数只能返回一个值，如果要返回多个值要把值放到数组或者对象里面再返回
  可以把需要的数据从返回值里面解构出来
  function fn(){
  	return {a:1,b:3}
  }
  let [a,b] = fn();
  
  3.函数参数定义，解构赋值
  function f([x,y,z]){...}
  f([1,2,3])
  
  4.提取JSON数据
  let jsonData = {
  	id:1,
  	state:"ok",
  	data:[2,3]
  }
  let {id,state,data} = jsonData
  
  5.函数参数的默认值
  
  6.遍历map结构
  const map = new Map();
  map.set('first','hello');
  map.set('second','world');
  
  for(let [key,value] of map){
  console.log(key + 'is' + value)
  }
  
  7.输入模块的指定方法
  const { fn1,fn2 } = require('xxx')
  ```

- json对象和jsonString

#### 回调函数地狱

多个函数嵌套执行的时候，一旦其中一个函数有操作需要修改，它的上层回调函数和下层回调函数都可能跟着修改

![ES6ç¼©ç¥](es6.assets/16daaaaa5eef3fac)

