- 什么是MVVM

  `MVVM就是View-ViewModle-Model，即视图层-视图模型层-模型层`

- 模板语法

  1. 插值

     ```html
     文本插值  	  {{ message }}
     HTML插值  	<span v-html="<i>aaa</i>"></span>	
     V-bind插值 	<span v-bind="message"></span>
     表达式			<span>{{ a > 0 ？true : false}}</span>
     ```



- 生命周期

  ```js
  $el new Vue()这个实例
  
  beforcreate($el创建前)
  ->
  created($el创建后,可以请求数据之类的操作)
  ->
  beforMount($el加载前)
  ->
  mounted($el加载完成后，可以获取$el)
  ->
  beforDestroy($el被销毁前)
  ->
  destroyed($el销毁后)
  
  注：
  不要在选项或者回调上使用箭头函数，比如 created: () => console.log(this.a)
  要操作页面的dom元素必须实例加载完成后
  this.$nextTick(()=>{
  	// 这里进行
  })
  ```

  

- 样式绑定

  ```html
  // red和blue表示样式的className,isRed和isBlue表示属性值
  
  <span :class="{'red':isRed,'blue':isBlue}"></span><span :class="{'red':isRed,'blue':isBlue}"></span>
  
  // 若isRed = true,isBlue=true,标签会渲染为：
  <span class="red blue"></span>
  ```

  

- 列表渲染

  `vue2.0之后要求循环渲染必须要绑定key,key对应的值可以是number,string，但是不能重复！！！`

  ```html
  
  <ul>
  	<li v-for="(item,index) in lists" :key="index">{{item}}</li>
  </ul>
  ```

  

- 数组的更新

  `数组长度没有变化，只是数组里面对应元素的属性值改变，视图是不会重新渲染的`

  

- 对象的更新




