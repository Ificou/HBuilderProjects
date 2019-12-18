$(document).ready(function(){
	$(".sheet ul li").click(function(){
		$(this).addClass("selected");
		$(this).siblings().removeClass("selected");
	});
});
