/** @format */
'use strict';

class App {
  #currentOrderLog = {};

  constructor() {
    this._render(
      this._generateMenuCategMarkup(),
      '.menu--navbar',
      'afterbegin'
    );
    this._render(this._generateMenuItemsMarkup(), '.menu', 'beforeend');

    const menuItemBtns = document.querySelectorAll('.menu--item__button');
    const menuSpecialBtn = document.querySelector(
      '.menu--special--item__button'
    );
    const menuCategLinks = document.querySelectorAll('.menu--navbar__link');

    menuCategLinks.forEach((categlink) =>
      categlink.addEventListener(
        'click',
        this._showMenuCategItems.bind(this, categlink, menuCategLinks)
      )
    );

    menuSpecialBtn.addEventListener('click', this._showSpecialModal.bind(this));
    menuItemBtns.forEach((btn) =>
      btn.addEventListener('click', this._showItemOrderForm.bind(this, btn))
    );
  }

  _render(markup, className, position) {
    const container = document.querySelector(className);
    container.insertAdjacentHTML(position, markup);
  }

  _showMenuCategItems(categLink, categLinks) {
    const menuCategItems = document.querySelectorAll('.menu--items');

    if (categLink.closest('li').classList.contains('menu--navbar__active'))
      return;

    categLinks.forEach((link) => {
      link.closest('li').classList.remove('menu--navbar__active');

      if (link.dataset.categoryId === categLink.dataset.categoryId) {
        link.closest('li').classList.add('menu--navbar__active');
      }
    });

    menuCategItems.forEach((categItems) => {
      categItems.classList.add('hidden');

      if (categLink.dataset.categoryId === categItems.dataset.categoryId) {
        categItems.classList.remove('hidden');
      }
    });
  }

  _showItemOrderForm(btn) {
    // get data from menuItems object according to item selected on
    // "data-item-id" attribute of element

    const { name, price, qty, img } =
      menuItems[btn.getAttribute('data-item-id')];

    const priceD = price.toFixed(2); //convert price to decimal
    const itemId = btn.getAttribute('data-item-id');
    const currItemLog = this.#currentOrderLog[itemId];
    const itemQty = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"] .itemQty`
    );
    const specialItem = false;

    // On selecting an item, check if itemId already exists in current Order List
    // 1- if YES: update Qty & total price
    if (currItemLog) {
      //update qty and total price in #currentOrderLog Object
      currItemLog.qty++;
      currItemLog.totalPrice = currItemLog.price * currItemLog.qty;

      //update UI: item qty & total price
      itemQty.textContent = currItemLog.qty;
      itemQty.parentElement.nextElementSibling.querySelector(
        '.totalPrice'
      ).textContent = currItemLog.totalPrice.toFixed(2);

      // 2- if NO: add new item to #currentOrderLog object
    } else {
      this.#currentOrderLog[itemId] = {
        itemId,
        name,
        price,
        qty,
        img,
        specialItem,
      };

      this._render(
        this._generateItemOrderMarkup({ itemId, name, priceD, qty, img }),
        '.order__details',
        'afterbegin'
      );

      const deleteBtn = document.querySelector('.order--item__remove');
      deleteBtn.addEventListener(
        'click',
        this._removeItemOrder.bind(this, itemId)
      );
    }
  }

  _removeItemOrder(itemId) {
    //delete item from CurrentOrderLog Object
    delete this.#currentOrderLog[itemId];
    const deleteItem = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"]`
    );
    //delete item from UI
    deleteItem.parentElement.remove();
  }

  _showSpecialModal() {
    console.log('need to develop Modal');
  }

  _generateMenuCategMarkup() {
    let markup = [];

    for (const { id: categoryId, name, active } of Object.values(
      menuCategories
    )) {
      markup.push(`<li class="${active ? 'menu--navbar__active' : ''}">
          <a class="menu--navbar__link" data-category-id="${categoryId}">${name}</a>
        </li>`);
    }

    return markup.join('');
  }

  _generateMenuItemsMarkup() {
    let markup = [];

    // for each category load corresponsding items and construct markup
    for (const { id: categoryId, active } of Object.values(menuCategories)) {
      markup.push(
        `<div class="menu--items ${
          active ? '' : 'hidden'
        }" data-category-id="${categoryId}">`
      );

      for (const [
        key,
        { catgId: productCatgId, name, price, qty, img, special_deal },
      ] of Object.entries(menuItems)) {
        if (productCatgId === categoryId) {
          markup.push(`<div class="menu--item" data-item-id="${key}">
                          <div class="menu--item__image"><img src="${img}"></div>
                          <div class="menu--item__details">
                            <div class="menu--item__info"><img src="images/Icon/info.png"></div>
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

  _generateItemOrderMarkup(itemData) {
    console.log('_generateItemOrderMarkup');
    return `<div class="order--item">
      <div class="item-content__thumb">
        <div class="thumb__image"><img src="${itemData.img}"></div>
        <div class="thumb__title"><span>${itemData.name}</span></div>
        <div class="thumb__price"><span>$ ${itemData.priceD}</span></div>
      </div>
      <div class="order--item__qty" data-item-id="${Number(itemData.itemId)}">
        <span>x</span> <span class="itemQty">${itemData.qty}</span>

      </div>
      <div class="order--item__total">
      <span class="item__currency">$ </span> <span class="totalPrice">${
        itemData.priceD
      }</span>
      </div>
      <div class="order--item__note">
        <input type="text" placeholder="Order Note...">
      </div>
      <div class="order--item__remove">
        <img src="images/Icon/Trash.png">
      </div>
      </div>`;
  }

  // _submitOrder() {}
}

const app = new App();
