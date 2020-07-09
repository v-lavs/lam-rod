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

    $('.btn-burger').click(function (e) {
        e.preventDefault();
        nav.addClass('open');
        jQuery('.backdrop').fadeIn();
    });

    $('.btn-close, .backdrop, .menu__link').click(function (e) {
        e.preventDefault();
        nav.removeClass('open');
        jQuery('.backdrop').fadeOut();
    });

    /***
     * SMOOTH SCROLL TO ANCHOR
     **/

    function smoothScrollToAnchor(selector) {
        $(selector).on('click', function (event) {
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
        arrows: false,
        afterLoad: function (instance, current) {
            if (instance.group.length > 1 && current.$content) {
                current.$content.append('<button class="fancybox-button fancybox-button--arrow_right next" data-fancybox-next><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.11 82"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="1 81 21 41.27 1.58 1"/></g></g></svg></button><button data-fancybox-prev class="fancybox-button fancybox-button--arrow_left prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22.11 82"><defs><style>.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-miterlimit:10;stroke-width:2px;}</style></defs><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1"><polyline class="cls-1" points="1 81 21 41.27 1.58 1"/></g></g></svg></button>');
            }
        }
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

        $galleryStrip.css({transform: 'translate3d(0,' + offsetY + 'px , 0)'});
    });


    // SIMPLE LIGHTBOX FUNCTION

    function LightBox(id, params = {}) {
        // params
        var animationTime = params.duration || 450;
        var infoSelector = params.infoSelector;

        // nodes
        var $slides = $('[data-lightbox="' + id + '"]');
        var $lightbox = $('#' + id);
        var $content = $lightbox.find('.ls-content');
        var $contentSlide = $content.find('.ls-content-slide');
        var $details = $lightbox.find('.ls-details');
        var $prevBtn = $lightbox.find('.ls-prev');
        var $nextBtn = $lightbox.find('.ls-next');
        var contentToClone = $(infoSelector);
        var currentIndex = 0;
        var withInfo = false;

        //methods
        function goNext(e) {
            e.preventDefault();
            currentIndex = currentIndex < $slides.length ? currentIndex + 1 : 0;
            goToSlide();
        }

        function goPrev(e) {
            e.preventDefault();
            currentIndex = currentIndex > 0 ? currentIndex - 1 : $slides.length;
            goToSlide();
        }

        function goToSlide() {
            var slide = $slides.get(currentIndex);
            insertSlideContent(slide);
        }

        function insertSlideContent(node) {
            var url = $(node).attr('href');
            var isIframe = $(node).attr('data-embedded');

            if(withInfo) {
                $details.html($(node).find(infoSelector).html());
            }

            if (!isIframe && url) {
                $contentSlide.html('<img class="img-responsive" src="' + url + '"/>');
            } else if (isIframe && url) {
                $contentSlide.html('<iframe class="ls-iframe" width="560" height="315" src="'+ url +'" frameborder="0" allow="accelerometer autoplay encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            }
        }

        function closeLightbox (e) {
            e.preventDefault();
            $lightbox.fadeOut(animationTime);

            setTimeout(function () {
                $contentSlide.html('');
                $details.html('');
            }, animationTime);
        }

        function showLightbox (e) {
            e.preventDefault();
            $lightbox.fadeIn(animationTime);

            currentIndex = $(this).index();

            insertSlideContent(this);
        }

        function showDescription () {
            if(contentToClone.length > 0) {
                withInfo = true;
                $lightbox.addClass('withInfo');
            } else {
                $lightbox.removeClass('withInfo');
            }
        }

        function onMount() {
            $lightbox.append('<div class="ls-backdrop"></div>');
            $lightbox.append('<div class="ls-close-btn"></div>');
            showDescription();

            var $backdrop = $lightbox.find('.ls-backdrop');
            var $closeBtn = $lightbox.find('.ls-close-btn');

            $prevBtn.on('click', goPrev);
            $nextBtn.on('click', goNext);
            $backdrop.on('click', closeLightbox);
            $closeBtn.on('click', closeLightbox);
            $slides.on('click', showLightbox);
        }

        onMount();
    };

    LightBox('gallery');

    LightBox('gallery-projects-progress', {
        infoSelector: '.project-info'
    });

    LightBox('projects-gallery', {
        infoSelector: '.project-info'
    });

});
