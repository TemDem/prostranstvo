(() => {
    "use strict";
    $(document).ready((function() {
        $(".icon-menu").click((function() {
            $("html").toggleClass("menu-open");
        }));
        function initMenuSpoilers() {
            const isMobile = window.matchMedia("(max-width: 992px)").matches;
            const $menuItemsWithSub = $(".menu__item_sub");
            if (isMobile) $menuItemsWithSub.each((function() {
                const $this = $(this);
                const $subMenu = $this.find("> .menu__list");
                if (!$this.hasClass("_sub-menu-active")) $this.addClass("_sub-menu-active");
                if (!$this.hasClass("_sub-menu-opened")) $subMenu.hide();
                $this.off("click.menuSpoiler").on("click.menuSpoiler", (function(e) {
                    if ($(e.target).closest("a").length) e.preventDefault();
                    if ($this.hasClass("_sub-menu-opened")) {
                        $this.removeClass("_sub-menu-opened");
                        $subMenu.stop(true, true).slideUp(300);
                    } else {
                        $this.addClass("_sub-menu-opened");
                        $subMenu.stop(true, true).slideDown(300, (function() {
                            $(this).css("display", "flex");
                        }));
                    }
                }));
            })); else $menuItemsWithSub.each((function() {
                const $this = $(this);
                const $subMenu = $this.find("> .menu__list");
                $this.off("click.menuSpoiler");
                $this.removeClass("_sub-menu-opened _sub-menu-active");
                $subMenu.show().css("display", "");
            }));
        }
        initMenuSpoilers();
        $(".blog__slider").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            arrows: false,
            dots: true,
            infinite: false,
            adaptiveHeight: true,
            responsive: [ {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2
                }
            } ]
        });
        $(".spollers__button").on("click", (function() {
            const $item = $(this).closest(".spollers__item");
            const $body = $item.find(".spollers__body");
            if ($item.hasClass("active")) {
                $item.removeClass("active");
                $body.slideUp(300);
                return;
            }
            $item.addClass("active");
            $body.slideDown(300);
        }));
        $(".open-popup").magnificPopup({
            type: "inline",
            closeOnBgClick: true,
            closeBtnInside: false
        });
        $(document).on("click", ".popup__close", (function() {
            $.magnificPopup.close();
        }));
        const selects = document.querySelectorAll(".js-select");
        selects.forEach((select => {
            new Choices(select, {
                searchEnabled: false,
                itemSelectText: "",
                shouldSort: false
            });
        }));
        $(".input_tel").mask("+7 (000) 000-00-00");
        function showOnScroll() {
            $(".anim").each((function() {
                let $el = $(this);
                if ($el.hasClass("anim-show")) return;
                let elementTop = $el.offset().top;
                let windowBottom = $(window).scrollTop() + $(window).height() * .85;
                if (windowBottom > elementTop) {
                    let delay = $el.data("delay") || 0;
                    setTimeout((() => {
                        $el.addClass("anim-show");
                    }), delay);
                }
            }));
        }
        showOnScroll();
        $(window).on("scroll", showOnScroll);
    }));
})();