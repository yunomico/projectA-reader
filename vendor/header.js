$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    var height = ($(window).height()) / 2;
    // Do something
    if(scroll > height){
    	$('header').addClass('withbackground');
    }else{
    	$('header').removeClass('withbackground');
    }
});