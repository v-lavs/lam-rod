jQuery(document).ready(function ($) {

    /**
     * HEADER SCROLL
     */

    function onHeaderScrol() {
        scrolled = window.pageYOffset || document.documentElement.scrollTop;
        if (scrolled > 100) {
            $(".header").addClass('header_active');
        } else {
            $(".header").removeClass('header_active');
        }
    }

    $(document).on('scroll', function () {
        onHeaderScrol()
    });

    onHeaderScrol();

    var nav = $('.main-nav');

    /**
     * MOB MENU SCRIPT
     **/

    $('.btn-burger').click(function(e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn-close, .backdrop').click(function(e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    /***
     * SMOOTH SCROLL TO ANCHOR
     **/

    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function(event) {
            var anchor = $.attr(this, 'href');

            if (anchor.match(/^#/) && anchor !== '#') {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $($.attr(this, 'href')).offset().top - 150
                }, 2000);
            }
        });
    }

    smoothScrollToAnchor('#requestDemo');
    smoothScrollToAnchor('.header .menu__link');


    /**
     * SIMPLE FANSYBOX FOR IMAGES
     */
    $('.gallery__thumb').fancybox({

    });


    /**
     * GALLERY PARALLAX
     */
    var $contentWrap = $('.content-with-gallery');
    var $galleryWrap = $('.gallery').get(0);
    var $galleryStrip = $('.gallery-list');

    $(document).on('scroll', function () {
        var contentHeight = $contentWrap.height();
        var boundingGalleryWrap = $galleryWrap.getBoundingClientRect();
        var topGalleryOffset = boundingGalleryWrap.top;
        // var bottomGalleryOffset = topGalleryOffset + boundingGalleryWrap.height;
        var offsetY = topGalleryOffset < 0 ? topGalleryOffset : 0;

        $galleryStrip.css({transform: 'translate3d(0,'+ offsetY +'px , 0)'});
    });
});
