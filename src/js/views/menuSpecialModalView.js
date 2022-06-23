/** @format */

class menuSpecialModalView {
  #parentElement = document.querySelector('.menu');
  #data;
  #modal;
  #overlay;
  #btnCloseModal;
  #btnIncrease;
  #btnDecrease;
  #btnAdd;
  #btnSave;
  #itemQty;
  #totalQty;
  #totalPcs;
  #menuSpecialBtn;
  #specialBtnCatId;
  #menuSpecialBtnItemId;
  #specialMixPrice;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
    this._initElements();
  }

  addHandlerAdd(handler) {
    this.#btnAdd.addEventListener(
      'click',
      handler.bind(this.#totalPcs, this.#specialMixPrice)
    );
  }

  // addHandlerSave(handler) {
  //   this.#btnSave.addEventListener('click', handler.bind());
  // }

  getSpecialEditBtn(specialEditId) {
    return document.querySelector(
      `.order--item__edit[data-special-item-id="${specialEditId}"]`
    );
  }

  getSpecialRemoveBtn(specialEditId) {
    return document.querySelector(
      `.special-container--header .order--item__remove[data-special-item-id="${specialEditId}"]`
    );
  }

  setBtnSaveId(specialEditId) {
    this.#btnSave.setAttribute('data-special-item-id', specialEditId);
  }

  _initElements() {
    this.#parentElement = document.querySelector('.menu');
    this.#modal = document.querySelector('.modal');
    this.#overlay = document.querySelector('.overlay');
    this.#btnCloseModal = document.querySelector('.close-modal');
    this.#btnIncrease = document.querySelectorAll('.order--item__qty-increase');
    this.#btnDecrease = document.querySelectorAll('.order--item__qty-decrease');
    this.#btnAdd = document.querySelector('.special-menu--footer .btnAdd');
    this.#btnSave = document.querySelector('.special-menu--footer .btnSave');
    this.#itemQty = document.querySelectorAll(
      '.special-menu--items .order--item__qty-num'
    );
    this.#totalQty = document.querySelector('.special-menu--footer .total-qty');
    this.#menuSpecialBtn = document.querySelector(
      '.menu--special--item__button'
    );
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
  _updateModal(orderSpecialItemsId) {
    this._openModal();

    // qty counter
    let specialOrderQty = 0;

    // update current quantity in the modal to match "Mix Special Item" being edited
    // enable and disable buttons accordingly
    this.#itemQty.forEach((item) => {
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

  _generateMarkup() {
    this.#specialBtnCatId = Number(
      document
        .querySelector('.menu--special--item__button')
        .closest('.menu--items')
        .getAttribute('data-category-id')
    );

    this.#menuSpecialBtnItemId = Number(
      document
        .querySelector('.menu--special--item__button')
        .getAttribute('data-item-id')
    );

    this.#totalPcs = this.#data[this.#menuSpecialBtnItemId].qty;
    this.#specialMixPrice = this.#data[this.#menuSpecialBtnItemId].price;

    let markup = [];

    markup.push(`<div class="modal hidden" data-category-id="1">
                      <button class="close-modal">×</button>
                      <h1 class="special-menu--header">Select <span>${
                        this.#totalPcs
                      }</span> pcs:</h1>
                      <div class="special-menu--items">`);

    for (const [key, { catgId, name, img, special_deal }] of Object.entries(
      this.#data
    )) {
      if (catgId === this.#specialBtnCatId && !special_deal)
        markup.push(`<div class="special-menu--item" data-item-id="${key}">
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
                        <button class="btnSave disabled hidden" disabled data-special-item-id="" >Save</button>
                    </div>
                </div>
                <div class="overlay hidden"></div>`);

    return markup.join(' ');
  }
}

export default new menuSpecialModalView();
