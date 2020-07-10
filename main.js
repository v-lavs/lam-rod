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
     * GALLERY PARALLAX
     */

    var $contentWrap = $('.content-with-gallery');
    var $galleryWrap = $('.gallery').get(0);
    var $galleryStrip = $('.gallery-list');

    function runScroll() {
        if ($(window).width() >  940) {
            var contentHeight = $contentWrap.height();
            var boundingGalleryWrap = $galleryWrap.getBoundingClientRect();
            var boundingGalleryTop = boundingGalleryWrap.top;
            var galleryStripHeight = $galleryStrip.height();
            var ratio = (Math.abs(boundingGalleryTop / contentHeight));
            var offsetY = 0;

            if (boundingGalleryTop < 0) {
                var newOffset = (galleryStripHeight - $(window).height()) * ratio;
                var thresholdOffset = galleryStripHeight - contentHeight;
                // offsetY = newOffset >= thresholdOffset ? thresholdOffset : newOffset;
                offsetY = newOffset
            }

            $galleryStrip.css({transform: 'translate3d(0,' + -offsetY + 'px , 0)'});
        }
        else {
            $galleryStrip.css({transform: 'translate3d(0,0,0)'});
        }
    }

    if ($contentWrap.length > 0) {
        $(document).on('scroll', runScroll);
    }

    runScroll();

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

            if (withInfo) {
                $details.html($(node).find(infoSelector).html());
            }

            if (!isIframe && url) {
                $contentSlide.html('<img class="img-responsive" src="' + url + '"/>');
            } else if (isIframe && url) {
                $contentSlide.html('<iframe class="ls-iframe" width="560" height="315" src="' + url + '" frameborder="0" allow="accelerometer autoplay encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>');
            }
        }

        function closeLightbox(e) {
            e.preventDefault();
            $lightbox.fadeOut(animationTime);

            setTimeout(function () {
                $contentSlide.html('');
                $details.html('');
            }, animationTime);
        }

        function showLightbox(e) {
            e.preventDefault();
            $lightbox.fadeIn(animationTime);

            currentIndex = $(this).index();

            insertSlideContent(this);
        }

        function showDescription() {
            if (contentToClone.length > 0) {
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


      var fadeInBlocks = $('.fade-in').waypoint(function (direction) {
        $(this.element).addClass('active')
    }, {
        offset: '75%'
    });
});
