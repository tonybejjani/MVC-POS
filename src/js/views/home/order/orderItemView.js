/** @format */
import trash from 'url:../../../../img/icon/trash.png';
class orderItemView {
  #parentElement;
  #data;
  #itemQty;
  #btn;

  render(data) {
    this.#parentElement = document.querySelector('.curr-order__items-details');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    const deleteBtn = document.querySelector('.curr-order__item__remove');
    deleteBtn.addEventListener('click', handler);
  }

  updateItemTotalPrice(itemId, currItemLog) {
    this.#itemQty = document.querySelector(
      `.curr-order__item.curr-order__item-normal[data-item-id="${Number(
        itemId
      )}"] .itemQty`
    );

    this.#itemQty.textContent = currItemLog.qty;
    this.#itemQty.parentElement.previousElementSibling.querySelector(
      '.totalPrice'
    ).textContent = currItemLog.totalPrice.toFixed(2);
  }

  setBtnEl(btn) {
    this.#btn = btn;
  }

  getBtnId() {
    return this.#btn.getAttribute('data-item-id');
  }

  removeItem(itemId) {
    const orderItem = document.querySelector(
      `.curr-order__item.curr-order__item-normal[data-item-id="${Number(
        itemId
      )}"]`
    );

    orderItem.remove();
  }

  _generateMarkup() {
    return `<div class="curr-order__item curr-order__item-normal" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb">

                    <div class="thumb__image"><img src="${
                      this.#data.img
                    }"></div>
                    <div class="thumb__title"><span>${
                      this.#data.name
                    }</span></div>
                    <div class="thumb__price"><span>${this.#data.price.toFixed(
                      2
                    )} </span></div>
                </div>
        
              
                <div class="curr-order__item__total">
                  <span class="item__currency">$ </span> 
                  <span class="totalPrice">${this.#data.price.toFixed(2)}</span>
                </div>

                <div class="curr-order__item__qty">
                  <span class="itemQty">${this.#data.qty}</span>
                </div>
              <div class="curr-order__item__remove"> <img src="${trash}#trash"></div>
                    
              
            </div>`;
  }
}

export default new orderItemView();
