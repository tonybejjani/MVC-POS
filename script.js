/** @format */

'use strict';

const menuItems = {
  1: {
    catg: 1,
    catgName: 'Yumcha',
    name: 'Pork Soup Dumling',
    price: 2.0,
    qty: 1,
    img: 'images/1x/asset11.png',
  },
  2: {
    catg: 1,
    catgName: 'Yumcha',
    name: 'Prawn Dumpling',
    price: 2.5,
    qty: 1,
    img: 'images/1x/asset12.png',
  },
  3: {
    catg: 1,
    catgName: 'Yumcha',
    name: 'BBQ Pork Buns',
    price: 3,
    qty: 1,
    img: 'images/1x/asset13.png',
  },
};

class App {
  #currentOrderLog = {};

  constructor() {
    // to do: load Menu functionality
    const selectItemBtns = document.querySelectorAll('.menu--item__button');

    selectItemBtns.forEach((btn) =>
      btn.addEventListener('click', this._showItemForm.bind(this, btn))
    );
  }

  _showItemForm(btn) {
    // get data from menuItems object according to item selected on
    // "data-item-id" attribute of element
    const { name, price, qty, img } =
      menuItems[btn.getAttribute('data-item-id')];

    const priceD = price.toFixed(2); //convert price to decimal
    const itemId = btn.getAttribute('data-item-id');
    const currItemId = this.#currentOrderLog[itemId];
    const itemQty = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"] .itemQty`
    );

    // On selecting an item, check if itemId already exists in current Order List
    // 1- if YES: update Qty & total price
    if (currItemId) {
      //update qty and total price in #currentOrderLog Object
      currItemId.qty++;
      currItemId.totalPrice = currItemId.price * currItemId.qty;

      //update UI: item qty & total price
      itemQty.textContent = currItemId.qty;
      itemQty.parentElement.nextElementSibling.querySelector(
        '.totalPrice'
      ).textContent = currItemId.totalPrice.toFixed(2);

      // 2- if NO: add new item to #currentOrderLog object
    } else {
      this.#currentOrderLog[itemId] = { itemId, name, price, qty, img };
      this._renderItemForm({ itemId, name, priceD, qty, img });
      const deleteBtn = document.querySelector('.order--item__remove');
      deleteBtn.addEventListener('click', this._removeItem.bind(this, itemId));
    }
  }
  // _loadMenu() {}

  _removeItem(itemId) {
    //delete item from Current Order Log Object
    delete this.#currentOrderLog[itemId];

    //delete item from UI
    const deleteItem = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"]`
    );

    deleteItem.parentElement.remove();
  }

  _renderItemForm(itemData) {
    const html = `<div class="order--item">
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
    const orderList = document.querySelector('.order__details');

    orderList.insertAdjacentHTML('afterbegin', html);
  }

  // _submitOrder() {}
}

const app = new App();
