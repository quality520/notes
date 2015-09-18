$(function() {
	$(".section .tab li:last").css("border","none");
	/*$(".section .tab li").hover(function() {
		$(this).addClass('current').siblings().removeClass();
		$(".section .tab li:first").css("backgroundColor","#02B2F3").children().css("color","#fff");
	}, function() {
		$(this).removeClass();
	});
	$(".section .tab li").click(function(event) {
		$(this).addClass('current').siblings().removeClass();
		$(".section .tab li:first").removeClass('current');
	});
*/

	$("#aqbz .banner-txt .li-first").hover(function() {
		$(this).css("opacity","0.8");
	}, function() {
		$(this).css("opacity","1");
	});
	$("#aqbz .banner-txt li:last").hover(function() {
		$(this).css({"backgroundColor":"#fff","border":"none"}).children().css("color","#02B2F3");
	}, function() {
		$(this).css({"background":"none","border":"1px solid #fff"}).children().css("color","#fff");
	});

	$(".person-list li").hover(function() {
		$(this).css("backgroundColor","#fbfbfb");
	}, function() {
		$(this).css("background","none");
	});

	$("#aqbz  .section .guarantee").hover(function() {
		$(this).children($(".guarantee-explain")).children().css("color","#fff");
	}, function() {
		$("#aqbz  .section .guarantee h4").css("color","#000");
		$("#aqbz  .section .guarantee em").css("color","#737373");
	});
	$("#aqbz  .section .guarantee:first").hover(function() {
		$(this).css("backgroundColor","#456FD9");
	}, function() {
		$(this).css("backgroundColor","#F5F5F5");
	});
	$("#aqbz  .section .guarantee:eq(1)").hover(function() {
		$(this).css("backgroundColor","#EFB349");
	}, function() {
		$(this).css("backgroundColor","#F5F5F5");
	});
	$("#aqbz  .section .guarantee:eq(2)").hover(function() {
		$(this).css("backgroundColor","#45D9A3");
	}, function() {
		$(this).css("backgroundColor","#F5F5F5");
	});
	$("#aqbz  .section .guarantee:eq(3)").hover(function() {
		$(this).css("backgroundColor","#1FA7ED");
	}, function() {
		$(this).css("backgroundColor","#F5F5F5");
	});
	$("#aqbz  .section .guarantee:last").hover(function() {
		$(this).css("backgroundColor","#904AFB");
	}, function() {
		$(this).css("backgroundColor","#F5F5F5");
	});



	/*鼠标点击显示*/
	var onOff=true;
	$("#aqbz .section .show-details").click(function(event) {
		if(onOff){
			$(this).siblings('.p2').slideDown();
			onOff=false;
		}else{
			$(this).siblings('.p2').slideUp();
			onOff=true;
		}
	});

	$("#aqbz .section .shenhe").hover(function() {
		$(this).css("border","1px solid #35B57A").siblings().css("border","1px solid #E5E5E5").children('em').css("fontSize","18px");
		$(this).children('em').css("fontSize","20px");
	});
});