$(function() {
	var T=null;
	$(window).scroll(function(event){
		T=$(document).scrollTop();
		if(T>=$("#xszy .banner-txt h2").offset().top){
			$(".section-pic").addClass('fadeInRight');
		}
		if (T>=parseInt($("#xszy .banner-txt p").offset().top)+200) {
			$(".section1 .col-md-7").addClass('fadeInLeft');
			$(".section1 .col-md-5").addClass('fadeInRight');
		}
		if (T>=parseInt($("#xszy .section-pic").offset().top)+180) {
			$(".section .client-box").addClass('fadeInUp');
		}
		if (T>=parseInt($("#xszy .sec h1").offset().top)+100) {
			$(".section .tab-content").addClass('fadeInUp');
		}
		if (T>=parseInt($("#xszy .section .tab-content").offset().top)+180) {
			$(".section .col-md-6 .img-mb").addClass('fadeInLeft');
		}
		if (T>=parseInt($("#xszy .section .tab-content").offset().top)+400) {
			$(".section .col-md-6 img").addClass('fadeInRight');
		}

		if(T>=$("#aqbz .person-list img").offset().top){
			$("#aqbz .section1 .col-md-7").addClass('fadeInLeft');
		}
	});
});