const menuButtons = document.querySelectorAll('.menu__btn');
const menuPreview = document.querySelector('.menu__preview');
const loadMoreButton = document.querySelector('.menu__preview-btn');
const items = document.getElementsByClassName('menu__preview-item');

let category = 'coffee';

function setCategory() {
    for (button of menuButtons) {
        button.classList.remove('menu__btn_active', 'disabled');
    }
    category = this.value;
    this.classList.add('menu__btn_active', 'disabled');
    renderMenu(category);
}

const loadMore = () => {
    loadMoreButton.classList.add('hidden');
    for (item of items) {
        item.classList.add('displayed');
    }
}

const renderMenu = (category) => {
    menuPreview.innerHTML = "";
    let i = 1;
    fetch('./products.json').then((res) => res.json()).then((data) => {
        data.forEach((item) => {
            if (item.category === category) {
                let itemHTML = `
                    <div class="menu__preview-item">
                    <div class="menu__preview-img">
                      <img src="../assets/${category}/${category}-${i}.jpg" alt="${item.name}">
                    </div>
                    <div class="menu__preview-block">
                      <div>
                        <h2 class="menu__preview-title">${item.name}</h2>
                        <p class="menu__preview-description">${item.description}</p>
                      </div>
                      <h3 class="menu__preview-price">$${item.price}</h3>
                    </div>
                  </div>
                    `
                menuPreview.innerHTML += itemHTML;
                i++;
                if (loadMoreButton.classList.contains('hidden')) {
                    loadMoreButton.classList.remove('hidden');
                }
                if (category === 'tea') {
                    loadMoreButton.classList.add('hidden');
                }
            }
        })
    })
}

for (button of menuButtons) {
    button.addEventListener('click', setCategory);
}
loadMoreButton.addEventListener('click', loadMore);

renderMenu(category);
