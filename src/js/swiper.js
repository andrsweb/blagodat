import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    initSwiper('.slider', true);
    initSwiper('.slider-2', false);
});

const breakpointsWithNav = {
    320: { slidesPerView: 1, spaceBetween: 10 },
    480: { slidesPerView: 2, spaceBetween: 20 },
    992: { slidesPerView: 3, spaceBetween: 25 },
    1200: { slidesPerView: 4, spaceBetween: 30 },
};

const breakpointsWithoutNav = {
    320: { slidesPerView: 1 },
    992: { slidesPerView: 3 }
};

const commonSwiperOptions = {
    grabCursor: true,
    speed: 1000,
    loop: true,
    modules: [Navigation, Scrollbar],
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
    },
};

function initSwiper(selector, withNavigation = true) {
    const container = document.querySelector(selector);
    if (!container) return;

    const options = {
        ...commonSwiperOptions,
        scrollbar: {
            ...commonSwiperOptions.scrollbar,
            el: container.querySelector('.swiper-scrollbar'),
        },
        breakpoints: withNavigation ? breakpointsWithNav : breakpointsWithoutNav,
    };

    if (withNavigation) {
        options.navigation = {
            nextEl: container.querySelector('.swiper-next'),
            prevEl: container.querySelector('.swiper-prev'),
        };
    }

    const swiper = new Swiper(container, options);

    if (selector === '.slider-2') {
        swiper.on('slideChange', () => {
            const slides = container.querySelectorAll('.swiper-slide');
            slides.forEach((slide) => {
                slide.classList.remove('active');
            });
            const activeSlide = slides[swiper.realIndex];
            if (activeSlide) {
                activeSlide.classList.add('active');
            }
        });
    }

    return swiper;
}