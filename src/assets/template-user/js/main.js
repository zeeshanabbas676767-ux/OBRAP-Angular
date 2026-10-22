(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);

    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow');
            } else {
                $('.fixed-top').removeClass('shadow');
            }
        } else {
            if ($(this).scrollTop() > 55) {
                $('.fixed-top').addClass('shadow').css('top', -55);
            } else {
                $('.fixed-top').removeClass('shadow').css('top', 0);
            }
        } 
    });
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

// --- SAFE AUTO-INITIALIZE CAROUSELS ---
    function initCarousels() {
        const $vegCarousel = $(".vegetable-carousel");
        // Only run if the carousel exists AND has not been loaded yet
        if ($vegCarousel.length && !$vegCarousel.hasClass('owl-loaded')) {
            $vegCarousel.owlCarousel({
                autoplay: true,
                smartSpeed: 1500,
                center: false,  
                dots: true,
                loop: true,
                margin: 25,
                nav : true,
                navText : [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsiveClass: true,
                responsive: {
                    0:{ items:1 },
                    576:{ items:1 },
                    768:{ items:2 },
                    992:{ items:3 },
                    1200:{ items:4 }
                }
            });
        }

        const $testCarousel = $(".testimonial-carousel");
        if ($testCarousel.length && !$testCarousel.hasClass('owl-loaded')) {
            $testCarousel.owlCarousel({
                autoplay: true,
                smartSpeed: 2000,
                center: false,
                dots: true,
                loop: true,
                margin: 25,
                nav : true,
                navText : [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsiveClass: true,
                responsive: {
                    0:{ items:1 },
                    576:{ items:1 },
                    768:{ items:1 },
                    992:{ items:2 },
                    1200:{ items:2 }
                }
            });
        }
    }

    // Run on initial load
    $(document).ready(function () {
        initCarousels();
    });

    // Safe Observer with Disconnect / Once Protection
    const observer = new MutationObserver(function (mutations, obs) {
        if ($(".vegetable-carousel").length && !$(".vegetable-carousel").hasClass('owl-loaded')) {
            initCarousels();
            // Once successfully initialized, disconnect the observer to prevent infinite loops!
            obs.disconnect();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // --------------------------------------------------------

    // Modal Video 
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });

    // Product Quantity
    $('.quantity button').on('click', function () {
        var button = $(this);
        var oldValue = button.parent().parent().find('input').val();
        if (button.hasClass('btn-plus')) {
            var newVal = parseFloat(oldValue) + 1;
        } else {
            if (oldValue > 0) {
                var newVal = parseFloat(oldValue - 1);
            } else {
                var newVal = 0;
            }
        }
        button.parent().parent().find('input').val(newVal);
    });

})(jQuery);