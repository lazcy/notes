##### 构建vue-cli工程都用到了哪些技术，他们的作用分别是什么

1. vue.js：vue-cli工程的核心，主要特点是数据的双向绑定和组件系统
2. Vue-router：vue官方推荐使用的路由框架
3. vuex：专门为Vue.js应用项目开发的状态管理器，主要用于维护Vue组件间共用的一些变量和方法
4. Axios或fetch,ajax：用于发起GET，POST等请求，给予Promise设计
5. Vux：一个专门为Vue设计的移动端UI组件库（推荐使用vant UI）
6. 创建一个emit.js文件，用于Vue事件机制管理
7. Webpack：模块加载和vue-cli工程打包器

##### 常用的打包命令

```
npm install
npm run dev
npm run build
npm run build --report  // 显示项目资源文件大小
```

##### 项目目录结构

###### 