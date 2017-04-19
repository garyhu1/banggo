//封装运动函数
function move(obj,json,fn){
	if(obj.timer){
		clearInterval(obj.timer);
	}
	obj.timer = setInterval(function() {
		var flag = true;
		for(var attr in json){
			var current = 0;
			if(attr == 'opacity'){
				current = Math.round(parseInt(getstyle(obj,attr)*100));
			}else {
				current = parseInt(getStyle(obj,attr));
			}
			
			var step = (json[attr] - current)/10;
			step = step>0?Math.ceil(step):Math.floor(step);
			
			if(attr == 'opacity'){
				if('opacity' in obj.style){
					obj.style.opacity = (current+step)/100;
				}else {
					obj.style.filter = 'alpha(opacity='+(current+step)+')';
				}
			}else if(attr == 'zIndex'){
				obj.style.zIndex = json[attr];
			}else {
				obj.style[attr] = (current+step)+"px";
			}
			
			if(current!=json[attr]){
				flag = false;
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn){
				fn();
			}
		}
	},40);
}
//获取样式值
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else {
		return window.getComputedStyle(obj,null)[attr];
	}
}

var imgs1 = document.getElementById("imgs1");
var imgs2 = document.getElementById("imgs2");
//点击左边按钮
$('#rt-btn').click(function() {
	move(imgs1,{left:-1200});
	move(imgs2,{left:0});
});
$('#lt-btn').click(function() {
	move(imgs1,{left:0});
	move(imgs2,{left:1200});
});
