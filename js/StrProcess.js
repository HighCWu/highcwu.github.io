jsp = {
					name:'',
					namespace:'',
					includes:[],
					excludes:[],
					matches:[],
					requires:[],
					enabled:!0,
					jscode:''
				};
function jsToUsable (str) {
        return str.replace(/("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g, function(word) {return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? "" : word;}).replace(/<\/?.+?>/g,"").replace(/[\r\n]/g, ""); 
    };
function getStringBetweenTags(a, c, b) {
        var d = a.indexOf(c);
        if ( - 1 == d) return "";
        if (!b) return a.substring(d + c.length);
        b = a.substring(d + c.length).indexOf(b);
        return - 1 == b ? "": a.substring(d + c.length, d + c.length + b);
    };
function deleteElement(NameAndNamespace) {
        var name = NameAndNamespace.split("&")[0],namespace = NameAndNamespace.split("&")[1];
        for(var i=0;i<jsCodeArray.length;i++){
            if(jsCodeArray[i].name == name){
                if(jsCodeArray[i].namespace == namespace){
                    jsCodeArray.splice(index, 1);
                    break;
                }
                else continue;
            }
            else continue;
        }
    };
function getElement(NameAndNamespace) {
		var b = -1;
        var name = NameAndNamespace.split("&")[0],namespace = NameAndNamespace.split("&")[1];
        for(var i=0;i<jsCodeArray.length;i++){
            if(jsCodeArray[i].name == name){
                if(jsCodeArray[i].namespace == namespace){
                    b = i;
                    break;
                }
                else continue;
            }
            else continue;
        }
		return b;
    };
function jsAnalysis(jsCode){
		jsp = {
					name:'',
					namespace:'',
					includes:[],
					excludes:[],
					matches:[],
					requires:[],
					enabled:!0,
					jscode:''
				};
        let jsHead = getStringBetweenTags(jsCode.replace(/(\r\n|\n|\r)/gm, "\n"), "==UserScript==", "==/UserScript=="),jsArr = jsHead.split('\n');
        jsp.jscode = jsCode ;
        for(var i=0;i<jsArr.length;i++){
            if(jsArr[i].indexOf('@name ') != -1){jsp.name=jsArr[i].substring(jsArr[i].indexOf("@name")+5).replace(/\s/gm, "");}
            if(jsArr[i].indexOf('@namespace') != -1){jsp.namespace=jsArr[i].substring(jsArr[i].indexOf("@namespace")+10).replace(/\s/gm, "");}
            if(jsArr[i].indexOf('@include') != -1){jsp.includes.push(jsArr[i].substring(jsArr[i].indexOf("@include")+8).replace(/\s/gm, ""));}
            if(jsArr[i].indexOf('@exclude') != -1){jsp.excludes.push(jsArr[i].substring(jsArr[i].indexOf("@exclude")+8).replace(/\s/gm, ""));}
            if(jsArr[i].indexOf('@match') != -1){jsp.includes.push(jsArr[i].substring(jsArr[i].indexOf("@match")+6).replace(/\s/gm, ""));}
            if(jsArr[i].indexOf('@require') != -1){jsp.requires.push(jsArr[i].substring(jsArr[i].indexOf("@require")+8).replace(/\s/gm, ""));}
        }
    };
function addJsToData(jsCode) {
        var a = 1,b = 0;
		jsAnalysis(jsCode);
        for(var i=0;i<jsCodeArray.length;i++){
            if(jsCodeArray[i].name == jsp.name){
                if(jsCodeArray[i].namespace == jsp.namespace){
					b = i;
                    a = 0;
					jsCodeArray[i] = {
					name:jsp.name,
					namespace:jsp.namespace,
					includes:jsp.includes,
					excludes:jsp.excludes,
					matches:jsp.matches,
					requires:jsp.requires,
					enabled:jsp.enabled,
					jscode:jsp.jscode
					};
                }
                else continue;
            }
            else continue;
        }
        if(a==1){jsCodeArray.push({
					name:jsp.name,
					namespace:jsp.namespace,
					includes:jsp.includes,
					excludes:jsp.excludes,
					matches:jsp.matches,
					requires:jsp.requires,
					enabled:jsp.enabled,
					jscode:jsp.jscode
		}
		);}
    };
