/* Demonstration of embedding CodeMirror in a bigger application. The
 * interface defined here is a mess of prompts and confirms, and
 * should probably not be used in a real project.
 */

function MirrorFrame(place) {
  this.home = document.createElement("div");
  if (place.appendChild)
    place.appendChild(this.home);
  else
    place(this.home);

  var self = this;
  function makeButton(name, action) {
    var button = document.createElement("input");
    button.type = "button";
    button.value = name;
	button.className = "btn btn-default";
    self.home.appendChild(button);
    button.onclick = action;
  }

  makeButton("储存", saveCodeOfEditor);
  makeButton("搜索", search);
  makeButton("替换", replace);
  makeButton("当前行", line);
  makeButton("跳到", jump);
  makeButton("插入构造函数", macro);
  makeButton("自动缩进", reindent);

};

var saveCodeOfEditor = function() {addJsToData(editor.getValue()); $table.bootstrapTable('load',jsCodeArray);var btchecked = document.getElementsByName("btSelectItem");for (i in btchecked){btchecked[i].className="mui-switch mui-switch-anim";};},
  search = function() {
    CodeMirror.commands.findPersistent(editor);
  },

  replace = function() {
    CodeMirror.commands.replace = replace;
  },

  jump = function() {
    CodeMirror.commands.jumpToLine(editor);
  },

  line = function() {
    alert("The cursor is currently at line " + editor.currentLine());
    this.mirror.focus();
  },

  macro = function() {
    var name = prompt("Name your constructor:", "");
    if (name)
      editor.replaceSelection("function " + name + "() {\n  \n}\n\n" + name + ".prototype = {\n  \n};\n");
  },

  reindent = function() {
    this.mirror.reindent();
  };
