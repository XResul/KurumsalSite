
jQuery('#totop').hide();
jQuery(window).scroll(function () {
    if (jQuery(this).scrollTop() >= 100) {
        jQuery('#totop').fadeIn(200);
        jQuery('#totop').addClass('top-visible');
    } else {
        jQuery('#totop').fadeOut(200);
        jQuery('#totop').removeClass('top-visible');
    }
});
jQuery('#totop').on('click', function () {
    jQuery('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});






//           function sliderHoverAction(e, t) { e.find(".slick-dots").hover(function () { e.slick("slickPause") }, function () { e.slick("slickPlay") }), $(document).on("mouseover", t + " .slick-dots li", function () { e.slick("goTo", $(this).index()) }) };
//var sdr = $(".layerslideref").slick({


//    swipe: true,
//    //autoplaySpeed:2000,// 4e3,
//    draggable: true,
//    dots: false,
//    slidesToShow: 3,
//    slidesToScroll: 1,
//    autoplay: true,
//    autoplaySpeed: 3000,
//    speed:200,
//    fade: false,
//    arrows: true,
//    //pauseOnHover: true,
//    //pauseOnDotsHover: true,
//    //customPaging: function (e, t) { return "<a>" + (t + 1) + "</a>" },
//    responsive: [
//          {
//              breakpoint: 2000,
//              settings: {
//                  slidesToShow: 5,
//                  slidesToScroll: 5,
//                  infinite: true,
//                  dots: true
//              }
//          },
//{
//    breakpoint: 1024,
//    settings: {
//        slidesToShow: 4,
//        slidesToScroll: 4,
//        infinite: true,
//        dots: true
//    }
//},
//{
//    breakpoint: 600,
//    settings: {
//        slidesToShow: 2,
//        slidesToScroll: 2,
//        infinite: true,
//        dots: true
//    }
//},
//{
//    breakpoint: 480,
//    settings: {
//        slidesToShow: 1,
//        slidesToScroll: 1,
//        infinite: true,
//        dots: true

//    }
//}
//    ]
//}

//  ).slickAnimation();
//sdr.resize();




var swiper = new Swiper('.swiper-container', {

    direction: 'horizontal',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    grabCursor: true,
    autoheight: true,
    watchSlidesProgress: true,
    mousewheelControl: true,
    keyboardControl: true,
    speed: 500,
    effect: 'fade',
    zoom: true,

    loop: true,

    centeredSlides: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        type: 'bullets',
        renderBullet: function (index, className) {

            var iurl = $(".swiper-wrapper .swiper-slide").eq(index + 1).find("img").attr("src");

            //return '<span class="' + className + '">' + (index + 1) + '</span>';

            //return '<span class="' + className + '">' + '<img src="' + iurl + '" />' + '</span>';

            return '<span class="' + className + '"></span>';
        },
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },



});

$('.swiper-pagination-bullet').hover(function () {
    $(this).trigger("click");
});



$(".swiper-slide img").css("width", "100%!important");

swiper.on('slideChange', function () {
    $(".stitle h1").removeClass("animate__animated animate__fadeInDown");
    var id = swiper.activeIndex;
    $(".stitle h1").eq(id).addClass("animate__animated animate__fadeInDown animate__delay-1s");

    $(".stitle p").removeClass("animate__animated animate__fadeInUp");
    var id = swiper.activeIndex;
    $(".stitle p").eq(id).addClass("animate__animated animate__fadeInUp animate__delay-1s");

    $(".stitle a").removeClass("animate__animated animate__fadeIn");
    var id = swiper.activeIndex;
    $(".stitle a").eq(id).addClass("animate__animated animate__fadeIn animate__delay-2s");
});



swiper.updateSize();
swiper.updateSlides();

