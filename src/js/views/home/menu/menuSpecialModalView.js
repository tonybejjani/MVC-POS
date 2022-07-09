/** @format */
import xlbImg from 'url:../../../../img/menu/xlb.png';
import hargowImg from 'url:../../../../img/menu/hargow.png';
import bunsImg from 'url:../../../../img/menu/buns.png';
import chickenImg from 'url:../../../../img/menu/chicken.png';
import siumaiImg from 'url:../../../../img/menu/siumai.png';

class menuSpecialModalView {
  #parentElement;
  #data;
  #modal;
  #overlay;
  #btnCloseModal;
  #btnIncrease;
  #btnDecrease;
  #btnAdd;
  #btnSave;
  #btnEdit;
  #itemQty;
  #totalQty;
  #totalPcs;
  #menuSpecialBtn;
  #specialBtnCatId;
  #menuSpecialBtnItemId;
  #specialMixPrice;
  #specialEditId;

  _initElements() {
    this.#parentElement = document.querySelector('.menu');
    this.#modal = document.querySelector('.modal');
    this.#overlay = document.querySelector('.overlay');
    this.#btnCloseModal = document.querySelector('.close-modal');
    this.#btnIncrease = document.querySelectorAll(
      '.menu-sidebar__item__qty-increase'
    );
    this.#btnDecrease = document.querySelectorAll(
      '.menu-sidebar__item__qty-decrease'
    );
    this.#btnAdd = document.querySelector('.modal-menu__footer  .btnAdd');
    this.#btnSave = document.querySelector('.modal-menu__footer  .btnSave');
    this.#itemQty = document.querySelectorAll(
      '.modal-menu-items .menu-sidebar__item__qty-num'
    );
    this.#totalQty = document.querySelector('.modal-menu__footer  .total-qty');
    this.#menuSpecialBtn = document.querySelector('.menu-item__button-special');
  }

  render(data) {
    this.#parentElement = document.querySelector('.menu');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
    this._initElements();
  }

  addHandlerAddOrder(handler) {
    this.#btnAdd.addEventListener(
      'click',
      handler.bind(this, this.#totalPcs, this.#specialMixPrice)
    );
  }

  addHandlerSaveOrder(handler) {
    this._setBtnSaveId(this.#specialEditId);

    this.#btnSave.addEventListener(
      'click',
      handler.bind(
        this,
        this.#totalPcs,
        this.#specialMixPrice,
        this.#specialEditId
      ),
      { once: true }
    );
  }

  addHandlerEditOrder(handler) {
    this._setSpecialEditBtnEl(this.#specialEditId);
    this.#btnEdit.addEventListener('click', handler);
  }

  addHandlerRemoveOrder(handler) {
    const specialRemoveBtn = this._getSpecialRemoveBtnEl(this.#specialEditId);

    specialRemoveBtn.addEventListener(
      'click',
      handler.bind(this, this.#specialEditId, true),
      { once: true }
    );
  }

  _setSpecialEditBtnEl(specialEditId) {
    this.#btnEdit = document.querySelector(
      `.menu-sidebar__item__edit[data-special-item-id="${specialEditId}"]`
    );
  }

  //public
  setSpecialEditId(specialEditId) {
    this.#specialEditId = specialEditId;
  }

  _setBtnSaveId(specialEditId) {
    this.#btnSave.setAttribute('data-special-item-id', specialEditId);
  }

  setTotalPcs(totalPcs) {
    this.#totalPcs = totalPcs;
  }

  setSpecialMixPrice(specialMixPrice) {
    this.#specialMixPrice = specialMixPrice;
  }

  _getSpecialRemoveBtnEl(specialEditId) {
    return document.querySelector(
      `.menu-sidebar__items-special-container__header .menu-sidebar__item__remove[data-special-item-id="${specialEditId}"]`
    );
  }

  getTotalPcs() {
    return this.#totalPcs;
  }

  getSpecialMixPrice() {
    return this.#specialMixPrice;
  }

  closeModal() {
    this.#modal.classList.add('hidden');
    this.#overlay.classList.add('hidden');

    // Reset Quantities to 0
    this.#itemQty.forEach(function (el) {
      el.textContent = 0;
    });
    this.#totalQty.textContent = 0;

    // Disable decrease buttons
    this.#btnDecrease.forEach(function (el) {
      el.classList.add('disabled');
      el.disabled = true;
    });

    // Enable Increase Buttons
    this.#btnIncrease.forEach(function (el) {
      el.classList.remove('disabled');
      el.disabled = false;
    });

    // show and disable Add Button and hide save button
    this.#btnAdd.classList.add('disabled');
    this.#btnAdd.disabled = true;
    this.#btnAdd.classList.remove('hidden');
    this.#btnSave.classList.add('hidden');
  }

  _openModal() {
    this.#modal.classList.remove('hidden');
    this.#overlay.classList.remove('hidden');
  }

  // Edit a Specific Mix Order Item by updating the modal values and saving
  updateModal(orderSpecialItemsId) {
    this._openModal();

    // qty counter
    let specialOrderQty = 0;

    // update current quantity in the modal to match "Mix Special Item" being edited
    // enable and disable buttons accordingly
    this.#itemQty.forEach((item) => {
      const specialModalItemId = Number(
        item.closest('.modal-menu-item').getAttribute('data-item-id')
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

      // Update Modal quantity field
      this.#totalQty.textContent = String(specialOrderQty);

      // Disable increase button and Enable Save button
      if (specialOrderQty === Number(this.#totalPcs)) {
        this.#btnSave.classList.remove('disabled');
        this.#btnSave.disabled = false;

        this.#btnIncrease.forEach(function (el) {
          el.classList.add('disabled');
          el.disabled = true;
        });
      }
    });

    // display the save button and hide add button
    this.#btnAdd.classList.add('hidden');
    this.#btnSave.classList.remove('hidden');
  }

  _changeQty(el, inc, totalQtyNum) {
    let itemQtyNum;
    inc
      ? (itemQtyNum = Number(el.previousElementSibling.textContent))
      : (itemQtyNum = Number(el.nextElementSibling.textContent));

    inc ? itemQtyNum++ : itemQtyNum--;
    inc ? totalQtyNum++ : totalQtyNum--;

    inc
      ? (el.previousElementSibling.textContent = String(itemQtyNum))
      : (el.nextElementSibling.textContent = String(itemQtyNum));

    this.#totalQty.textContent = String(totalQtyNum);

    return totalQtyNum;
  }

  addModalEventListeners() {
    this.#menuSpecialBtn.addEventListener('click', this._openModal.bind(this));
    this.#btnCloseModal.addEventListener('click', this.closeModal.bind(this));
    this.#overlay.addEventListener('click', this.closeModal.bind(this));

    this.#btnIncrease.forEach((el) =>
      el.addEventListener('click', this._increaseItemNum.bind(this, el))
    );
    this.#btnDecrease.forEach((el) =>
      el.addEventListener('click', this._decreaseItemNum.bind(this, el))
    );

    // this.#btnSave.addEventListener('click', () => {
    //   const specialEditId = btnSave.getAttribute('data-special-item-id');
    //   this._controlOrderSpecialItemForm(
    //     totalPcs,
    //     specialMixPrice,
    //     specialEditId
    //   );
    //   closeModal();
    //   this._controlOrderPrice();
    // });
  }

  _increaseItemNum(el) {
    let totalQtyNum = Number(this.#totalQty.textContent);

    totalQtyNum = this._changeQty(el, true, totalQtyNum);

    if (totalQtyNum > 0) {
      this.#btnDecrease.forEach(function (el) {
        if (Number(el.nextElementSibling.textContent) > 0) {
          el.classList.remove('disabled');
          el.disabled = false;
        }
      });
    }

    if (totalQtyNum === Number(this.#totalPcs)) {
      // enable add button
      // disable increase
      this.#btnAdd.classList.remove('disabled');
      this.#btnAdd.disabled = false;
      this.#btnSave.classList.remove('disabled');
      this.#btnSave.disabled = false;

      this.#btnIncrease.forEach(function (el) {
        el.classList.add('disabled');
        el.disabled = true;
      });
    }
  }

  _decreaseItemNum(el) {
    let totalQtyNum = Number(this.#totalQty.textContent);

    totalQtyNum = this._changeQty(el, false, totalQtyNum);

    if (Number(el.nextElementSibling.textContent) === 0) {
      el.classList.add('disabled');
      el.disabled = true;
    }

    if (totalQtyNum !== Number(this.#totalPcs)) {
      // enable add button
      // disable increase
      this.#btnAdd.classList.add('disabled');
      this.#btnAdd.disabled = true;
      this.#btnSave.classList.add('disabled');
      this.#btnSave.disabled = true;

      this.#btnIncrease.forEach(function (el) {
        el.classList.remove('disabled');
        el.disabled = false;
      });
    }
  }

  _loadImg(img) {
    if (img)
      switch (img) {
        case 'mix.png':
          return mixImg;
        case 'xlb.png':
          return xlbImg;
        case 'hargow.png':
          return hargowImg;
        case 'buns.png':
          return bunsImg;
        case 'chicken.png':
          return chickenImg;
        case 'siumai.png':
          return siumaiImg;
      }
  }

  _generateMarkup() {
    this.#specialBtnCatId = Number(
      document
        .querySelector('.menu-item__button-special')
        .closest('.menu-items')
        .getAttribute('data-category-id')
    );

    this.#menuSpecialBtnItemId = Number(
      document
        .querySelector('.menu-item__button-special')
        .getAttribute('data-item-id')
    );

    this.#totalPcs = this.#data[this.#menuSpecialBtnItemId].qty;
    this.#specialMixPrice = this.#data[this.#menuSpecialBtnItemId].price;

    let markup = [];

    markup.push(`<div class="modal hidden" data-category-id="1">
                      <button class="close-modal">×</button>
                      <h2 class="modal-menu__header">Select <span>${
                        this.#totalPcs
                      }</span> pcs:</h2>
                      <div class="modal-menu-items">`);

    for (const [key, { catgId, name, img, special_deal }] of Object.entries(
      this.#data
    )) {
      if (catgId === this.#specialBtnCatId && !special_deal)
        markup.push(`<div class="modal-menu-item" data-item-id="${key}">
                          <img src="${this._loadImg(img)}">
                          <div class="modal-menu-item__name">${name}</div>
                          <div class="menu-sidebar__item__qty">
                            <button type="button" class="menu-sidebar__item__qty-decrease disabled" disabled>&#8722;</button>
                            <span class="menu-sidebar__item__qty-num">0</span>
                            <button type="button" class="menu-sidebar__item__qty-increase">&#43;</button>
                          </div>
                        </div>`);
    }
    markup.push(`</div>
                    <div class="modal-menu__footer ">
                      <div class="menu-sidebar__item__qty">
                        <p class="menu-sidebar__item__qty-pcs">Total</p>
                        <span class="total-qty menu-sidebar__item__qty-num">0</span>
                        
                      </div>
                        <button class="btnAdd disabled" disabled>Add</button>
                        <button class="btnSave disabled hidden" disabled data-special-item-id="" >Save</button>
                    </div>
                </div>
                <div class="overlay hidden"></div>`);

    return markup.join(' ');
  }
}

export default new menuSpecialModalView();
