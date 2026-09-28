///////Slider

const leftButton = document.querySelector('.slider__left-btn');
const rightButton = document.querySelector('.slider__right-btn');
const sliderLine = document.querySelector('.slider__line');
const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider__wrapper');
const controls = document.querySelectorAll('.slider__progress');
const activeControls = document.getElementsByClassName(
    'slider__progress_active',
);
const screenSize = window.matchMedia('(max-width: 700px)');
const screenSize768 = window.matchMedia('(max-width: 768px)');

let position = 0;
let controlIndex = 0;
let interval = 5000;
let getNewSlide;
let start;
let change;

const getSlideWidth = () => {
    return sliderWrapper.getBoundingClientRect().width;
};

const updateSliderPosition = () => {
    const slideWidth = getSlideWidth();
    sliderLine.style.transform = `translateX(${-controlIndex * slideWidth}px)`;
};

const startSlideshow = () => {
    getNewSlide = setInterval(() => nextSlide(), interval);
};

const pauseSlideshow = () => {
    clearInterval(getNewSlide);
};

const continueSlideshow = () => {
    const progressBar = document.querySelector('.slider__progress_active');
    let timeToNextSlide = interval - (progressBar.offsetWidth * 1000) / 8;
    getNewSlide = setInterval(() => nextSlide(), timeToNextSlide);
    for (control of activeControls) {
        control.style.animationPlayState = 'running';
    }
};

if (!screenSize768.matches) {
    sliderLine.addEventListener('mouseenter', () => {
        pauseSlideshow();
        for (control of activeControls) {
            control.style.animationPlayState = 'paused';
        }
    });

    sliderLine.addEventListener('mouseleave', continueSlideshow);
}

const activeSlide = (ind) => {
    for (let control of controls) {
        control.classList.remove('slider__progress_active');
    }
    controls[ind].classList.add('slider__progress_active');
    pauseSlideshow();
    startSlideshow();
};

const nextSlide = () => {
    const totalSlides = controls.length;
    if (controlIndex < totalSlides - 1) {
        controlIndex++;
    } else {
        controlIndex = 0;
    }
    updateSliderPosition();
    activeSlide(controlIndex);
};

const prevSlide = () => {
    const totalSlides = controls.length;
    if (controlIndex > 0) {
        controlIndex--;
    } else {
        controlIndex = totalSlides - 1;
    }
    updateSliderPosition();
    activeSlide(controlIndex);
};

const setTouchDirection = () => {
    if (change > 25) {
        nextSlide();
    } else if (change < -25) {
        prevSlide();
    }
    start = 0;
    change = 0;
};

window.addEventListener('resize', () => {
    sliderLine.style.transition = 'none';
    updateSliderPosition();
    requestAnimationFrame(() => {
        sliderLine.style.transition = '0.5s ease';
    });
});

rightButton.addEventListener('click', nextSlide);
leftButton.addEventListener('click', prevSlide);

sliderLine.addEventListener(
    'touchstart',
    (e) => {
        if (e.cancelable) e.preventDefault();
        start = e.touches[0].clientX;
    },
    { passive: false },
);
sliderLine.addEventListener(
    'touchmove',
    (e) => {
        if (!start) return;
        let touch = e.touches[0];
        change = start - touch.clientX;
    },
    { passive: true },
);
sliderLine.addEventListener('touchend', setTouchDirection, { passive: true });

startSlideshow();
