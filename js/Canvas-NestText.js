/**
 * Copyright (c) 2017 wuhecong
 * License: MIT
 * Version: %%GULP_INJECT_VERSION%%
 * GitHub: https://github.com/wuhecong/Canvas-NestText.js
**/
/**
 * Copyright (c) 2016 hustcc
 * License: MIT
 * Version: %%GULP_INJECT_VERSION%%
 * GitHub: https://github.com/hustcc/canvas-nest.js
**/
var fx = window.innerWidth;
var fy = window.innerHeight;
var CanvasArray = new Array();
CanvasArray[0] = document.createElement("canvas");
CanvasArray[0].style = "position:absolute; top:0; left:0;";
CanvasArray[0].width = window.innerWidth;
CanvasArray[0].height = window.innerHeight;
document.getElementsByTagName('body')[0].appendChild(CanvasArray[0]);
! function() {
  //封装方法，压缩之后减少文件大小
  function get_attribute(node, attr, default_value) {
    return node.getAttribute(attr) || default_value;
  }
  //封装方法，压缩之后减少文件大小
  function get_by_tagname(name) {
    return document.getElementsByTagName(name);
  }
  //获取配置参数
  function get_config_option() {
    var scripts = get_by_tagname("script"),
      script_len = scripts.length,
      script = scripts[script_len - 1]; //当前加载的script
    return {
      l: script_len, //长度，用于生成id用
      z: get_attribute(script, "zIndex", -1), //z-index
      o: get_attribute(script, "opacity", 0.5), //opacity
      c: get_attribute(script, "color", "0,0,0"), //color
      n: get_attribute(script, "count", 99) //count
    };
  }
  //设置canvas的高宽

  //绘制过程
  function draw_canvas() {
    context.clearRect(0, 0, CanvasArray[1].width, CanvasArray[1].height);
    //随机的线条和当前位置联合数组
    var e, i, d, x_dist, y_dist, dist; //临时节点
    //遍历处理每一个点
    random_points.forEach(function(r, idx) {
      r.x += r.xa, 
      r.y += r.ya, //移动
      r.xa *= r.x > CanvasArray[1].width || r.x < 0 ? -1 : 1, 
      r.ya *= r.y > CanvasArray[1].height || r.y < 0 ? -1 : 1, //碰到边界，反向反弹
      context.fillRect(r.x - 0.5, r.y - 0.5, 1, 1); //绘制一个宽高为1的点
      //从下一个点开始
      for (i = idx + 1; i < all_array.length; i++) {
        e = all_array[i];
        // 当前点存在
        if (null !== e.x && null !== e.y) {
          x_dist = r.x - e.x; //x轴距离 l
          y_dist = r.y - e.y; //y轴距离 n
          dist = x_dist * x_dist + y_dist * y_dist; //总距离, m

          dist < e.max && (e === current_point && dist >= e.max / 2 && (r.x -= 0.03 * x_dist, r.y -= 0.03 * y_dist), //靠近的时候加速
            d = (e.max - dist) / e.max,
            context.beginPath(),
            context.lineWidth = d / 2,
            context.strokeStyle = "rgba(" + config.c + "," + (d + 0.2) + ")",
            context.moveTo(r.x, r.y),
            context.lineTo(e.x, e.y),
            context.stroke());
        }
      }
    }), frame_func(draw_canvas);
  }
  //创建画布，并添加到body中
  var the_canvas = document.createElement("canvas"), //画布
    config = get_config_option(), //配置
    canvas_id = "c_n" + config.l, //canvas id
    context = the_canvas.getContext("2d"),
    frame_func = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(func) {
      window.setTimeout(func, 1000 / 45);
    }, random = Math.random, 
    current_point = {
      x: null, //当前鼠标x
      y: null, //当前鼠标y
      max: 20000 // 圈半径的平方
    },
    all_array;
  the_canvas.id = canvas_id;
  the_canvas.style.cssText = "position:fixed;top:0;left:0;z-index:" + config.z + ";opacity:" + config.o;
  CanvasArray[1] = the_canvas;
  CanvasArray[1].width=window.screen.width;
  CanvasArray[1].height=window.screen.height;
  //当时鼠标位置存储，离开的时候，释放当前位置信息
  window.onmousemove = function(e) {
    e = e || window.event;
    current_point.x = e.clientX;
    current_point.y = e.clientY;
  }, window.onmouseout = function() {
    current_point.x = null;
    current_point.y = null;
  };
  //随机生成config.n条线位置信息
  for (var random_points = [], i = 0; config.n > i; i++) {
    var x = random() * CanvasArray[1].width, //随机位置
      y = random() * CanvasArray[1].height,
      xa = 2 * random() - 1, //随机运动方向
      ya = 2 * random() - 1;
    // 随机点
    random_points.push({
      x: x,
      y: y,
      xa: xa,
      ya: ya,
      max: 6000 //沾附距离
    });
  }
  all_array = random_points.concat([current_point]);
  //0.1秒后绘制
  setTimeout(function() {
    draw_canvas();
  }, 100);
}();
var Camera = new Array();
function textToLine(wTextSet,wX,wY,ParticleNum,Closenness){
	/*wTextSet=[{text:"COPLANMIC@BREAK", sphereRadius:140, sphereSpace:80, unitTime:100, time:1000},
{text:"Show", sphereRadius:140, sphereSpace:80, unitTime:100, time:1000},
		{text:"THE_WORLD", sphereRadius:120, sphereSpace:70, unitTime:120, time:4000},
		{text:"@@@@@@@@", sphereRadius:60 + Math.random()*60, sphereSpace:200, unitTime:100, time:4000}
];
Closenness疏密0.5,1,2,4等
*/
	var camera = {
		focus : 4000,
		self : {
			x : 0,
			y : 0,
			z : 0
		},
		rotate : {
			x : 0,
			y : 0,
			z : 0
		},
		up : {
			x : 0,
			y : 1,
			z : 0
		},
		zoom : 1,
		display : {
			x : ((2*wX)+((wTextSet[0].text.length)*(wTextSet[0].sphereSpace)))/2,
			y : wY + 0.5*wTextSet[0].sphereSpace,
			z : 0
		},
		'wX' : ((2*wX)+((wTextSet[0].text.length)*(wTextSet[0].sphereSpace)))/2,
		'wY' : wY + 0.5*wTextSet[0].sphereSpace
	};
	Camera.push(camera);
	var cam = Camera.length-1;
	var affine = {
		world : {
			size : function(p, size) {
				return {
					x :	p.x * size.x,
					y : p.y * size.y,
					z : p.z * size.z
				}
			},
			rotate: {
				x : function(p, rotate) {
					return {
						x : p.x,
						y : p.y*Math.cos(dtr(rotate.x)) - p.z*Math.sin(dtr(rotate.x)),
						z : p.y*Math.sin(dtr(rotate.x)) + p.z*Math.cos(dtr(rotate.x))
					}
				},
				y : function(p, rotate) {
					return {
						x : p.x*Math.cos(dtr(rotate.y)) + p.z*Math.sin(dtr(rotate.y)),
						y : p.y,
						z : -p.x*Math.sin(dtr(rotate.y)) + p.z*Math.cos(dtr(rotate.y))
					}
				},
				z : function(p, rotate) {
					return {
						x : p.x*Math.cos(dtr(rotate.z)) - p.y*Math.sin(dtr(rotate.z)),
						y : p.x*Math.sin(dtr(rotate.z)) + p.y*Math.cos(dtr(rotate.z)),
						z : p.z
					}
				}
			},
			position : function(p, position) {
				return {
					x : p.x + position.x,
					y : p.y + position.y,
					z : p.z + position.z
				}
			},
		},
		view : {
			point : function(p) {
				return {
					x : p.x - Camera[cam].self.x,
					y : p.y - Camera[cam].self.y,
					z : p.z - Camera[cam].self.z
				}
			},
			x : function(p) {
				return {
					x : p.x,
					y : p.y*Math.cos(dtr(Camera[cam].rotate.x)) - p.z*Math.sin(dtr(Camera[cam].rotate.x)),
					z : p.y*Math.sin(dtr(Camera[cam].rotate.x)) + p.z*Math.cos(dtr(Camera[cam].rotate.x))
				}
			},
			y : function(p) {
				return {
					x : p.x*Math.cos(dtr(Camera[cam].rotate.y)) + p.z*Math.sin(dtr(Camera[cam].rotate.y)),
					y : p.y,
					z : p.x*-Math.sin(dtr(Camera[cam].rotate.y)) + p.z*Math.cos(dtr(Camera[cam].rotate.y))
				}
			},
			viewReset : function(p) {
				return {
					x : p.x - Camera[cam].self.x,
					y : p.y - Camera[cam].self.y,
					z : p.z - Camera[cam].self.z
				}
			},
			righthandedReversal : function(p) {
				return {
					x : p.x,
					y : -p.y,
					z : p.z,
				}
			}
		},
		perspective : function(p) {
			return {
				x : p.x * ((Camera[cam].focus-Camera[cam].self.z) / ((Camera[cam].focus-Camera[cam].self.z) - p.z)) * Camera[cam].zoom,
				y : p.y * ((Camera[cam].focus-Camera[cam].self.z) / ((Camera[cam].focus-Camera[cam].self.z) - p.z)) * Camera[cam].zoom,
				z : p.z * ((Camera[cam].focus-Camera[cam].self.z) / ((Camera[cam].focus-Camera[cam].self.z) - p.z)) * Camera[cam].zoom,
				p : ((Camera[cam].focus-Camera[cam].self.z) / ((Camera[cam].focus-Camera[cam].self.z) - p.z)) * camera.zoom,
			}
		},
		display : function(p, display) {
			return {
				x : p.x + display.x,
				y : p.y + display.y,
				z : p.z + display.z,
				p : p.p,
			}
		},
		process : function(model, size, rotate, position,display) {
			var ret = affine.world.size(model, size);
			ret = affine.world.rotate.x(ret, rotate);
			ret = affine.world.rotate.y(ret, rotate);
			ret = affine.world.rotate.z(ret, rotate);
			ret = affine.world.position(ret, position);
			ret = affine.view.point(ret);
			ret = affine.view.x(ret);
			ret = affine.view.y(ret);
			ret = affine.view.viewReset(ret);
			ret = affine.view.righthandedReversal(ret);
			ret = affine.perspective(ret);
			ret = affine.display(ret, display);
			return ret;
		}
	};



	var vertex3d = function(param) {
		this.affineIn = new Object;
		this.affineOut = new Object;
		if(param.vertex !== undefined) {
			this.affineIn.vertex = param.vertex;
		} else {
			this.affineIn.vertex = {x:0,y:0,z:0};
		};
		if(param.size !== undefined) {
			this.affineIn.size = param.size;
		} else {
			this.affineIn.size = {x:1,y:1,z:1};
		};
		if(param.rotate !== undefined) {
			this.affineIn.rotate = param.rotate;
		} else {
			this.affineIn.rotate = {x:0,y:0,z:0};
		};
		if(param.position !== undefined) {
			this.affineIn.position = param.position;
		} else {
			this.affineIn.position = {x:0,y:0,z:0};
		};
	};
	vertex3d.prototype = {
		vertexUpdate : function() {
			this.affineOut = affine.process(
				this.affineIn.vertex,
				this.affineIn.size,
				this.affineIn.rotate,
				this.affineIn.position,
				Camera[cam].display
			);
		}
	};

		var dtr = function(v) {return v * Math.PI/180;};
		//坐标系转换
		//极坐标转直角坐标
		var polarToRectangle =  function(dX, dY, radius) {
			var x = Math.sin(dtr(dX)) * Math.cos(dtr(dY)) * radius;
			var y = Math.sin(dtr(dX)) * Math.sin(dtr(dY)) * radius;
			var z = Math.cos(dtr(dX)) * radius;
			return {x:y, y:z, z:x};
		};
		//直角坐标转极坐标
		var rectangleToPolar = function(x, y, z) {
			if(x == 0)	var xD = 0.001;
			else		var xD = x;
			if(y == 0)	var yD = 0.001;
			else		var yD = y;
			if(z == 0)	var zD = 0.001;
			else		var zD = z;
			var radius = Math.sqrt(xD*xD + yD*yD + zD*zD);
			var theta = Math.atan(zD / Math.sqrt(xD*xD + yD*yD));
			var phi = Math.atan(yD / xD);
			return {x:theta*(180/Math.PI), y:phi*(180/Math.PI), r:radius};
		};
		var closeValue = function(minTime, maxTime) {
			this.flag = 0;
			this.progress = 0;
			this.startTime = 0;
			this.durationTime = 0;
			this.fromValue = 0;
			this.toValue = 0;
			this.minValue = 0;
			this.maxValue = 1;
			this.minDuration = minTime;
			this.maxDuration = maxTime;
		};
		closeValue.prototype = {
			init : function() {
				this.durationTime = this.minDuration + (this.maxDuration-this.minDuration) * Math.random();
				this.startTime = Date.now();
				this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime))
				this.fromValue = this.toValue;
				this.toValue = this.minValue + this.maxValue * Math.random();
				this.flag = 1;
				return this.fromValue + (this.toValue - this.fromValue) * this.progress;
			},
			update : function() {
				this.progress = Math.min(1, ((Date.now()-this.startTime)/this.durationTime));
				if(this.progress== 1) this.flag = 0;
				return this.fromValue + (this.toValue - this.fromValue) * this.progress;
			},
			execution : function() {
				if(this.flag == 0)		{return this.init()}
				else if(this.flag == 1)	{return this.update()};
			}
		};

		var strokeColor = "rgba(0,0,0,0.1)";
		var backgroundColor = "rgba(255,255,255,0)";
		var vibrateFlag = false;
		var canvas = document.createElement("canvas");
		CanvasArray.push(canvas);
		CanvasArray[CanvasArray.length-1].width=window.innerWidth;
		CanvasArray[CanvasArray.length-1].height=window.innerHeight;
		canvas.style = "position:absolute; top:0; left:0;";
		var ctx	= canvas.getContext("2d");
		ctx.strokeStyle = strokeColor;
			
		
		CanvasArray.push(canvas);
		
		/* class */
		var	sphere = function(arg) {//变化用球体，球坐标系中的(theta角度,phi角度φ)
			this.flag = true;
			this.type = "_";
			this.particleNum = arg.particleNum;//粒子数，建议不要太多
			this.center = {x:0, y:0, z:0};
			this.targetCenter = arg.center;
			this.radius = 0;//半径
			this.targetRadius = arg.radius;
			
			this.degree = new Array();
			this.freeDegreeSpeed = new Array();
			for(var j=0; j<this.particleNum; j++) {
				this.degree[j] = {theta:0, phi:0};
				this.freeDegreeSpeed[j] = {theta:1*Math.random()-0.5, phi:1*Math.random()-0.5};
			};
			this.charsMap = new Object();
			for(var i in chars) {
				var buffer = canvasArray[i].getContext("2d").getImageData(0, 0, 100, 100).data;
				this.charsMap[i] = new Array();
				var self = this;
				for(var j=0; j<this.particleNum; j++) {
					var redo = function() {
						var theta = Math.floor(Math.random()*100);
						var phi = Math.floor(Math.random()*100);
						if(buffer[(theta*400+(phi*4))] == 0) {
							self.charsMap[i].push(
								{
									theta:theta-50 + 360 * Math.round(Math.random()*2)-1,
									phi:phi-50 + 360 * Math.round(Math.random()*2)-1
								}
							);
						} else {
							redo();
						};
					};
					redo();	
				};
			};
			this.charsMap["@"] = new Array();
			for(var i=0; i<this.particleNum; i++) {
				this.charsMap["@"][i] = {theta:360*Math.random(), phi:360*Math.random()};
			};
			this.charsMap["_"] = new Array();
			for(var i=0; i<this.particleNum; i++) {
				this.charsMap["_"][i] = {theta:0, phi:0};
			};
			
			this.veticies = new Array();
			for(var i=0; i<this.particleNum; i++) {
				this.veticies[i] = new vertex3d({});
			};
		};
		sphere.prototype = {
			update : function() {
				for(var i=0; i<this.charsMap[this.type].length; i++) {
					if(this.degree[i].theta >= 30 && this.degree[i].phi >= 30) {
						this.flag = true;
						break;
					} else {
						this.flag = false;
					};	
				};
				this.radius =  this.radius + (this.targetRadius - this.radius) / 8;
				this.center.x = this.center.x + (this.targetCenter.x - this.center.x) / 8;
				this.center.y = this.center.y + (this.targetCenter.y - this.center.y) / 8;
				this.center.z = this.center.z + (this.targetCenter.z - this.center.z) / 8;
				for(var i=0; i<this.charsMap[this.type].length; i++) {
					if(this.type === "@") {
						this.charsMap[this.type][i].theta += this.freeDegreeSpeed[i].theta;
						this.charsMap[this.type][i].phi += this.freeDegreeSpeed[i].phi;
					};
					this.degree[i].theta =this.degree[i].theta + (this.charsMap[this.type][i].theta-this.degree[i].theta)/(4+20*Math.random());
					this.degree[i].phi = this.degree[i].phi + (this.charsMap[this.type][i].phi-this.degree[i].phi)/(4+20*Math.random());
					if(vibrateFlag == true) {
						var getPosition = polarToRectangle(this.degree[i].theta+90, this.degree[i].phi, this.radius+Math.random()*10);
					} else {
						var getPosition = polarToRectangle(this.degree[i].theta+90, this.degree[i].phi, this.radius);
					};
					this.veticies[i].affineIn.vertex = {
						x:getPosition.x,
						y:getPosition.y,
						z:getPosition.z
					};
					this.center.x
					this.veticies[i].affineIn.position = {
						x:this.center.x,
						y:this.center.y,
						z:this.center.z
					};
					this.veticies[i].vertexUpdate();
				};
			},
			draw : function() {
				if(this.flag == true) {
					ctx.beginPath();
					for(var i=0; i<this.veticies.length; i++) {
						for(var j=i*5; j<this.veticies.length; j++) {
							
							var distance = 
							(this.veticies[i].affineOut.x-this.veticies[j].affineOut.x)*(this.veticies[i].affineOut.x-this.veticies[j].affineOut.x) +
							(this.veticies[i].affineOut.y-this.veticies[j].affineOut.y)*(this.veticies[i].affineOut.y-this.veticies[j].affineOut.y);
							
							if(distance <= this.radius*Closenness) {
								ctx.moveTo(
									this.veticies[i].affineOut.x,
									this.veticies[i].affineOut.y
								);
								ctx.lineTo(
									this.veticies[j].affineOut.x,
									this.veticies[j].affineOut.y
								);
							};
						};
					};
					ctx.closePath();
					ctx.stroke();
				};
			}
		};
		/* class */
		var sphereNum = 20;//变换球体的上限数
		var s = new Array();
		/*-----------------------------------------------------*/
		var setup = function() {
			for(var i=0; i<sphereNum; i++) {
				s[i] = new sphere({radius:wTextSet[0].sphereRadius, particleNum:ParticleNum, center:{x:70*i - (sphereNum-1)*70/2,y:0,z:0}});
			};
		};
		/*-----------------------------------------------------*/
		var update = function() {
			for(var i=0; i<sphereNum; i++) {
				s[i].update();
			};
		};
		/*-----------------------------------------------------*/
		var draw = function() {
			for(var i=0; i<sphereNum; i++) {
				s[i].draw();
			};
		};
		
		var oneCanvas = document.createElement("canvas");
			oneCanvas.width=100;
			oneCanvas.height=100;
		var chars = new Object();
		for(j in wTextSet){
			for(i in wTextSet[j].text){
				//简单地检测当前浏览器是否支持Canvas对象，以免在一些不支持html5的浏览器中提示语法错误
				if(oneCanvas.getContext){  
					//获取对应的CanvasRenderingContext2D对象(画笔)
					var context = oneCanvas.getContext('2d'),
					text = wTextSet[j].text[i],
					textMetrics,
					FONT_HEIGHT = 50;
					 function drawText() {
					   context.fillStyle = '#FFFFFF';
					   context.fillRect(0,0,100,100);
					   context.fillStyle = '#000000';
					   //context.strokeStyle = 'cornflowerblue';
					   context.fillText(text, oneCanvas.width/2,
											  oneCanvas.height/2);
					   context.strokeText(text, oneCanvas.width/2,
												oneCanvas.height/2);
					 };
					 context.font = '50px Helvetica';
					 context.textBaseline = 'middle';//设置文本的垂直对齐方式
					 context.textAlign = 'center'; //设置文本的水平对对齐方式
					 textMetrics = context.measureText(text);
					 drawText();
					chars[wTextSet[j].text[i]] = oneCanvas.toDataURL("image/png");
					context.clearRect(0,0,oneCanvas.width,oneCanvas.height);
		}}}
		
		
		var charsLength = 0;
		var charCounter = 0;
		var bufferImages = {};
		var bufferCanvases = {};
		for(var i in chars) {
			charsLength++;
			bufferImages[i] = new Image();
			bufferImages[i].src = chars[i];
			bufferImages[i].onload = function() {
				charCounter++;
				if(charCounter === charsLength) {
					bufferDraw();
				};
			};
		};
		var canvasArray = new Array();
		var bufferDraw = function() {
			for(var i in chars) {
				var canvas = document.createElement("canvas");
				canvasArray[i] = canvas;
				//document.getElementById("buffer").appendChild(canvas);
				//document.getElementById(i) = canvas;
				canvas.getContext("2d").drawImage(
					bufferImages[i],
					0,
					0,
					100,
					100
				);
			};
			start();
		};


		var textChanger = function(text, sphereRadius, sphereSpace, unitTime) {
			var changeIncrement = 0;
			var charNum = text.length;
			var center = new Array();
			for(var i=0; i<charNum; i++) {
				center[i] = {x:sphereSpace*i - sphereSpace*(charNum-1)/2, y:0, z:0};
			};
			var changer = function() {
				setTimeout(function() {
					s[changeIncrement].type = text[changeIncrement];
					s[changeIncrement].targetCenter = center[changeIncrement]; 
					s[changeIncrement].targetRadius = sphereRadius; 
					changeIncrement++;
					if(changeIncrement < charNum) {
						changer();
					};
				}, unitTime);
			};
			for(var i=charNum; i<s.length; i++) {
				s[i].type = "_";
			};
			changer();
		};
		
		var fullSet = function() {//设定字符排列
			var alpha = "";
			for(j in wTextSet){
				alpha = alpha + wTextSet[j].text;}
			
			var col = 10;
			var colUnit = 80;
			var rowUnit = 120;
			for(var i=0; i<alpha.length; i++) {
				s[i].targetCenter = {
					x:(i%10)*colUnit - (col-1)*colUnit/2,
					y:Math.floor(i/10)*-rowUnit + 180,
					z:0
				};
				s[i].type = alpha[i];
			};
		};
		var textSet = wTextSet/*[//sphereRadius字体大小，sphereSpace字体间隔
			{text:"COPLANMIC@BREAK", sphereRadius:140, sphereSpace:80, unitTime:100, time:1000},
		]*/;
		
		var textSetChangerIncrement = 0;
		var textSetChanger = function() {
			setTimeout(function() {	
				textChanger(
					textSet[textSetChangerIncrement].text,
					textSet[textSetChangerIncrement].sphereRadius,
					textSet[textSetChangerIncrement].sphereSpace,
					textSet[textSetChangerIncrement].unitTime
				);
				textSetChangerIncrement++;
				
				if(textSetChangerIncrement == textSet.length) {
					textSetChangerIncrement = 0;
				}
				if(textSet.length>0){
				textSetChanger();}
			}, textSet[textSetChangerIncrement].time);
		};
		var vibrateCV = new closeValue(200, 500);
		var invertCV = new closeValue(1000, 1200);
		
		var start = function() {
			setup();
			setInterval(function() {
				if(vibrateCV.execution() > 0.8) {//开启抖动
					vibrateFlag = true;
				} else {
					vibrateFlag = false;
				};
				/*if(invertCV.execution() > 0.7) {
					strokeColor = "rgba(0,0,0,0.1)";
					backgroundColor = "rgba(255,255,255,1)";
				} else {
					strokeColor = "rgba(255,255,255,0.1)";
					backgroundColor = "rgba(0,0,0,1)";
				};*/
				ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
				ctx.fillStyle = backgroundColor;
				ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
				ctx.strokeStyle = strokeColor;
				update();
				draw();
			}, 1000/60);
			textSetChanger();
		};
		/*document.body.onmousemove = function(e) {
		Camera[cam].rotate.x = e.pageY/window.innerHeight * 180 - 90;
		Camera[cam].rotate.y = e.pageX/window.innerWidth * 180 - 90;
		document.onmousedown = function() {Camera[cam].zoom = Math.random()*1+1};
		document.onmouseup = function() {Camera[cam].zoom = 1};
		};*/
};

window.onresize = function() {
	for(i in CanvasArray){
		CanvasArray[i].width=window.innerWidth;
		CanvasArray[i].height=window.innerHeight;
	}
	for(i in Camera){		
			Camera[i].display.x = Camera[i].wX*window.innerWidth/fx;
			Camera[i].display.y = Camera[i].wY*window.innerHeight/fy;
	}
}
setInterval(function() {
	CanvasArray[0].getContext("2d").clearRect(0, 0, window.innerWidth, window.innerHeight);
	for(var i = 1 ;i < CanvasArray.length;i++){
		var w,h;
		if(CanvasArray[i].width!=null){w=CanvasArray[i].width;}else{w=0;}
		if(CanvasArray[i].height!=null){h=CanvasArray[i].height;}else{h=0;}
		CanvasArray[0].getContext("2d").drawImage(
					CanvasArray[i],
					0,
					0
				);
}}, 1000/60);
function removeTextLine(i){//删除画布，不指明第几个（按创建顺序,拒绝删除底画布），就全删除
	if(i != null){if(i!=0){CanvasArray[i]=null;CanvasArray.splice(i,1);}}else{var j = CanvasArray[0];for(k in CanvasArray){if(k>0){CanvasArray[k]=null;}}CanvasArray=new Array();CanvasArray[0]=j;}
}