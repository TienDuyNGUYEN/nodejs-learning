$(document).ready(() => {
    $(".main-carousel").owlCarousel({
        items: 1,
        loop: true,
        lazyLoad: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        dots: false,
        nav: true,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"]
    });
    $(".about-carousel").owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        autoplay: true,
        autoplayTimeout: 4000,
        autoplayHoverPause: true,
        nav: true,
        navText: ["<i class='las la-angle-left'></i>", "<i class='las la-angle-right'></i>"]
    });
});
