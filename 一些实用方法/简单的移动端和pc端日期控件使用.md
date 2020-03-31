##### 移动端简单版日期控件使用(LCalendar)

https://github.com/xfhxbb/LCalendar

```html
<link rel="stylesheet" href="./js/LCalendar.css">

 <input type="text" readonly="" id="date" name="date" class="date" placeholder="请输入日期" />
 
 <script src="./js/jquery-1.8.3.min.js"></script>//方便我使用$
 <script src="./js/LCalendar.js"></script>
 <script>
    var dd = new Date();
       dd = new Date(dd.setDate(dd.getDate() + 1)); // 获取明天的时间
    var str = dd.getFullYear() + '-' + (dd.getMonth() +1) + '-' + dd.getDate();
    $('#date').val(str);
    var calendar = new LCalendar();
    calendar.init({
        'trigger': '#date',//标签id
        'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
        'minDate': str
    });
</script>
```

##### pc端的简单控件（layui）

https://www.layui.com/doc/

```html
<link rel="stylesheet" href="./js/layui/css/layui.css">

<input type="text" class="layui-input" id="date" placeholder="选择时间">

<script src="./js/layui/layui.js"></script>
  <script>
    layui.use('laydate', function(){
      var laydate = layui.laydate;
      var day = new Date();
      day = new Date(day.setDate(day.getDate() + 1));
      console.log(day)
      //执行一个laydate实例
      laydate.render({
        elem: '#date', //指定元素
        value: day,
        min: 1
      });
    });
</script>
```

