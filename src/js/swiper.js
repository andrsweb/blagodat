import Swiper from 'swiper';
import { Navigation, Scrollbar } from "swiper/modules";

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    initSwiper('.slider');
});

const commonSwiperOptions = {
    grabCursor: true,
    speed: 1000,
    loop: true,
    modules: [Navigation, Scrollbar],
};

function initSwiper(selector) {
    const container = document.querySelector(selector);
    if (!container) return;

    new Swiper(container, {
        ...commonSwiperOptions,
        modules: [...commonSwiperOptions.modules],
        navigation: {
            nextEl: container.querySelector('.swiper-next'),
            prevEl: container.querySelector('.swiper-prev'),
        },

        scrollbar: {
            el: container.querySelector('.swiper-scrollbar'),
            draggable: true,
        },

        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            480: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            992: {
                slidesPerView: 3,
                spaceBetween: 25,
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 30,
            }
        }
    });
}