$(function(){
	$(".nav-skip").click(function(){
		$(this).toggleClass('toggled');
		$('.menu-nav').fadeToggle();
	})
	$(".menu-nav .cell").click(function(){
		$(this).siblings('.childContent').slideToggle();
	})
	$(".search_web").click(function(){
		$('.search_form').slideToggle();
	})
	$(".fixed-right .nav-item").hover(function(){
		$(this).find(".img01").attr("src",$(this).find(".img01").attr('src').replace('.png','s.png'));
	},function(){
		$(this).find(".img01").attr("src",$(this).find(".img01").attr('src').replace('s.png','.png'));

	})
	$(".fixed-right .nav-item:eq(4)").click(function(){
		window.scrollTo(0,0)
	})
	

	var $html=$('html');
        var $window=$(window);
        var $body=$("body");
		var psdsize=parseInt($body.attr('data-psd-width'));
		let fontsize = $(document).width()/psdsize*120 < 70?70:$(document).width()/psdsize*120;
        var htmlfont=fontsize+'px';
        $html.css('font-size',htmlfont);
        $window.resize(function () {
            htmlfont=$body.width()/psdsize*100+'px';
            $html.css('font-size',htmlfont)
        });

})
