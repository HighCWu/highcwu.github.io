document.getElementById('mainFrame').onload=function(){loadFrame(this);};
function loadFrame(obj){
	var url = obj.contentWindow.location.href;
	obj.style.overflow="scroll";
	document.getElementsByClassName('header')[0].style.overflow="scroll";
	if(url.indexOf("ViewTestTask.aspx")!=-1){
		obj.contentWindow.eval('$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
	}
}