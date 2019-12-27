##### html2canvas在vue里应用

npm直接安装的html2canvas不知何原因，放大两倍后截图出来的图片只有完整图片的一半，用插件里面的html2canvas.min.js文件放大截图就不会有问题

```vue
// 在index.html页面引入js文件
<script src="./html2canvas.min.js"></script>


//vue文件里面引用,样式自己定义就可以了
<template>
<div>
  <div ref="captrue">
  ...内容
  </div>
  <input type="button" value="确认" class="btn" @click="generatorImage()" />
</div>
</template>


<script>
// 这里不需要再引入了
export default{
  data(){
     return{}
  },
  mwthods:{
  	generatorImage(){
  		let capture = this.$refs.capture;
      let width = capture.offsetWidth; //获取dom 宽度
      let height = capture.offsetHeight; //获取dom 高度
      let canvas = document.createElement("canvas");
      let scale = 2; //定义任意放大倍数 支持小数
      canvas.width = width * scale; //定义canvas 宽度 * 缩放
      canvas.height = height * scale; //定义canvas高度 *缩放
      canvas.getContext("2d").scale(scale, scale); //获取context,设置scale
      // canvas.getContext("2d").translate(0, 0);
      let opts = {
        scale:scale, // 添加的scale 参数
          canvas:canvas, //自定义 canvas
          width:width, //dom 原始宽度
          height:height, //dom 原始高度
          useCORS: true,
          dpi: 300
      }
      // 需要通过window来调用html2canvas这个方法
      window.html2canvas(capture, opts).then(canvas => { 
            let link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.setAttribute('download', '盈利图.png');
            link.style.display = 'none';
            document.body.appendChild(link);
            link.click();
        })
  	}
  }
}
</script>
```

