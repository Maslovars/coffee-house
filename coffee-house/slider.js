///////Slider

const leftButton = document.querySelector('.slider__left-btn');
const rightButton = document.querySelector('.slider__right-btn');
const sliderLine = document.querySelector('.slider__line');
const slider = document.querySelector('.slider');
const sliderWrapper = document.querySelector('.slider__wrapper');
const controls = document.querySelectorAll('.slider__progress');
const activeControls = document.getElementsByClassName('slider__progress_active');
const screenSize = window.matchMedia('(max-width: 700px)');
const screenSize768 = window.matchMedia('(max-width: 768px)');

let position = 0;
let controlIndex = 0;
let interval = 5000;
let getNewSlide;
let start;
let change;
// let endSlide;
// let startSlide;

const startSlideshow = () => {
    getNewSlide = setInterval(() => nextSlide(), interval);
    // startSlide = new Date().getTime();
}

const pauseSlideshow = () => {
    clearInterval(getNewSlide);
}

const continueSlideshow = () => {
    const progressBar = document.querySelector('.slider__progress_active');
    let timeToNextSlide = interval - (progressBar.offsetWidth * 1000 / 8);
    console.log('timeToNextSlide', timeToNextSlide);
    // let timeToNextSlide = endSlide - startSlide;
    // console.log('timeToNextSlide', timeToNextSlide)
    getNewSlide = setInterval(() => nextSlide(), timeToNextSlide);
    for (control of activeControls) {
        control.style.animationPlayState = 'running';
    }
}

if (!screenSize768.matches) {
    sliderLine.addEventListener('mouseenter', () => {
        // endSlide = new Date().getTime();
        // console.log('123', endSlide)
        pauseSlideshow();
        for (control of activeControls) {
            control.style.animationPlayState = 'paused';
        }
    });

    sliderLine.addEventListener('mouseleave', continueSlideshow);
}

// slider.addEventListener('touchstart', () => {
//     pauseSlideshow();
//     for (control of activeControls) {
//         control.style.animationPlayState = 'paused';
//     }
// }, { passive: true });

// slider.addEventListener('touchend', continueSlideshow, { passive: true });
// slider.addEventListener('touchcancel', continueSlideshow, { passive: true });


const activeSlide = (ind) => {
    for (let control of controls) {
        control.classList.remove('slider__progress_active');
    }
    controls[ind].classList.add('slider__progress_active');
    pauseSlideshow();
    startSlideshow();
}

const nextSlide = () => {
    if (screenSize.matches) {
        if (position < 696) {
            position += 348;
            controlIndex++;
        } else {
            position = 0;
            controlIndex = 0;
        }
    } else {
        if (position < 960) {
            position += 480;
            controlIndex++;
        } else {
            position = 0;
            controlIndex = 0;
        }
    }

    sliderLine.style.left = -position + 'px';
    activeSlide(controlIndex);
}

const prevSlide = () => {
    if (screenSize.matches) {
        if (position > 0) {
            position -= 348;
            controlIndex--;
        } else {
            position = 696;
            controlIndex = 2;
        }
    } else {
        if (position > 0) {
            position -= 480;
            controlIndex--;
        } else {
            position = 960;
            controlIndex = 2;
        }
    }

    sliderLine.style.left = -position + 'px';
    activeSlide(controlIndex);
}

const setTouchDirection = () => {
    if (change > 10) {
        nextSlide();
    } else if (change < -10) {
        prevSlide();
    }
}

rightButton.addEventListener('click', nextSlide);
leftButton.addEventListener('click', prevSlide);

sliderLine.addEventListener('touchstart', (e) => {
    start = e.touches[0].clientX;
}, { passive: true });
sliderLine.addEventListener('touchmove', (e) => {
    let touch = e.touches[0];
    change = start - touch.clientX;
}, { passive: true });
sliderLine.addEventListener('touchend', setTouchDirection, { passive: true });

startSlideshow();
