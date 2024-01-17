alert("Hi, I've been sick all week and didn't have time to finish the project, if you have the opportunity, don't check my work until Tuesday evening. Thank you in advance!");
///////Burger Menu

const body = document.body;
const menuButton = document.querySelector('.header__burger');
const menuContainer = document.querySelector('.header__nav-container');
const navLinks = document.querySelectorAll('.header__link');

const toggleMenu = () => {
    body.classList.toggle('locked');
    menuButton.classList.toggle('active');
    menuContainer.classList.toggle('active');
}

const removeMenu = () => {
    body.classList.remove('locked');
    menuButton.classList.remove('active');
    menuContainer.classList.remove('active');
}

for (let link of navLinks) {
    link.addEventListener('click', removeMenu);
}

menuButton.addEventListener('click', toggleMenu);