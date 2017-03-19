if(document.getElementById('mainFrame')){
	document.getElementById('mainFrame').id='xx';
	document.getElementById('xx').outerHTML='';
	ifr=document.createElement('iframe');
	ifr.src='student/,DanaInfo=10.3.17.250+index.aspx';
	ifr.id='mainFrame';
	ifr.onload=function(){loadFrame(this);};
	document.body.appendChild(ifr);
}
function loadFrame(obj){
	var url = obj.contentWindow.location.href;
	obj.onload=function(){};
	obj.width = document.body.clientWidth;
	obj.height = document.body.clientHeight;
	iframe.focus();
    clearInterval(resizeID);
	obj.style.overflow="scroll";
	document.getElementsByClassName('header')[0].style.overflow="scroll";
	if(url.indexOf("ViewTestTask.aspx")!=-1){
		obj.contentWindow.eval('$(document.body).append("<script src=\'https://wuhecong.github.io/ncneed/ncneed.js\'></script>");');
	}
}