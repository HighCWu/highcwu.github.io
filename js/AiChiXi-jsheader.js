
var navdeal = function() {
    var $item = $('.nav-wrap .nav li a.nav-slide');
    var $item_username = $('.nav-wrap .nav li a.username');
    var $item_active = $('.nav-wrap .nav li a.active');
    var $nav_line = $('.nav-wrap .line');
    if (window.innerWidth < window.innerHeight) {
        fontsize = window.innerWidth / (12 + 12 * 1.2);
        $item.css('font-size', fontsize);
        $item.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px' + ' ' + 1.6 * fontsize + 'px');
        $item_username.css('font-size', 1.2 * fontsize);
        $item_username.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px');
    } else {
        fontsize = (window.innerWidth / (12 + 12 * 1.2)) / 4;
        $item.css('font-size', fontsize);
        $item.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px' + ' ' + 1.6 * fontsize + 'px');
        $item_username.css('font-size', 1.2 * fontsize);
        $item_username.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px');
    }
    var item_width = $item_active.outerWidth() - 2 * fontsize;
    var item_position_left = $item_active.position().left + fontsize;
    $nav_line.css({
        'width': item_width,
        'margin-left': item_position_left
    });
    $item_active.css('filter', 'alpha(opacity=100)');
    $item_active.css('-moz-opacity', '1');
    $item_active.css('-khtml-opacity', '1');
    $item_active.css('opacity', '1');
    $item_username.css('filter', 'alpha(opacity=100)');
    $item_username.css('-moz-opacity', '1');
    $item_username.css('-khtml-opacity', '1');
    $item_username.css('opacity', '1');
    $('.nav-wrap .nav li a.nav-slide').bind({
        click: function() {
            var item_width = $(this).outerWidth() - 2 * fontsize;
            var item_position_left = $(this).position().left + fontsize;
            $nav_line.stop().animate({
                'width': item_width,
                'margin-left': item_position_left
            },
            800);
            $('.nav-wrap .nav li a.nav-slide').css('filter', 'alpha(opacity=50)');
            $('.nav-wrap .nav li a.nav-slide').css('-moz-opacity', '0.5');
            $('.nav-wrap .nav li a.nav-slide').css('-khtml-opacity', '0.5');
            $('.nav-wrap .nav li a.nav-slide').css('opacity', '0.5');
            $('.nav-wrap .nav li a.nav-slide').removeClass('active');
            $(this).addClass('active');
            var self = this;
            setTimeout(function() {
                $(self).css('filter', 'alpha(opacity=100)');
                $(self).css('-moz-opacity', '1');
                $(self).css('-khtml-opacity', '1');
                $(self).css('opacity', '1');
            },
            0);
        },
    });
}
var topNavigation=function(){
	var nav = $('.navbar-fixed-up'); //得到导航对象
	var win = $(window); //得到窗口对象
	var sc = $(document); //得到document文档对象。
	var nhH = $(".navbar-head")[0].clientHeight;
	win.scroll(function() {
		if (sc.scrollTop() >= nhH) {
			nav.css('position', "fixed");
			nav.css('left', "0px");
			nav.css('right', "0px");
			$(".navbar-head").css('display', "none");
			$('.navbar-fade').css('display', "block");
		} else {
			nav.css('position', "relative");
			$(".navbar-head").css('display', "block");
			$('.navbar-fade').css('display', "none");
		}
	})
};
window.onresize = function() {
    var $item = $('.nav-wrap .nav li a.nav-slide');
    var $item_username = $('.nav-wrap .nav li a.username');
    var $item_active = $('.nav-wrap .nav li a.active');
    var $nav_line = $('.nav-wrap .line');
    if (window.innerWidth < window.innerHeight) {
        fontsize = window.innerWidth / (12 + 12 * 1.2);
        $item.css('font-size', fontsize);
        $item.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px' + ' ' + 1.6 * fontsize + 'px');
        $item_username.css('font-size', 1.2 * fontsize);
        $item_username.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px');
    } else {
        fontsize = (window.innerWidth / (12 + 12 * 1.2)) / 4;
        $item.css('font-size', fontsize);
        $item.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px' + ' ' + 1.6 * fontsize + 'px');
        $item_username.css('font-size', 1.2 * fontsize);
        $item_username.css('padding', 1.2 * fontsize + 'px' + ' ' + 1.2 * fontsize + 'px');
    }
    var item_width = $item_active.outerWidth() - 2 * fontsize;
    var item_position_left = $item_active.position().left + fontsize;
    $nav_line.css({
        'width': item_width,
        'margin-left': item_position_left
    });
};

document.writeln("    <div class=\'navbar-fixed-up nav-wrap\' style=\'z-index:1\'>");
document.writeln("        <ul class=\'nav navbar-head\' id=\'navbar-head\'>");
document.writeln("			<li><a class=\'username\'>你还没有登录哟</a></li>");
document.writeln("		</ul>");
document.writeln("		<ul class=\'nav\'>");
document.writeln("            <li><a class=\'nav-slide\'>直播</a></li>");
document.writeln("            <li><a class=\'nav-slide active\'>推荐</a></li>");
document.writeln("            <li><a class=\'nav-slide\'>追番</a></li>");
document.writeln("            <li><a class=\'nav-slide\'>分区</a></li>");
document.writeln("			<li><a class=\'nav-slide\'>关注</a></li>");
document.writeln("			<li><a class=\'nav-slide\'>发现</a></li>");
document.writeln("			");
document.writeln("		</ul>");
document.writeln("        <span class=\'line\' style=\'z-index:1\'></span>");
document.writeln("    </div>");
document.writeln("<div id=\'container\'>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br>666<br></br></div>");

var fontsize;
$(function() {
    navdeal();//实现滑块条
	topNavigation();
});
