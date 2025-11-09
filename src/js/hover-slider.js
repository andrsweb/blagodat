document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hover-bottom .swiper-slide');
    
    if (window.innerWidth >= 992) {
        slides.forEach((slide) => {
            slide.addEventListener('mouseenter', () => {
                slides.forEach(s => s.classList.remove('active'));
                slide.classList.add('active');
            });
        });
    }
});
