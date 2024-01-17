const menuButtons = document.querySelectorAll('.menu__btn');
const menuPreview = document.querySelector('.menu__preview');
const loadMoreButton = document.querySelector('.menu__preview-btn');
const items = document.getElementsByClassName('menu__preview-item');
const modal = document.querySelector('.modal');
// const closeModalButton = document.querySelector('.modal__close-btn');
// const modalOverlay = document.querySelector('.modal__overlay');
const inputs = document.getElementsByTagName('input');

let category = 'coffee';
let totalPrice = 0;

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

const getTotalPrice = (item) => {
  const inputs = document.querySelectorAll('input');
  const ttlPrice = document.querySelector('.modal-total__price');
  // console.log('123', inputs)
  for (input of inputs) {
    console.log('item', item)
    if (input.checked && input.value === 's') {
      totalPrice = +item.price;
    }
    if (input.checked && input.value === 'm') {
      totalPrice = +item.price + +item.sizes.m["add-price"];
    }
    if (input.checked && input.value === 'l') {
      totalPrice = +item.price + +item.sizes.l["add-price"];
    }
    if (input.checked && input.value === '1') {
      totalPrice += +item.additives[0]["add-price"]
    }
    if (input.checked && input.value === '2') {
      totalPrice += +item.additives[1]["add-price"]
    }
    if (input.checked && input.value === '3') {
      totalPrice += +item.additives[2]["add-price"]
    }
  }
  // console.log('123', totalPrice)  
  ttlPrice.innerText = `$${totalPrice.toFixed(2)}`
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

        const items2 = document.querySelectorAll('.menu__preview-item')

        for (item of items2) {
          let name = item.querySelector('.menu__preview-title').textContent;
          let src = item.querySelector('img').src;
          item.addEventListener('click', () => {
            modal.classList.toggle('hidden');
            body.classList.toggle('locked');
            showModal(name, src);
          });
        }
      }
    })
  })
}

function showModal(name, src) {
  modal.innerHTML = '';
  fetch('./products.json').then((res) => res.json()).then((data) => {
    data.forEach((card) => {
      if (card.name === name) {
        let cardHTML = `
              <div class="modal__overlay">
              <div class="modal__container">
                <div class="modal__img">
                <img src="${src}" alt="${card.name}">
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
                          <span class="modal-btn__description">${card.sizes.s.size}</span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="radio" name="size" value="m">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">M</span>
                          <span class="modal-btn__description">${card.sizes.m.size}</span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="radio" name="size" value="l">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">L</span>
                          <span class="modal-btn__description">${card.sizes.l.size}</span>
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
                          <span class="modal-btn__description">${card.additives[0].name}</span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="checkbox" value="2">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">2</span>
                          <span class="modal-btn__description">${card.additives[1].name}</span>
                        </span>
                      </label>
                      <label class="modal__label">
                        <input type="checkbox" value="3">
                        <span class="modal__btn">
                          <span class="modal-btn__icon">3</span>
                          <span class="modal-btn__description">${card.additives[2].name}</span>
                        </span>
                      </label>
                    </div>
                  </div>
                  <div class="modal-total">
                    <h3 class="modal-total__title">Total:</h3>
                    <h3 class="modal-total__price">$${card.price}</h3>
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

        const closeModalButton = document.querySelector('.modal__close-btn');
        const modalOverlay = document.querySelector('.modal__overlay');
        const inputs = document.querySelectorAll('input');

        for (input of inputs) {
          input.addEventListener('click', () => {
            getTotalPrice(card);
          });
        }

        closeModalButton.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
          if (e.target === modalOverlay) {
            closeModal();
          }
        });
      }
    })
  })
}

const closeModal = () => {
  modal.classList.add('hidden');
  body.classList.remove('locked');
}

for (button of menuButtons) {
  button.addEventListener('click', setCategory);
}

// console.log('items', items);

loadMoreButton.addEventListener('click', loadMore);
// closeModalButton.addEventListener('click', closeModal);

renderMenu(category);