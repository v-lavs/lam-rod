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

    $('.btn-close, .backdrop, .menu__link').click(function(e) {
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
                    scrollTop: $($.attr(this, 'href')).offset().top - 50
                }, 2000);
            }
        });
    }

    smoothScrollToAnchor('#requestDemo');
    smoothScrollToAnchor('.menu__link');


    /**
     * SIMPLE FANSYBOX FOR IMAGES
     */
    $('[data-fancybox="gallery"]').fancybox({
        arrows : false,
        afterLoad: function(instance, current) {
            if ( instance.group.length > 1 && current.$content ) {
                current.$content.append('<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.11 82"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="1 81 21 41.27 1.58 1"/></g></g></svg></button><button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.11 82"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="1 81 21 41.27 1.58 1"/></g></g></svg></button>');
            }
        }
    });


        // // var type = 'image';
        // // if ($item.hasClass('magnific-youtube')) {
        // //     type = 'iframe';
        // // }
        // $('.gallery-list').magnificPopup({
        //     delegate: 'a',
        //     type : 'image',
        //     gallery: {
        //         enabled: true,
        //         navigateByImgClick: true,
        //         preload: [0,1], // Will preload 0 - before current, and 1 after the current image
        //         arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.11 82"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="1 81 21 41.27 1.58 1"/></g></g></svg></button>', // markup of an arrow button
        //     },
        //     callbacks: {
        //
        //         buildControls: function() {
        //             // re-appends controls inside the main container
        //             this.contentContainer.append(this.arrowLeft.add(this.arrowRight));
        //         }
        //    },
        // });


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
