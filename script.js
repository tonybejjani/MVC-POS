/** @format */
'use strict';

class App {
  #currentOrderLog = {};

  constructor() {
    // const menuItemBtns = document.querySelectorAll('.menu--item__button');
    // const menuSpecialBtn = document.querySelector(
    //   '.menu--special--item__button'
    // );

    // to do: load Menu functionality
    this._loadMenuItems();

    // menuSpecialBtn.addEventListener('click', this._showSpecialModal.bind(this));

    // menuItemBtns.forEach((btn) =>
    //   btn.addEventListener('click', this._showItemForm.bind(this, btn))
    // );
  }

  _loadMenuItems() {
    for (const [
      key,
      { catgId, catgName, name, price, qty, img },
    ] of Object.entries(menuItems)) {
      console.log(key, catgId, catgName, name, price, qty, img);
    }
  }
  // })
  // const html = `<div class="menu--item" >
  //                 <div class="menu--item__image"><img src="images/1x/mix.png"></div>
  //                 <div class="menu--item__details">
  //                   <div class="menu--item__info"><img src="images/Icon/info.png"></div>
  //                   <h2 class="menu--item__title">Mix of 7pcs</h2>
  //                   <div class="menu--item__price">$ 14.00</div>
  //                   <button class="menu--special--item__button" data-item-id="0">Select</button>
  //                 </div>
  //               </div>`;

  // const menuItemsContainer = document.querySelector('.menu--items');

  // menuItemsContainer.insertAdjacentHTML('afterbegin', html);

  _showSpecialModal() {
    console.log('need to develop Modal');
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
    const specialItem = false;

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
      this.#currentOrderLog[itemId] = {
        itemId,
        name,
        price,
        qty,
        img,
        specialItem,
      };
      this._renderItemForm({ itemId, name, priceD, qty, img });
      console.log(this.#currentOrderLog);
      const deleteBtn = document.querySelector('.order--item__remove');
      deleteBtn.addEventListener('click', this._removeItem.bind(this, itemId));
    }
  }
  // _loadMenu() {}

  _removeItem(itemId) {
    //delete item from CurrentOrderLog Object
    delete this.#currentOrderLog[itemId];

    const deleteItem = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"]`
    );

    //delete item from UI
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
