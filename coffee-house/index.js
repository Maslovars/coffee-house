const body = document.body;
const menuButton = document.querySelector('.header__burger');
const menuContainer = document.querySelector('.header__nav-container');
const navLinks = document.querySelectorAll('.header__link');
const menuLinkButton = document.querySelector('.header__menu');
const desktopParent = menuLinkButton.parentElement;

const toggleMenu = () => {
    body.classList.toggle('locked');
    menuButton.classList.toggle('active');
    menuContainer.classList.toggle('active');

    if (menuContainer.classList.contains('active')) {
        menuContainer.appendChild(menuLinkButton);
    } else {
        desktopParent.appendChild(menuLinkButton);
    }
};

const removeMenu = () => {
    body.classList.remove('locked');
    menuButton.classList.remove('active');
    menuContainer.classList.remove('active');
    desktopParent.appendChild(menuLinkButton);
};

for (let link of navLinks) {
    link.addEventListener('click', removeMenu);
}

menuButton.addEventListener('click', toggleMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuContainer.classList.contains('active')) {
        removeMenu();
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        removeMenu();
    }
});
