///////Slider

const leftButton = document.querySelector('.slider__left-btn');
const rightButton = document.querySelector('.slider__right-btn');
const sliderLine = document.querySelector('.slider__line');
// const controls = document.querySelectorAll('.slider__control');
const controls = document.querySelectorAll('.slider__progress');
const screenSize = window.matchMedia('(max-width: 700px)');

let position = 0;
let controlIndex = 0;
let timeToNextSlide = 5000;

const resetTime = setInterval(() => nextSlide(), timeToNextSlide);

const activeSlide = (ind) => {
    for (let control of controls) {
        control.classList.remove('slider__progress_active');
    }
    controls[ind].classList.add('slider__progress_active');
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

rightButton.addEventListener('click', nextSlide);
leftButton.addEventListener('click', prevSlide);
resetTime();