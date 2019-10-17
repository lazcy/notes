全局安装react脚手架

```
cnpm/npm install -g create-react-app
```

- #### 快速搭建react开发环境

```
creact-react-app [project name]

cd [project name]

npm start
```

- #### react采用声明式，高效灵活

- #### 组件从React.Component开始

```
import React from 'react'
class App extends React.Component {
	render() {
		return {
			/*TO DO*/
		}
	}
}
export default App;
```

- #### 什么是JSX

```
const element = <h1>hello</h1>
```

`这类既不是字符串也不是HTML的，它是javascript的一种语法扩展
可以在JSX里面任意使用javascript表达式，用{}包裹起来`

```
const name = 'lili'
const element = <h1>{name}</h1>
```

`JSX本身是一种表达式，也可以作为返回值返回`

```
function getGreeting(){
	return <h1>hello.</h1>
}
```



- #### 构造函数constructor

```
class App extends React.Component {
	constructor() {
		super();
		this.state = {
			value: null
		}
	}
	//vaule的调用方式this.state.value
}
```

##### constructor和super

```
constructor和super必须一起出现，在类里需要同时存在或者都不存在，不可以只存在其中之一
class myClass extends React.Componet {
	constructor(){
		// super();
		console.log(this)//constructor里面没有写super(),这里的this是不会初始化的
	}
}
```

##### super()和super(props)

```
props  将JSX所接收的属性转换为单个对象传递给组件
React默认将props设置在组件其他地方（以供访问）
constructor内部想要访问props必须传进去才行
constructor(props){
	super();
    console.log(this.props)
}


props也可以传递事件
<board onclick={()=>handleClick()}

board.js组件
<button onClick={props.onClick}></button>
```

- #### 不可变性

```
.slice()方法，对已有数据进行浅拷贝，不改变已有数据
React根据对象是否被替换来重新渲染组件
```

- #### 函数定义组件

  `对组件只有一个render方法的组件，最简洁的写法就是函数定义组件`

```
function board(props){
	return (
		<div>{props.value}</div>
	)
}
```

- #### 设置shouldComponentUpdate,指定某些参数改变了才重新渲染dom

```
shouldComponentUpdate(nextProps,nextState){
	if(this.props.color !== nextProps.color){
		return true;
	}
	return false;
}
```

