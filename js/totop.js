var totop = $('#totop');
//监听滚动条的位置
window.onscroll = function () {
	var top = getScrollTop();
	if(top>1000){
		totop.css('display','block');
	}else {
		totop.css('display','none');
	}
	
}
//获取当前滚动条的位置
function getScrollTop (){
	if(document.documentElement.scrollTop){
		return document.documentElement.scrollTop;
	}else {
		return document.body.scrollTop;
	}
}
//设置滚动条位置
function setScroll(value){
	if(document.documentElement.scrollTop){
		document.documentElement.scrollTop = value;
	}else {
		document.body.scrollTop = value;
	}
}
//滑到顶部
function scrollToTop(obj) {
	var timer = setInterval(function(){
		var top = getScrollTop();
		setScroll(top/1.1);
		if(top<1){
			clearInterval(timer);
		}
	},10);
}

totop.click(function(){
	scrollToTop();
});
