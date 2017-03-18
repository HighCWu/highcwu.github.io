
var worker;
var sampleImageData;
var sampleVideoData;
var outputElement;
var filesElement;
var running = false;
var isWorkerLoaded = false;
var isSupported = (function() {
  return document.querySelector && window.URL && window.Worker;
})();

function isReady() {
  return !running && isWorkerLoaded && sampleImageData && sampleVideoData;
}

function startRunning() {
  document.querySelector("#image-loader").style.visibility = "visible";
  outputElement.className = "";
  filesElement.innerHTML = "";
  running = true;
}
function stopRunning() {
  document.querySelector("#image-loader").style.visibility = "hidden";
  running = false;
}

function retrieveSampleImage() {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "bigbuckbunny.jpg", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      sampleImageData = new Uint8Array(arrayBuffer);
    }
  };

  oReq.send(null);
}

function retrieveSampleVideo() {
  var oReq = new XMLHttpRequest();
  oReq.open("GET", "bigbuckbunny.webm", true);
  oReq.responseType = "arraybuffer";

  oReq.onload = function (oEvent) {
    var arrayBuffer = oReq.response;
    if (arrayBuffer) {
      sampleVideoData = new Uint8Array(arrayBuffer);
    }
  };

  oReq.send(null);
}

function parseArguments(text) {
  text = text.replace(/\s+/g, ' ');
  var args = [];
  // Allow double quotes to not split args.
  text.split('"').forEach(function(t, i) {
    t = t.trim();
    if ((i % 2) === 1) {
      args.push(t);
    } else {
      args = args.concat(t.split(" "));
    }
  });
  return args;
}
/****/
var num = 1;
var msg;
onmessage = function(event){
	console.log(event.data);
	var message = msg = event.data;//仅适用当前测试用于其他用途状况
	if(message['Ready']!=0){
		console.log(message['Ready'])
		stopRunning();
		var InT = setInterval(function(){
			if(!running && isWorkerLoaded){
				num--;
				runParentCommand(message.text[0],message.files);
				console.log('yes');
				clearInterval(InT)
				}
				},1000);//output必须加上‘output/’作为读取文件夹
	}
}

function runParentCommand(text,parentFiles) {
	startRunning();
	var args = parseArguments(text);
	console.log(args);
	worker.postMessage({
	  type: "command",
	  arguments: args,
	  files: parentFiles
	});
}
/******/
function runCommand(text) {
  if (isReady()) {
    startRunning();
    var args = parseArguments(text);
    console.log(args);
    worker.postMessage({
      type: "command",
      arguments: args,
      files: [
        {
          "name": "input.jpeg",
          "data": sampleImageData
        },
        {
          "name": "input.webm",
          "data": sampleVideoData
        }
      ]
    });
  }
}

function getDownloadLink(fileData, fileName) {
  if (fileName.match(/\.jpeg|\.gif|\.jpg|\.png/)) {
    var blob = new Blob([fileData]);
    var src = window.URL.createObjectURL(blob);
    var img = document.createElement('img');

    img.src = src;
    return img;
  }
  else {
    var a = document.createElement('a');
    a.download = fileName;
    var blob = new Blob([fileData]);
    var src = window.URL.createObjectURL(blob);
    a.href = src;
    a.textContent = 'Click here to download ' + fileName + "!";
    return a;
  }
}

function initWorker() {
  worker = new Worker("worker-asm.js");
  worker.onmessage = function (event) {
    var message = event.data;
    if (message.type == "ready") {
      isWorkerLoaded = true;
    } else if (message.type == "stdout") {
      outputElement.textContent += message.data + "\n";
    } else if (message.type == "start") {
      outputElement.textContent = "Worker has received command\n";
    } else if (message.type == "done") {
      stopRunning();
	  if(window.top != window.self){
		  window.parent.postMessage(message,'*');
		  if(num == 0){
			  runParentCommand(msg.text[1],msg.files);
			  num = 1;
		  }
	  }
	  else{
		  var buffers = message.data;
		  if (buffers.length) {
			outputElement.className = "closed";
		  }
		  buffers.forEach(function(file) {
			filesElement.appendChild(getDownloadLink(file.data, file.name));
		  });
	  }
    }
  };
}

document.addEventListener("DOMContentLoaded", function() {

  initWorker();
  //console.log(window.parent.location.href);
  if(window.top != window.self){
	//window.addEventListener("message", onmessage, false);
	console.log(window.location.href);
  }
  else{
	retrieveSampleVideo();
	retrieveSampleImage();
	}
  

  var inputElement = document.querySelector("#input");
  outputElement = document.querySelector("#output");
  filesElement = document.querySelector("#files");
  inputElement.innerHTML = '-help' + ' ';
  document.querySelector("#run").addEventListener("click", function() {
    runCommand(inputElement.value);
  });

  [].forEach.call(document.querySelectorAll(".sample"), function(link) {
    link.addEventListener("click", function(e) {
      inputElement.value += this.getAttribute("data-command") + " ";
      e.preventDefault();
    });
  });

});