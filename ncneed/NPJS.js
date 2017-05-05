		$(document).ready(function () {
		  var trigger = $('.hamburger'),
		      overlay = $('.overlay'),
		     isClosed = false;

		    trigger.click(function () {
		      hamburger_cross();      
		    });

		    function hamburger_cross() {

		      if (isClosed == true) {          
		        overlay.hide();
		        trigger.removeClass('is-open');
		        trigger.addClass('is-closed');
		        isClosed = false;
		      } else {   
		        overlay.show();
		        trigger.removeClass('is-closed');
		        trigger.addClass('is-open');
		        isClosed = true;
		      }
		  }
		  
		  $('.hamburger').click(function () {
		        $('#wrapper').toggleClass('toggled');
		  });  
		});
/*****************/
var classArr = new Array();
var classImg = new Array();
var bookName = new Array();
var bookChoice = new Array();
var bookContent = new Array();
var bookNow;
$.ajax({
            url:"./student/index.aspx",
            type:"POST",
            async: false,
            success:function(ret)
            {
				var classNum = $($(ret).find("div.class_container")[0]).find("div ul a");
				for(i=0;i<classNum.length;i++){
					classArr.push(classNum[i].onclick.toString().split("'")[1]);
					classImg.push("<li><p style='width:7.5%;float:left;'></p>"+"<img style='width:85%;padding:5px;' src='"+$(classNum[i]).find('img')[0].src+"' onclick='javascript:Book("+i+");'>"+'<a href="javascript:Book("'+i+'"><i class="fa fa-fw fa-book"></i>'+$(classNum[i]).find('li')[1].innerText.substr(0,8)+'...</a></li>');
					$(".sidebar-nav").append(classImg[i])
				}
				forIng(0);
            }
        });
function forIng(i){
	$.ajax({
		url:"./student/"+classArr[i],
		type:"POST",
		async: false,
		success:function(ret)
		{
			ret=ret.replace(/..\/npels\/images\/tea\//g,"../images/tea/");
			ret=ret.replace(/..\/images\/tea\//g,"../npels/images/tea/");
			$("#Course").find('p').html($(ret).find('.class_sidebar_frame').next()[0].outerHTML);
			$('.tagText').css('display','');
			var span_dl=$('#Course').find('span ul');
			console.log(span_dl);
			for(var ii=0;ii<span_dl.length;ii++){
				if(ii%2!=0){
					$(span_dl[ii]).css("display","none");
				}
				console.log(ii);
			}
			var ACourse = $(ret).find('.position').next().next().find('ul li a')[0];
			var ATest = $(ret).find('.position').next().next().find('ul li a')[1];
			console.log(ATest);
			$.ajax({
				url:ATest.href,
				type:"POST",
				async: false,
				success:function(retz)
				{
					retz=retz.replace(/..\/npels\/images\/tea\//g,"../images/tea/");
					retz=retz.replace(/..\/images\/tea\//g,"../npels/images/tea/");
					$('#Test').find('p').html($(retz).find('.class_sidebar_frame').prev()[0].outerHTML);
					$('#Test').find('table.DataGridTable').css('table-layout','fixed');
					$('#Test').find('table.DataGridTable tbody tr').find('td:eq(0)').css('width','60%');
					$('#Test').find('table.DataGridTable tbody tr').find('td:eq(1)').hide();
					$('#Test').find('table.DataGridTable tbody tr').find('td:eq(2)').hide();
					$('#Test').find('table.DataGridTable tbody tr').find('td:eq(3)').css('width','20%');
					$('#Test').find('table.DataGridTable tbody tr').find('td:eq(4)').css('width','20%');
					$('#Test').find('table.DataGridTable tbody tr').find('[value=" 继续测试 "]').attr('value',' 继 续 ');
					$('#Test').find('.pagination ul li').css('float','left');
					$('#Test').find('.pagination').css('float','left');
					$('#Test').find('.pagination').css('overflow','auto');
					$('#Test').find('.pagination').css('width','98%');
					$('#Test').find('.pagination ul').css('width','200%');
					$('#Test').find('.pagination').removeClass('pagination');
					bookContent.push($("#container").html());
					if(i == classArr.length-1){
						Book(0);
					}
					else
					{
						forIng(i+1);
					}
				}
			});

		}
	});
}
function Book(i){
	if(i==0){
		$('.nav-tabs a:first').tab('show');
	}
	bookNow = i;
	$("#container").html(bookContent[i]);
	var ElementButton = $('div#Course span ul');
for(i=0;i<ElementButton.length;i++){
	ShowButton(ElementButton[i]);
	/*******样式调整********/		
	$('.container').css('background','#f4f3ef');
	$('.class_3').css('width','100%');
	$('.class_3_2').css('width','100%');
	$('.class_3_2_bg').css('width','100%');
	$('.class_3_2_1').css('width','25%');
	$('.class_3_2_3').css('width','60%')
					 .css('float','right');
	$('.class_3_2_4').css('width','20%');
	$('.class_main_tab').css('width','80%');
	$('.tagText').css('float','left');
	$('.tagButton').css('float','right');	


	$('.class_main_tab').css('width','100%');
	$('.class_6_1').css('width','95%');
	$('.class_6_2').css('width','100%');
	$('.shift').css('width','95%');

	/***********End**********/	
}
}
		
/*******原函数加载处********/
var ElementButton = $('div#Course span ul');
for(i=0;i<ElementButton.length;i++){
	ShowButton(ElementButton[i]);
}
function ShowButton(obj)
{
    var text = $(obj).find('li .tagText');
    var button = $(obj).find('li .tagButton');
    
    if (text.size() > 0 && text.text() != '' && button.size() > 0)
    {
        text.each(function(){
            $(this).css('display','');
        });
        button.each(function(){
            $(this).css('display','');
        });
    }
}
function ShowText(obj)
{
    var text = $(obj).find('li .tagText');
    var button = $(obj).find('li .tagButton');
    
    if (text.size() > 0 && text.text() != '' && button.size() > 0)
    {
        text.each(function(){
            $(this).css('display','');
        });
        button.each(function(){
            $(this).css('display','');
        });
    }
}

function showBindAuth() {
    TINY.box.show({iframe:'student/MaterialAuth.aspx?material=College_English_NEW_Century_Video_ThirdEdition_3',maskid:'bluemask',maskopacity:40,width:600,height:260,closejs:function(){CheckAuthorize()}});
}

function chooseBindAuth()
{
    var ret = confirm("课件未授权,是否现在授权？");
    if (ret)
        showBindAuth();
}
/***********End**********/