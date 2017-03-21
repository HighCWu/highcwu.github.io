document.getElementById("mainFrame").addEventListener("load",loadFrame(this));
function loadFrame(obj){
	obj.style.overflow='scroll';
	var url = obj.contentWindow.location.href;
	if(url.indexOf("DoTestTask.aspx")!=-1 ||url.indexOf("ViewTestTask.aspx")!=-1){
		obj.contentWindow.eval('$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
	}
}
