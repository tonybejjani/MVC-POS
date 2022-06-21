/** @format */
'use strict';
// Data

// Icons
import trash from 'url:../img/icon/trash.png';
import edit from 'url:../img/icon/edit.png';

// Views
import menuCatView from './views/menuCatView.js';
import infoView from './views/infoView.js';
import menuItemsView from './views/menuItemsView.js';
import specialMixModalView from './views/specialMixModalView.js';
import itemOrderView from './views/itemOrderView.js';

import * as model from './model.js';
// Polyfilling
import 'core-js/stable';
import 'regenerator-runtime'; // polyfilling async-await

class App {
  #currentOrderLog = {};

  constructor() {
    infoView.render(model.state.info);
    menuCatView.render(model.state.menuCategories);
    menuItemsView.render(model.state);
    menuCatView.addHandlerRender(this._showMenuCats);
    menuItemsView.addHandlerRender(this._showItemOrderForm.bind(this));
    specialMixModalView.render(model.state.menuItems);

    const menuSpecialBtn = document.querySelector(
      '.menu--special--item__button'
    );

    const menuSpecialBtnItemId = Number(
      document
        .querySelector('.menu--special--item__button')
        .getAttribute('data-item-id')
    );

    const totalPcs = model.state.menuItems[menuSpecialBtnItemId].qty;
    const specialMixPrice = model.state.menuItems[menuSpecialBtnItemId].price;
    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.close-modal');
    const btnIncrease = document.querySelectorAll('.order--item__qty-increase');
    const btnDecrease = document.querySelectorAll('.order--item__qty-decrease');
    const btnAdd = document.querySelector('.special-menu--footer .btnAdd');
    const btnSave = document.querySelector('.special-menu--footer .btnSave');
    const itemQty = document.querySelectorAll(
      '.special-menu--items .order--item__qty-num'
    );
    const totalQty = document.querySelector('.special-menu--footer .total-qty');

    this._addModalEventListeners({
      menuSpecialBtn,
      modal,
      overlay,
      btnCloseModal,
      btnIncrease,
      btnDecrease,
      btnAdd,
      btnSave,
      itemQty,
      totalQty,
      totalPcs,
      specialMixPrice,
    });
  }

  _render(markup, className, position) {
    const container = document.querySelector(className);
    container.insertAdjacentHTML(position, markup);
  }

  _addModalEventListeners(selectors) {
    const {
      menuSpecialBtn,
      modal,
      overlay,
      btnCloseModal,
      btnIncrease,
      btnDecrease,
      btnAdd,
      btnSave,
      itemQty,
      totalQty,
      totalPcs,
      specialMixPrice,
    } = selectors;

    const closeModal = function () {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');

      // Reset Quantities
      itemQty.forEach(function (el) {
        el.textContent = 0;
      });
      totalQty.textContent = 0;

      // Disable decrease buttons
      btnDecrease.forEach(function (el) {
        el.classList.add('disabled');
        el.disabled = true;
      });

      // Enable Increase Buttons
      btnIncrease.forEach(function (el) {
        el.classList.remove('disabled');
        el.disabled = false;
      });
      // Disable Add Button
      btnAdd.classList.add('disabled');
      btnAdd.disabled = true;
      btnAdd.classList.remove('hidden');
      btnSave.classList.add('hidden');
    };

    const openModal = function () {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    };

    const updateModal = function (orderSpecialItemsId) {
      openModal();

      // qty counter
      let specialOrderQty = 0;

      // update current quantity in the modal to mtch "Mix Special Item" being edited
      // enable and disable buttons accordingly
      itemQty.forEach((item) => {
        const specialModalItemId = Number(
          item.closest('.special-menu--item').getAttribute('data-item-id')
        );
        const btnDecrease = item.previousElementSibling;

        orderSpecialItemsId.forEach((specialItem) => {
          /* match the corresponding order in the mix with 
          the modal itemid to update the quantity when editing */
          if (Number(specialItem.itemId) === specialModalItemId) {
            item.textContent = String(specialItem.qty);

            specialOrderQty += specialItem.qty;
            // enable decrease button
            btnDecrease.classList.remove('disabled');
            btnDecrease.disabled = false;
          }
        });

        // Update Modal quantity
        totalQty.textContent = String(specialOrderQty);

        /* Disbale increase button  and Enable Edit button */
        if (specialOrderQty === Number(totalPcs)) {
          // enable add button
          // disable increase
          btnSave.classList.remove('disabled');
          btnSave.disabled = false;

          btnIncrease.forEach(function (el) {
            el.classList.add('disabled');
            el.disabled = true;
          });
        }
      });

      btnAdd.classList.add('hidden');
      btnSave.classList.remove('hidden');
    };

    const changeQty = function (el, inc, totalQtyNum) {
      let itemQtyNum;
      inc
        ? (itemQtyNum = Number(el.previousElementSibling.textContent))
        : (itemQtyNum = Number(el.nextElementSibling.textContent));

      inc ? itemQtyNum++ : itemQtyNum--;
      inc ? totalQtyNum++ : totalQtyNum--;

      inc
        ? (el.previousElementSibling.textContent = String(itemQtyNum))
        : (el.nextElementSibling.textContent = String(itemQtyNum));

      totalQty.textContent = String(totalQtyNum);

      return totalQtyNum;
    };

    menuSpecialBtn.addEventListener('click', openModal);
    btnCloseModal.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    btnIncrease.forEach((el) =>
      el.addEventListener('click', function () {
        let totalQtyNum = Number(totalQty.textContent);

        totalQtyNum = changeQty(el, true, totalQtyNum);

        if (totalQtyNum > 0) {
          btnDecrease.forEach(function (el) {
            if (Number(el.nextElementSibling.textContent) > 0) {
              el.classList.remove('disabled');
              el.disabled = false;
            }
          });
        }

        if (totalQtyNum === Number(totalPcs)) {
          // enable add button
          // disable increase
          btnAdd.classList.remove('disabled');
          btnAdd.disabled = false;
          btnSave.classList.remove('disabled');
          btnSave.disabled = false;

          btnIncrease.forEach(function (el) {
            el.classList.add('disabled');
            el.disabled = true;
          });
        }
      })
    );

    btnDecrease.forEach((el) =>
      el.addEventListener('click', function () {
        let totalQtyNum = Number(totalQty.textContent);

        totalQtyNum = changeQty(el, false, totalQtyNum);

        if (Number(el.nextElementSibling.textContent) === 0) {
          el.classList.add('disabled');
          el.disabled = true;
        }

        if (totalQtyNum !== Number(totalPcs)) {
          // enable add button
          // disable increase
          btnAdd.classList.add('disabled');
          btnAdd.disabled = true;
          btnSave.classList.add('disabled');
          btnSave.disabled = true;

          btnIncrease.forEach(function (el) {
            el.classList.remove('disabled');
            el.disabled = false;
          });
        }
      })
    );

    btnAdd.addEventListener('click', () => {
      const specialEditId = this._showSpecialItemOrderForm(
        totalPcs,
        specialMixPrice
      );

      closeModal();
      this._updateOrderPrice();

      const specialEdit = document.querySelector(
        `.order--item__edit[data-special-item-id="${specialEditId}"]`
      );

      specialEdit.addEventListener('click', () => {
        // console.log(specialEdit);

        btnSave.setAttribute('data-special-item-id', specialEditId);
        const orderSpecialItemsId = this.#currentOrderLog[specialEditId];

        updateModal(orderSpecialItemsId);
      });

      const specialDeleteBtn = document.querySelector(
        `.special-container--header .order--item__remove[data-special-item-id="${specialEditId}"]`
      );

      specialDeleteBtn.addEventListener(
        'click',
        this._removeItemOrder.bind(this, specialEditId, true)
      );
    });

    btnSave.addEventListener('click', () => {
      const specialEditId = btnSave.getAttribute('data-special-item-id');

      console.log(specialEditId);
      this._showSpecialItemOrderForm(totalPcs, specialMixPrice, specialEditId);
      closeModal();
      this._updateOrderPrice();
    });
  }

  _showItemOrderForm(btn) {
    /* get data from menuItems object according to item selected on
     "data-item-id" attribute of html element */

    const { name, price, qty, img } =
      model.state.menuItems[btn.getAttribute('data-item-id')];

    const priceD = price.toFixed(2); //convert price to decimal
    const totalPrice = price;
    const itemId = btn.getAttribute('data-item-id');
    const currItemLog = this.#currentOrderLog[itemId];
    const itemQty = document.querySelector(
      `.order--item.order--item-normal[data-item-id="${Number(
        itemId
      )}"] .itemQty`
    );

    /* The items selected individually from the menu (meaning not in a "special mix" for instance )
    are not special Items === false*/
    const specialItem = false;

    // On selecting an item, check if itemId already exists in current Order List

    // 1- if YES: update Qty & total price
    if (currItemLog) {
      //update qty and total price in #currentOrderLog Object
      currItemLog.qty++;
      currItemLog.totalPrice = currItemLog.price * currItemLog.qty;

      //update UI: item qty & total price
      itemQty.textContent = currItemLog.qty;
      itemQty.parentElement.previousElementSibling.querySelector(
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
        totalPrice,
      };

      itemOrderView.render({
        itemId,
        name,
        priceD,
        qty,
        img,
        specialItem,
        special: false,
      });
      // this._render(
      //   this._generateItemOrderMarkup(
      //     { itemId, name, priceD, qty, img, specialItem },
      //     false
      //   ),
      //   '.order__details',
      //   'afterbegin'
      // );

      const deleteBtn = document.querySelector('.order--item__remove');
      deleteBtn.addEventListener(
        'click',
        this._removeItemOrder.bind(this, itemId, false)
      );
    }

    console.log(this.#currentOrderLog);

    this._updateOrderPrice();
  }

  _showSpecialItemOrderForm(totalPcs, specialMixPrice, specialEditId) {
    const specialMenuItems = document.querySelectorAll('.special-menu--item');
    const specialContainerItems = document.querySelectorAll(
      `.special-container[data-special-item-id='${specialEditId}'] .order--item`
    );

    specialEditId
      ? specialContainerItems.forEach((item) => {
          item.remove();
        })
      : ((specialEditId = 'id' + new Date().getTime()),
        this._render(
          this._generateSpecialContainer(
            totalPcs,
            specialMixPrice,
            specialEditId
          ),
          '.order__details',
          'afterbegin'
        ));

    this.#currentOrderLog[specialEditId] = [{ mixPrice: specialMixPrice }];

    specialMenuItems.forEach((item) => {
      const itemId = item.getAttribute('data-item-id');
      const name = model.state.menuItems[itemId].name;
      const specialPrice = Number(specialMixPrice / totalPcs).toFixed(2);
      const img = model.state.menuItems[itemId].img;
      const qty = Number(
        item.querySelector('.order--item__qty-num').textContent
      );
      const specialItem = true;

      if (qty > 0) {
        this.#currentOrderLog[specialEditId].push({
          itemId,
          name,
          specialPrice,
          qty,
          img,
          specialItem,
        });

        // specialItemOrderView.render({
        //   itemId,
        //   name,
        //   priceD,
        //   specialPrice,
        //   qty,
        //   img,
        // });

        this._render(
          this._generateItemOrderMarkup(
            { itemId, name, priceD: specialPrice, qty, img },
            true
          ),
          `.special-container[data-special-item-id='${specialEditId}']`,
          'beforeend'
        );
      }
    });

    return specialEditId;
  }

  _showMenuCats(catLink, catLinks, menuCatItems) {
    console.log(this);
    console.log(catLink);
    if (catLink.closest('li').classList.contains('menu--navbar__active'))
      return;

    catLinks.forEach((link) => {
      link.closest('li').classList.remove('menu--navbar__active');

      if (link.dataset.categoryId === catLink.dataset.categoryId) {
        link.closest('li').classList.add('menu--navbar__active');
      }
    });

    menuCatItems.forEach((catItem) => {
      catItem.classList.add('hidden');

      if (catLink.dataset.categoryId === catItem.dataset.categoryId) {
        catItem.classList.remove('hidden');
      }
    });
  }

  _updateOrderPrice() {
    const totalEl = document.querySelector('.order-total--price span');
    let total = 0;

    for (const [key, { totalPrice }] of Object.entries(this.#currentOrderLog)) {
      if (key.startsWith('id')) {
        total += this.#currentOrderLog[key][0].mixPrice;
      } else {
        total += totalPrice;
      }
    }

    totalEl.textContent = total.toFixed(2);
  }

  _removeItemOrder(itemId, special) {
    //delete item from CurrentOrderLog Object
    delete this.#currentOrderLog[itemId];

    this._updateOrderPrice();

    //select item to delete from UI
    const orderItem = document.querySelector(
      `.order--item.order--item-normal[data-item-id="${Number(itemId)}"]`
    );

    const specialOrderItem = document.querySelector(
      `.special-container[data-special-item-id= "${itemId}"]`
    );

    // delete item from UI
    special ? specialOrderItem.remove() : orderItem.remove();
  }

  /*****************************************************************/
  /*****************************************************************/
  /*                                                               */
  /*                            VIEWS                              */
  /*                                                               */
  /*****************************************************************/
  /*****************************************************************/

  _generateItemOrderMarkup(itemData, special) {
    return `<div class="order--item ${
      special ? `order--item-special` : `order--item-normal`
    }" data-item-id="${itemData.itemId}">
      <div class="item-content__thumb ${
        special ? `special-content__thumb` : ``
      }">
          <div class="thumb__image"><img src="${itemData.img}"></div>
          <div class="thumb__title ${
            special ? `special-thumb__title` : ``
          }"><span>${itemData.name}</span></div>
        ${
          special === false
            ? `<div class="thumb__price"><span>${itemData.priceD}</span></div>`
            : ''
        }  
        </div>

       
        <div class="order--item__total">
        ${
          special === false
            ? `<span class="item__currency">$ </span> <span class="totalPrice">${itemData.priceD}</span>`
            : ''
        }  
        </div>
        <div class="order--item__qty">
        <span class="itemQty">${itemData.qty}</span>
      </div>
        ${
          special === false
            ? `<div class="order--item__remove"> <img src="${trash}#trash"></div>`
            : ''
        }
      
      </div>`;
  }

  _generateSpecialContainer(totalPcs, specialMixPrice, specialItemId) {
    return `<div class="special-container" data-special-item-id="${specialItemId}">
              <div class="special-container--header">
               <h1>MIX ${totalPcs} PCS FOR $ ${specialMixPrice}</h1>
               <div class="order--item__remove" data-special-item-id="${specialItemId}">
                <img src="${trash}#trash">
               </div>
               <div class="order--item__edit" data-special-item-id="${specialItemId}">
                <img src="${edit}">
               </div>               
              </div>
            
            </div>`;
  }

  // _submitOrder() {}
}

const app = new App();
