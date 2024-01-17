const menuButtons = document.querySelectorAll('.menu__btn');
const menuPreview = document.querySelector('.menu__preview');
const loadMoreButton = document.querySelector('.menu__preview-btn');
const items = document.getElementsByClassName('menu__preview-item');
const modal = document.querySelector('.modal');

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
  menuPreview.innerHTML = '';
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
                `;
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

function showModal(name) {
  modal.innerHTML = '';
  let i = 1;
  fetch('./products.json').then((res) => res.json()).then((data) => {
    data.forEach((card) => {
      if (card.name === name) {
        let cardHTML = `
              <div class="modal__overlay">
              <div class="modal__container">
                <div class="modal__img">
                <img src="../assets/${category}/${category}-${i}.jpg" alt="${card.name}">
                </div>
                <div class="modal__block">
                  <div>
                    <h3 class="modal__title">${card.name}</h3>
                    <p class="modal__description">${card.description}</p>
                  </div>
                  <div>
                    <div class="modal__subtitle">Size</div>
                    <div class="modal__subblock">
                      <label class="modal__label">
                        <input type="radio" name="size" value="s" checked>
                        <span class="modal__btn">
                          <span class="modal-btn__icon">S</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="radio" name="size" value="m">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">M</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="radio" name="size" value="l">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">L</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <div class="modal__subtitle">Additives</div>
                    <div class="modal__subblock">
                      <label class="modal__label">
                        <input type="checkbox" value="1">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">1</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="checkbox" value="2">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">2</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="checkbox" value="3">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">3</span>
                          <span class="modal-btn__description"></span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="modal-total">
                    <h3 class="modal-total__title">Total:</h3>
                    <h3 class="modal-total__price"></h3>
                  </div>
                  <div class="modal-info">
                    <img src="../assets/info-empty.svg" alt="info icon">
                    <p class="modal-info__description">The cost is not final. Download our mobile app to see the final price and place your order. 
                    Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
                  </div>
                  <button class="modal__close-btn">Close</button>
                </div>            
              </div>
            </div>
                `;
        modal.innerHTML += cardHTML;
        i++;
      }
    })
  })
}

for (button of menuButtons) {
  button.addEventListener('click', setCategory);
}

loadMoreButton.addEventListener('click', loadMore);

renderMenu(category);
