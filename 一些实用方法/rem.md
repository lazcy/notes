##### 最简单的

```html
<body>
...内容
<script>
document.documentElement.style.fontSize = document.body.clientWidth / 7.5 + 'px';
</script>
</body>
```

##### 兼容性好的

```javascript
(function(){
	SetRem();
	window.addEventListener("resize",SetRem);
	function SetRem(){
		var html = document.documentElement;
    	var hWidth = html.getBoundingClientRect().width;
			fz = hWidth/7.5;
		html.style.fontSize =  fz <= 100 ? fz + 'px' : '100px';
	}
    	
})()
```

