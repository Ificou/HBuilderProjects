$(document).ready(function(){
	$(".sheet ul li").click(function(){
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});
	$(".sheet ul li").css("lineHeight",$(".sheet ul li").css("height"));
});
