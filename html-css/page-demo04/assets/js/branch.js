$(document).ready(function () {
    $('.ac-list > li.expanded > a').on('click', function (e) {
        e.preventDefault();
        if ($(this).next('ul.sub-menu').is(':visible')) {
            $(this).removeClass('open');
            $(this).next('ul.sub-menu').slideUp();
        } else {
            $('.ac-list > li.expanded > a').removeClass('open')
                .next('ul.sub-menu').slideUp();
            $(this).addClass('open');
            $(this).next('ul.sub-menu').slideToggle();
        }
    });
});