/** @format */

'use strict';

const menuItems = {
  1: {
    name: 'Pork Soup Dumling',
    price: 2.0,
    qty: 1,
    img: 'images/1x/asset11.png',
  },
  2: {
    name: 'Prawn Dumpling',
    price: 2.5,
    qty: 1,
    img: 'images/1x/asset12.png',
  },
  3: {
    name: 'BBQ Pork Buns',
    price: 3,
    qty: 1,
    img: 'images/1x/asset13.png',
  },
};

const currentOrder = {};

const menuBtns = document.querySelectorAll('.menu--item__button');
const orderList = document.querySelector('.order__details');

menuBtns.forEach((btn) =>
  btn.addEventListener('click', function () {
    // get data from menuItems object according to item selected on
    // "data-item-id" attribute of element
    const { name, price, qty, img } =
      menuItems[this.getAttribute('data-item-id')];

    //convert price to decimal
    const priceD = price.toFixed(2);
    const itemId = this.getAttribute('data-item-id');

    // On selecting an item, check if itemId already exists in current Order List
    // 1- if YES: update Qty & total price
    if (currentOrder[itemId]) {
      const currItemId = currentOrder[itemId];

      //update qty and total price in Object storing the current order
      currItemId.qty++;
      currItemId.totalPrice = currItemId.price * currItemId.qty;

      //update UI: item qty & total price
      const itemQty = document.querySelector(
        `.order--item__qty[data-item-id="${Number(itemId)}"] .itemQty`
      );
      itemQty.textContent = currItemId.qty;
      itemQty.parentElement.nextElementSibling.querySelector(
        '.totalPrice'
      ).textContent = currItemId.totalPrice.toFixed(2);

      // 2- if NO: add new item to order list
    } else {
      currentOrder[itemId] = { itemId, name, price, qty, img };
      renderItemForm({ itemId, name, priceD, qty, img });
    }
  })
);

const renderItemForm = function (itemData) {
  const html = `<div class="order--item">
                  <div class="item-content__thumb">
                    <div class="thumb__image"><img src="${itemData.img}"></div>
                    <div class="thumb__title"><span>${
                      itemData.name
                    }</span></div>
                    <div class="thumb__price"><span>$ ${
                      itemData.priceD
                    }</span></div>
                  </div>
                  <div class="order--item__qty" data-item-id="${Number(
                    itemData.itemId
                  )}">
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
                    <a href="#"><img src="images/Icon/Trash.png"></a>
                  </div>
                  </div>`;

  orderList.insertAdjacentHTML('afterbegin', html);
};

// class App {
//   constructor() {}

//   _loadCategories() {}

//   _loadMenu() {}

//   _renderItemForm() {}

//   _submitOrder() {}
// }
