//网络请求的封装
function ajax(method, url, success, fail, data) {
	var request;
	if(window.XMLHttpRequest) {
		request = new XMLHttpRequest();
	} else {
		request = new ActiveXObject('Microsoft.XMLHTTP');
	}

	request.onreadystatechange = function() {
		if(request.readyState === 4) {
			if(request.status === 200) {
				success(request.responseText);
			} else {
				fail('Error Code : ' + request.status);
			}
		}
	}

	data = data ? data : "";
	if(method.toUpperCase() === "GET") {
		request.open(method, url + "?" + data, true);
		request.send();
	} else {
		request.open(method, url, true);
		request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		request.send();
	}
}

//封装轮播图的对象
function runImg() {}
runImg.prototype = {
	count: 0,
	imgurls: [],
	imglist: null,
	numlist: null,
	bigbox: null,
	prov: 0,
	index: 0,
	play: null,
	timer: null,
	$: function(id) {
		if(typeof(id) == "string") {
			if(id.indexOf("#") >= 0) {
				id = id.replace("#", "");
				if(document.getElementById(id)) {
					return document.getElementById(id);
				} else {
					alert("没有该容器");
					return null;
				}
			} else {
				return document.createElement(id);
			}
		} else {
			return id;
		}
	},
	info: function(id) {
		this.count = this.count <= 5 ? this.count : 5;
		this.bigbox = this.$(id);
		this.numlist = document.getElementById("banner-title").getElementsByTagName("li");
		var container = document.getElementById("banner-layout");
		var u = this.$("ul");
		for(var i = 0; i < this.count; i++) {
			var li = this.$("li");
			li.innerHTML = this.imgurls[i];
			u.appendChild(li);
		}
		container.appendChild(u);
		this.imglist = container.getElementsByTagName("ul")[0].getElementsByTagName("li");
		for(var j = 0; j < this.imglist.length; j++) {
			this.alpha(j, 0);
		}
		this.alpha(0, 100);
		this.numlist[0].getElementsByTagName("a")[0].className = "pressed";
	},
	alpha: function(a, b) {
		this.imglist[a].style.opacity = b / 100;
		this.imglist[a].style.filter = "alpha(opacity=" + b + ")";
	},
	action: function() {
		this.autoplay();
		this.mouseoverout(this.bigbox, this.numlist);
	},
	autoplay: function() {
		var that = this;
		//		this.index = ind;
		this.play = setInterval(function() {
			that.prov = that.index;
			that.index += 1;
			if(that.index > that.imglist.length - 1) {
				that.index = 0;
			}
			that.imgshow(that.index, that.imglist, that.numlist);
		}, 2000);
	},
	mouseoverout: function(box, numlist) {
		var that = this;
		box.onmouseover = function() {
			clearInterval(that.play);
		};
		box.onmouseout = function() {
			that.autoplay();
		}
		for(var i = 0; i < numlist.length; i++) {
			numlist[i].getElementsByTagName("a")[0].index = i;
			numlist[i].getElementsByTagName("a")[0].onmouseover = function() {
				//				clearInterval(that.play);
				that.prov = that.index;
				that.imgshow(this.index, that.imglist, that.numlist);
			}
		}
	},
	imgshow: function(ind, imglist, numlist) {
		var pro = 100;
		var cur = 0;
		this.index = ind;
		for(var i = 0; i < imglist.length; i++) {
			this.alpha(i, 0);
		}
		this.alpha(this.prov, 100);
		this.alpha(this.index, 0);
		for(var j = 0; j < numlist.length; j++) {
			this.numlist[j].getElementsByTagName("a")[0].className = "";
		}
		this.numlist[this.index].getElementsByTagName("a")[0].className = "pressed";

		var that = this;
		this.timer = setInterval(function() {
			pro -= 2;
			cur += 2;
			if(pro < 0) {
				pro = 0;
			}
			if(cur > 100) {
				cur = 100;
			}
			that.alpha(that.prov, pro);
			that.alpha(that.index, cur);
			if(pro == 0 && cur == 100) {
				clearInterval(that.timer);
			}
		}, 20);

	}
}

ajax("get", "../data/bannerimgs.json", success, fail);

function fail(errorcode) {
	alert(errorcode);
}

function success(data) {
	var d = JSON.parse(data);
	setBanner(d);
}

function setBanner(data) {
	var runimg = new runImg();
	runimg.count = 4;
	runimg.imgurls = [
		"<img src=" + data.imgs[0].img + "/>",
		"<img src=" + data.imgs[1].img + "/>",
		"<img src=" + data.imgs[2].img + "/>",
		"<img src=" + data.imgs[3].img + "/>",
	]
	runimg.info("#mid-banner");
	runimg.action();
}