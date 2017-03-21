var obj = document.getElementById("mainFrame");
obj.addEventListener("load",loadFrame());
obj.style.overflow='scroll';
var url = obj.contentWindow.location.href;
if(url.indexOf("DoTestTask.aspx")!=-1 ||url.indexOf("ViewTestTask.aspx")!=-1){
	obj.contentWindow.eval('document.bodystyle.overflow="scroll";$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
	console.log('确实注入了');
}
function loadFrame(){
	obj.style.overflow='scroll';
	url = obj.contentWindow.location.href;
	if(url.indexOf("DoTestTask.aspx")!=-1 || url.indexOf("ViewTestTask.aspx")!=-1){
		obj.contentWindow.eval('document.bodystyle.overflow="scroll";$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
		console.log('确实注入了');
	}
}
