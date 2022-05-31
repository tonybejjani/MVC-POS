/** @format */
'use strict';

class App {
  #currentOrderLog = {};

  constructor() {
    //render Logo, Restaurant Name & Date
    this._render(this._generateInfoMarkup(), '.info', 'afterbegin');

    //render UI menu categories
    this._render(
      this._generateMenuCategMarkup(),
      '.menu--navbar',
      'afterbegin'
    );

    //render UI menu items
    this._render(this._generateMenuItemsMarkup(), '.menu', 'beforeend');

    const menuItemBtns = document.querySelectorAll('.menu--item__button');
    const menuCategLinks = document.querySelectorAll('.menu--navbar__link');

    menuCategLinks.forEach((categlink) =>
      categlink.addEventListener(
        'click',
        this._showMenuCategItems.bind(this, categlink, menuCategLinks)
      )
    );

    menuItemBtns.forEach((btn) =>
      btn.addEventListener('click', this._showItemOrderForm.bind(this, btn))
    );

    // develop "Special Mix" menu item functionality
    const menuSpecialBtn = document.querySelector(
      '.menu--special--item__button'
    );

    const menuSpecialBtnItemId = Number(
      document.querySelector('.menu--special--item__button').attributes[
        'data-item-id'
      ].nodeValue
    );

    const specialBtnCategId = Number(
      document
        .querySelector('.menu--special--item__button')
        .closest('.menu--items').attributes['data-category-id'].nodeValue
    );

    const totalPcs = menuItems[menuSpecialBtnItemId].mix_qty;

    this._render(
      this._generateSpecialModal(
        menuSpecialBtnItemId,
        specialBtnCategId,
        totalPcs
      ),
      '.menu',
      'beforeend'
    );

    const modal = document.querySelector('.modal');
    const overlay = document.querySelector('.overlay');
    const btnCloseModal = document.querySelector('.close-modal');
    const btnIncrease = document.querySelectorAll('.order--item__qty-increase');
    const btnDecrease = document.querySelectorAll('.order--item__qty-decrease');
    const btnAdd = document.querySelector('.special-menu--footer .btnAdd');
    const itemQty = document.querySelectorAll('.order--item__qty-num');
    const totalQty = document.querySelector('.special-menu--footer .total-qty');

    this._addModalEventListeners(
      menuSpecialBtn,
      modal,
      overlay,
      btnCloseModal,
      btnIncrease,
      btnDecrease,
      btnAdd,
      itemQty,
      totalQty,
      totalPcs
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
    /* get data from menuItems object according to item selected on
     "data-item-id" attribute of html element */

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

      console.log(this.#currentOrderLog);
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

    //select item to delete from UI
    const deleteItem = document.querySelector(
      `.order--item__qty[data-item-id="${Number(itemId)}"]`
    );

    // delete item from UI
    deleteItem.parentElement.remove();
  }

  _addModalEventListeners(...args) {
    const [
      menuSpecialBtn,
      modal,
      overlay,
      btnCloseModal,
      btnIncrease,
      btnDecrease,
      btnAdd,
      itemQty,
      totalQty,
      totalPcs,
    ] = args;

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
    };

    const openModal = function () {
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
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

      console.log(itemQtyNum);
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

          btnIncrease.forEach(function (el) {
            el.classList.add('disabled');
            el.disabled = true;
          });
        }
      })
    );

    btnDecrease.forEach((el) =>
      el.addEventListener('click', function () {
        console.log('decrease!');
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

          btnIncrease.forEach(function (el) {
            el.classList.remove('disabled');
            el.disabled = false;
          });
        }
      })
    );
  }

  _generateInfoMarkup() {
    const { logo, title, date } = info;

    return `
    <div class="info__logo"><img src="${logo}"></div>
    <div class="info__title">${title}</div>
    <div class="info__date">${date}</div>`;
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
    return `<div class="order--item">
      <div class="item-content__thumb">
        <div class="thumb__image"><img src="${itemData.img}"></div>
        <div class="thumb__title"><span>${itemData.name}</span></div>
        <div class="thumb__price"><span>$ ${itemData.priceD}</span></div>
      </div>
      <div class="order--item__qty" data-item-id="${Number(itemData.itemId)}">
         <span class="itemQty">${itemData.qty}</span>
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

  _generateSpecialModal(specialBtnItemId, specialBtnCategId, totalPcs) {
    let markup = [];

    console.log(totalPcs);
    markup.push(`<div class="modal hidden" data-category-id="1">
                    <button class="close-modal">×</button>
                    <h1 class="special-menu--header">Select <span>${totalPcs}</span> pcs:</h1>
                    <div class="special-menu--items">`);

    for (const [key, { catgId, name, img, special_deal }] of Object.entries(
      menuItems
    )) {
      if (catgId === specialBtnCategId && special_deal === false)
        markup.push(`<div class="special-menu--item" data-item-id="${key}>
                        <img src="${img}">
                        <div class="special-menu--item-name">${name}</div>
                        <div class="order--item__qty">
                          <button type="button" class="order--item__qty-decrease disabled" disabled>&#8722;</button>
                          <span class="order--item__qty-num">0</span>
                          <button type="button" class="order--item__qty-increase">&#43;</button>
                        </div>
                      </div>`);
    }
    markup.push(`</div>
                  <div class="special-menu--footer">
                    <div class="order--item__qty">
                      <span class="total-qty order--item__qty-num">0</span>
                      <p class="order--item__qty-pcs">pcs</p>
                    </div>
                      <button class="btnAdd disabled" disabled>Add</button>
                  </div>
              </div>
              <div class="overlay hidden"></div>`);

    return markup.join(' ');
  }

  // _submitOrder() {}
}

const app = new App();
