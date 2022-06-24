/** @format */
'use strict';
// Data

// Icons
import trash from 'url:../img/icon/trash.png';

// Views
import menuCatView from './views/menuCatView.js';
import menuInfoView from './views/menuInfoView.js';
import menuItemsView from './views/menuItemsView.js';
import menuSpecialModalView from './views/menuSpecialModalView.js';
import orderItemView from './views/orderItemView.js';
import orderSpecialBoxView from './views/orderSpecialBoxView.js';
import orderSpecialItemView from './views/orderSpecialItemView.js';

import * as model from './model.js';
// Polyfilling
import 'core-js/stable';
import 'regenerator-runtime'; // polyfilling async-await

class App {
  constructor() {
    menuInfoView.render(model.state.info);
    menuCatView.render(model.state.menuCategories);
    menuItemsView.render(model.state);
    menuCatView.activateMenuCat();
    menuItemsView.addHandlerRender(this._controlOrderItemForm.bind(this));
    menuSpecialModalView.render(model.state.menuItems);
    menuSpecialModalView.addModalEventListeners();
    menuSpecialModalView.addHandlerAdd(this._controlOrderSpecialMix.bind(this));
  }

  _controlOrderItemForm(btn) {
    // The items selected individually from the menu (meaning not in a "special mix")
    // are not special Items === false
    const specialItem = false;

    // Retrieve data from menuItems object according to item selected on
    // "data-item-id" attribute of html element
    const { name, price, qty, img } =
      model.state.menuItems[btn.getAttribute('data-item-id')];

    const priceD = price.toFixed(2);
    const totalPrice = price;
    const itemId = btn.getAttribute('data-item-id');
    const currItemLog = model.state.currentOrderLog[itemId];

    // On selecting an item, check if itemId already exists in current Order List
    // 1- if YES: update Qty & total price
    if (currItemLog) {
      //update qty and total of item in state
      currItemLog.qty++;
      currItemLog.totalPrice = currItemLog.price * currItemLog.qty;

      //update qty & total of item in UI
      orderItemView.updateItemTotalPrice(itemId, currItemLog);

      // 2- if NO: add new object to state
    } else {
      model.state.currentOrderLog[itemId] = {
        itemId,
        name,
        price,
        qty,
        img,
        specialItem,
        totalPrice,
      };

      // Display the order Item in the UI
      orderItemView.render({
        itemId,
        name,
        priceD,
        qty,
        img,
        specialItem,
        special: false,
      });

      // Add Delete Item event
      orderItemView.addHandlerRender(
        this._controlOrderItemRemove.bind(this, itemId, false)
      );
    }

    this._controlOrderPrice();
  }

  _controlOrderSpecialMix(totalPcs, specialMixPrice) {
    // 1- add the special Mix item to state and UI
    const specialEditId = this._controlOrderSpecialItemForm(
      totalPcs,
      specialMixPrice
    );

    // 2- close the modal
    menuSpecialModalView.closeModal();

    // 3- update order price in state and UI
    this._controlOrderPrice();

    // 4- add new ID to edit
    const specialEditBtn =
      menuSpecialModalView.getSpecialEditBtn(specialEditId);

    // 5- Clicking Edit:
    //    1- set ID on save btn
    //    2- add event handler to save btn
    //    3- update items of Modal to reflect values edited

    specialEditBtn.addEventListener('click', () => {
      menuSpecialModalView.setBtnSaveId(specialEditId);

      //execute save event only once each time we click edit
      menuSpecialModalView.addHandlerSave(
        this._controlOrderSpecialItemForm.bind(this)
      );

      const orderSpecialItems = model.state.currentOrderLog[specialEditId];
      menuSpecialModalView.updateModal(orderSpecialItems);
    });

    const specialRemoveBtn =
      menuSpecialModalView.getSpecialRemoveBtn(specialEditId);

    specialRemoveBtn.addEventListener(
      'click',
      this._controlOrderSpecialItemRemove.bind(this, specialEditId, true)
    );
  }

  _controlOrderSpecialItemForm(totalPcs, specialMixPrice, saveSpecialEditId) {
    // check specialEditId:
    // If clicking on Save === ID already exists: reset container by removing items
    // If clicking on Add === create new container with ID
    // Return the ID

    const specialEditId = orderSpecialBoxView.checkSpecialEditId(
      totalPcs,
      specialMixPrice,
      saveSpecialEditId
    );

    model.state.currentOrderLog[specialEditId] = [
      { mixPrice: specialMixPrice },
    ];

    // add each item in the MIX inside the current log and in the UI
    const modalMenuItems = document.querySelectorAll('.special-menu--item');

    modalMenuItems.forEach((item) => {
      const itemId = item.getAttribute('data-item-id');
      const name = model.state.menuItems[itemId].name;
      const specialPrice = Number(specialMixPrice / totalPcs).toFixed(2);
      const img = model.state.menuItems[itemId].img;
      const qty = Number(
        item.querySelector('.order--item__qty-num').textContent
      );
      const specialItem = true;

      if (qty > 0) {
        model.state.currentOrderLog[specialEditId].push({
          itemId,
          name,
          specialPrice,
          qty,
          img,
          specialItem,
        });

        orderSpecialItemView.render({
          itemId,
          name,
          specialPrice,
          qty,
          img,
          specialEditId,
        });
      }
    });

    if (saveSpecialEditId) {
      menuSpecialModalView.closeModal();
    }

    return specialEditId;
  }

  _controlOrderPrice() {
    let total = 0;

    for (const [key, { totalPrice }] of Object.entries(
      model.state.currentOrderLog
    )) {
      if (key.startsWith('id')) {
        total += model.state.currentOrderLog[key][0].mixPrice;
      } else {
        total += totalPrice;
      }
    }

    // To be inserted to seperate view
    const totalEl = document.querySelector('.order-total--price span');
    totalEl.textContent = Number(total).toFixed(2);
  }

  _controlOrderItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderItemView.removeItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();
  }

  _controlOrderSpecialItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderSpecialItemView.removeSpecialItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();
  }
}

const app = new App();
