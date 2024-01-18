console.log(`Score 90/90
1. Implementation of the burger menu on both pages: +22
2. Implementation of the carousel on the home page: +24
3. Categories of products on the menu page: +16
4. The Modal on the menu page: +20
5. Video on the home page: +8
`);
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