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
// (function rem() {
// 	var fz = document.querySelector('html').offsetWidth / 7.5;
// 	document.querySelector('html').style.fontSize =
// 	fz <= 100 ? fz + 'px' : '100px';
// 	window.onresize = function() {
// 	rem();
// 	};
// })();
