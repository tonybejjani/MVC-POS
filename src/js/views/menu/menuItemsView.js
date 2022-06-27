/** @format */
import infoIcon from 'url:../../../img/icon/info-icon.png';

class menuCatView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.menu');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerRender(handler) {
    const menuItemBtns = document.querySelectorAll('.menu--item__button');

    menuItemBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn));
    });
  }

  getMenuItems() {
    return document.querySelectorAll('.special-menu--item');
  }

  getMenuItem(item) {
    return item.querySelector('.order--item__qty-num');
  }

  getMenuItemText(item) {
    return item.querySelector('.order--item__qty-num').textContent;
  }

  _generateMarkup() {
    let markup = [];

    // for each category load corresponsding items markup
    for (const { id: categoryId, active } of Object.values(
      this.#data.menuCategories
    )) {
      markup.push(
        `<div class="menu--items ${
          active ? '' : 'hidden'
        }" data-category-id="${categoryId}">`
      );

      for (const [
        key,
        { catgId: productCatgId, name, price, qty, img, special_deal },
      ] of Object.entries(this.#data.menuItems)) {
        if (productCatgId === categoryId) {
          markup.push(`<div class="menu--item" data-item-id="${key}">
                          <div class="menu--item__image"><img src="${img}"></div>
                          <div class="menu--item__details">
                            <div class="menu--item__info"><img src="${infoIcon}"></div>
                            <h2 class="menu--item__title">${name}</h2>
                            <div class="menu--item__price">$ ${price}</div>
                            <button class="${
                              special_deal
                                ? 'menu--special--item__button'
                                : 'menu--item__button'
                            }" data-item-id="${key}">Select</button>
                          </div>
                      </div>`);
        }
      }
      markup.push('</div>');
    }

    return markup.join(' ');
  }
}

export default new menuCatView();
