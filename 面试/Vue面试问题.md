### Vue面试问题

##### 组件的通信方式

链接：https://www.codercto.com/a/45172.html

- vuex

  专门为Vue.js应用程序开发的状态管理模式。优点：解决多层组件间繁琐的事件传播，多组件依赖统一状态的问题，它是单向数据流，为Vue量身定做的，学习成本不高。缺点：数据不能持久化，刷新页面要重置，增加额外的代码体积。

- EventBus

  ```vue
  // bus.js
  import Vue from 'vue'
  export default new Vue({})
  
  // component-a.js
  import bus from './bus.js'
  export default {
    created () {
      bus.$on('event-name', (preload) => {
        // ...
      })
    }
  }
  
  // component-b.js
  import bus from './bus.js'
  export default {
    created () {
      bus.$emit('event-name', preload)
    }
  }
  ```

  优点：原理简单，代码量少。缺点：多人开发定义同一个事件名时若没有用$off销毁会重复触发场景。大型项目使用容易出现混乱。

- props和$emit/$on

  最基本的父子组件传数据方式。将自定义属性通过props传给子组件用，子组件通过$emit方法触发父组件的V-on事件，达到触发父组件方法。

  优点：简单，不会修改别的组件的同名事件，只能触发父组件的。缺点：单一组件多层级时需要逐层传递会有很多不必要的代码量。不能解决多组件依赖同一状态的问题。

- Tips

  $attrs/$listeners可以将父组件的props和事件监听器继承给子元素，在子组件可以调用父组件的事件和props

- provice/inject

  父组件上通过Provice提供给后代组件的数据、方法，后代组件通过inject调用父组件的数据、方法。优点：可以跨层级传递。缺点：它将应用目前的组件组织方式耦合起来，是重构变得更加困难。

  ```vue
  //A.vue
  export default {
  	provice:{
  		name:浪里行舟
  	}
  }
  
  // B.vue
  export default{
  	inject:["name"],
  	mounted(){
  		console.log(this.name)// 浪里行舟
  	}
  }
  
  //provice/inject不是实时响应的，A的name值改变了，B的name值不会变
  ```

- slot

  在组件的HTML模板添加自定义的内容，这个内容可以说任何代码模板。通过slot-scope属性来实现从子组件将一些信息传递给父组件（vue2.1.0以上才支持）。

- $parent/$children与ref

  DOM元素上的ref指向该元素，ref在子组件上指向的是组件实例。

  通过$parent/$children可以拿到父子组件的实例，从而调用实例里的方法，实现父子组件的通信。（不推荐使用）

##### Vue指令

###### v-text=msg  

等价于 {{msg}} 

###### v-html

###### v-pre

###### v-cloak   

保持在元素上直到实例结束进行编译，加载时会闪烁。

###### v-once 

只渲染一次，实例及其所有子节点视为静态节点跳过

###### v-if  

条件渲染，为false元素不会渲染

###### v-show 

元素会渲染，根据样式显示隐藏

###### v-for   

遍历数组进行渲染

###### v-bind  

简写为“:”

###### v-model 

数据双向绑定。

默认同步输入框的值和数据，加v-model.lazy这个修饰符可以转变为change事件后同步。

v-model.number自动将用户的输入值转为数值类型。

v-model.trim自动过滤用户输入的首尾空格

###### v-on

简写为@

```
// 如何绑定多个事件

// 绑定多个相同事件
<button v-on="{click:clickChange(), mouseover:moseChange()}">点我</button>

// 绑定多个事件
<button @click="addStr(), addArr()">点我</button>
```



##### Vue生命周期

| 钩子          | 触发行为                                                  | 可以做的                                             |
| ------------- | --------------------------------------------------------- | ---------------------------------------------------- |
| BeforeCreate  | $el和数据对象data为undefined                              | 加loading事件                                        |
| Created       | data有了，$el还没有                                       | 结束loading，请求数据为mounted渲染做准备             |
| BeforeMount   | $el和data都初始化了，还是虚拟节点，data.filter还未替换    |                                                      |
| Mounted       | Vue实例挂载完成，data.filter成功渲染，DOM渲染已经完成     | 配合路由钩子使用                                     |
| BeforeUpdate  | data更新时触发                                            |                                                      |
| Updated       | data更新时触发                                            | 数据更新时，做一些处理，watch也行                    |
| BeforeDestroy | 组件销毁时触发                                            |                                                      |
| Destroyed     | Vue实例解除了事件监听和dom绑定（不响应），dom节点依旧存在 | 组件销毁时进行提示（页面有定时器时可以在此进行关闭） |

##### 数据双向绑定原理

数据劫持结合发布者-订阅者模式。核心关键是Obeject.defindProperty()劫持getter和setter，数据变动时发布消息给订阅者触发相应的监听回调。

###### js 实现简单的双向绑定

```html
<body>
	<div id="app">
		<input type="text" id="txt" />
		<p id="show"></p>
	</div>
</body>
<script>
	var obj = {}
  Object.defindProperty(obj, 'txt', {
    get: function (){
      return obj
    },
    set: function (newValue){
      document.getElementById('txt').value = newValue
      document.getElementById('show').value = newValue
    }
  })
  document.addEventListener('keyup', function(e){
    obj.txt = e.target.value
  })
</script>
```

##### Vue路由实现：hash模式和history模式

hash模式：window.location.hash读取

history模式：history采用HTML5的新特性，且提供了两个新方法：pushState()，repalceState()可以对浏览器历史记录栈进行修改，以及popState事件的监听到状态变更。

##### Vue-router的钩子函数

```
// to 目标， from 来至， next:function 必须调用该方法resolve这个钩子
beforeEach(to,from,next)
```

##### vuex

```
const store = new Vuex.Store({
  // 里面的数据不可以直接修改
	state: {
		count: 0，
		list : [1,4,6,3,4]
	},
	// 动态修改vuex的store中的状态和数据，view里面store.commit('increment')
	mutations: {
		increment(state){
			state.count++
		}
	},
	// 异步操作数据，view里面store.dispath('increment')来分发action
	actions: {
		increment(context){
			context.commit('increment')
		}
	},
	// getters 过滤数据
	getters: {
		filterData(context){
			return context.state.list.filter(x => x > 3)
		}
	}
})

// context指的是当前的vuex实例，拥有实例里的所有方法，它代理了store的一部分方法
```

##### 自定义指令

```
// 局部指令
var app = new Vue({
	el: "#app",
	data: {},
	directives: {
		dir1: {
			inserted(el){
				console.log(el)
				el.style.width = '200px'
			}
		}
	}
})

// 全局指令
Vue.directive('dir2', {
	inserted(el) {
		console.log(el)
	}
})

// 指令的使用
<div id="app">
	<div v-dir1></div>
	<div v-dir2></div>
</div>
```

##### 过滤器

```
<div id="app">
	<input type="text" v-model="msg" />
	{{msg | capitalize}}
</div>

// 局部过滤器
var vm = new Vue({
	el: '#app',
	data: {
		msg: ''
	},
	filters: {
		capitalize: fucntion(value){
			if(!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	}
})

// 	全局过滤器
Vue.filter('capitalize', function(value){
	if(!value) return ''
	value = value.toString()
	return value.charAt(0).toUpperCase() + value.slice(1)
})
```

###### 常用的十大过滤器



##### Keep-alive

Include 和 exclude















































