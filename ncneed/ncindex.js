var obj = document.getElementById("mainFrame");
obj.addEventListener("load",loadFrame());
var url = obj.contentWindow.location.href;
obj.contentWindow.eval('document.body.style.overflow="scroll";');
console.log(url);
if(url.indexOf("DoTestTask.aspx")!=-1 ||url.indexOf("ViewTestTask.aspx")!=-1){
console.log('确实注入了');
}
function loadFrame(){
	url = obj.contentWindow.location.href;
	console.log('in '+ url);
	if(url.indexOf("DoTestTask.aspx")!=-1 || url.indexOf("ViewTestTask.aspx")!=-1){
		obj.contentWindow.eval('document.body.style.overflow="scroll";$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
		console.log('确实注入了');
	}
}
