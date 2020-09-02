##### Vue是一套渐进式框架的理解

渐进式代表的含义：没有多做职责之外的事。

vue.js只提供了vue-cli生态中最核心的组件系统和双向数据绑定。像vuex、vue-router都属于围绕vue.js开发的库。

###### Anglular：

必须使用它的模块机制

必须使用它的依赖注入

必须使用它的特殊形式定义组件（每个视图框架都有这个问题）

###### React：

函数式编程

需要知道什么是副作用

什么是纯函数

如何隔离副作用

它的侵入性看似没有angluar强，主要是它是软性侵入

###### Vue跟React、Angular的不同：

在原大系统上面，把一两个组件改成它实现，当JQuery使用

可以整个都用它全家桶开发，当Angular使用

可以用它的视图，搭配自己设计的整个下层用

也可以函数式，都可以，它只是个轻量视图而已，只做了最核心的东西

##### Vue的两个核心

数据双向绑定和组件系统

##### v-if和v-show的区别

v-if对应样式的display:none或block

v-show对应样式的visible:show或hidden

##### vue常用的修饰符





##### 事件修饰符

###### .stop阻止事件继续传播，阻止冒泡，阻止子元素的事件传递到父元素

```
<div v-on:click="alert('parent')">
	<button v-on:click.stop="alert('child')"></button>
</div>
// 点击button是弹出提示child，parent不会弹出
```

###### .prevent阻止submit默认提交事件

```
<form v-on:submit.prevent="onSubmit"></form>
```

###### .capture优先执行最外层有.capture的父元素，再执行倒数第二个有.capture父元素，最后按照正常的冒泡从自己开始往上执行

```html
<div @click.capture="outer">
  <div @click.capture="middle">
    <button @click="inner">
      点击
    </button>
  </div>
</div>
// 执行顺序为outer->middle->inner


<div @click="outer">
  <div @click.capture="middle">
    <button @click="inner">
      点击
    </button>
  </div>
</div>
// 执行顺序middle->inner->outer
```

###### .self的作用是不让子元素的事件触发到自己的绑定事件，但是不会阻止冒泡，相当于跳过自己执行冒泡

```
<div @click="outer">
  <div @click.self="middle">
    <button @click="inner">
      点击
    </button>
  </div>
</div>
// 点击button，先执行inner,传递到父元素Middle但是.self阻止了middle点击事件，所以继续冒泡到外层Outer
```

###### .once 执行后不会再执行第二次

##### $nextTick

created（）时，DOM还没有进行任何渲染，进行的DOM操作需要放在$nextTIck（）

在数据改变之后的操作和改变之后的DOM有关，都应该使用$nextTIck（）

##### vue组件的data必须是函数

Object是引用数据类型，都是内存同一个地址，一个改变其他也改变了

javascript只有函数构成作用域。组件的data是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立不会相互影响