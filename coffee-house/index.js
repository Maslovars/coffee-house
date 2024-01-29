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