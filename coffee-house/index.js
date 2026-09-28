const body = document.body;
const menuButton = document.querySelector('.header__burger');
const menuContainer = document.querySelector('.header__nav-container');
const navLinks = document.querySelectorAll('.header__link');
const menuLinkButton = document.querySelector('.header__menu');
const desktopParent = menuLinkButton.parentElement;

const removeMenu = (isResize = false) => {
    if (!menuContainer.classList.contains('active')) return;
    body.classList.remove('locked');
    menuButton.classList.remove('active');
    if (isResize) {
        menuContainer.classList.remove('active');
        menuContainer.classList.remove('closing');
        desktopParent.appendChild(menuLinkButton);
    } else {
        menuContainer.classList.add('closing');

        setTimeout(() => {
            menuContainer.classList.remove('active');
            menuContainer.classList.remove('closing');
            desktopParent.appendChild(menuLinkButton);
        }, 500);
    }
};

const toggleMenu = () => {
    if (menuContainer.classList.contains('active')) {
        removeMenu(false);
    } else {
        body.classList.add('locked');
        menuButton.classList.add('active');
        menuContainer.classList.add('active');
        menuContainer.appendChild(menuLinkButton);
    }
};

for (let link of navLinks) {
    link.addEventListener('click', () => removeMenu(false));
}

menuButton.addEventListener('click', toggleMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuContainer.classList.contains('active')) {
        removeMenu(false);
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        removeMenu(true);
    }
});
