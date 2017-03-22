function loadFrame(){
	console.log('mamade');
	obj.contentWindow.eval('document.body.style.overflow="scroll";$(document.body).append("<link href=\'https://wuhecong.github.io/ncneed/common.css\' rel=\'stylesheet\' type=\'text/css\' />");if(window.location.href.indexOf("DoTestTask.aspx")!=-1 || window.location.href.indexOf("ViewTestTask.aspx")!=-1){console.log(window.location.href);$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");console.log("确实注入了");}');
}
var obj = document.getElementById("mainFrame");
obj.addEventListener("load",loadFrame);
obj.contentWindow.eval('console.log(window.location.href);document.body.style.overflow="scroll";console.log("确实注入了");$(document.body).append("<link href=\'https://wuhecong.github.io/ncneed/common.css\' rel=\'stylesheet\' type=\'text/css\' />");');

