##### 多层单双引号嵌套

```js
var div = document.createElement("div");
        let cv = {
            id: 1,
            name: 'biliblil',
            contract: {
                a: 1,
                b: 2
            }
        };
        console.log(document.getElementById('list'))
            // div.innerHTML = '<a>2356346236</a>'
        div.innerHTML = '<a href="javascript:void(0);"  onclick="checkWhiteList(\'' + cv.id + "," + cv.name + "," + cv.contract.a + '\')">白名单审核</a>';
		// div.innerHTML = "<a href='javascript:void(0);'  onclick='checkWhiteList(\"" + cv.id + ',' + cv.name + "\")'>白名单审核</a>";
        document.body.insertBefore(div, document.body.firstElementChild);

        function checkWhiteList(id, name, contract) {
            console.log(id, name, contract)
        }
```

##### 复用dom元素

https://segmentfault.com/a/1190000008571506

```html
<script id="template" type="text/html"><!-- 注意标签内的type属性,注意单双引号-->
    <div class="form-ground">
    	<input type="text" name='{id}' hidden />
    	乘客姓名：<input type="text" name='{name}' />
    </div>
</script>


// 使用
function getHtmlTemplate(obj) {
    var templates = $('#template').html();
    templates.replace(obj.id, '{id}');
    templates.replace(obj.name, '{name}');
    return templates
}
```

##### slice和splice

```javascript
// slice截取数组元素slice(index, num)
var arr= ['red', 'blue', 'green', 'orange', 'black'];
arr.slice(1,2); // ['blue', 'green'];

// splice删除指定下标的元素个数,splice(index, num)
var arr= ['red', 'blue', 'green', 'orange', 'black'];
arr.splice(1,1); // ['red', 'green', 'orange', 'black']
// 如果不知道下标 
var temp = 'blue';
// arr.indexOf(temp) 获取元素在数组里的下标
arr.splice(arr.indexOf(temp), 1);
```

