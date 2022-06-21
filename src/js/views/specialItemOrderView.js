/** @format */
import trash from 'url:../../img/icon/trash.png';
class specialItemOrderView {
  #parentElement = document.querySelector('.order__details');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    // const menuItemBtns = document.querySelectorAll('.menu--item__button');
    // menuItemBtns.forEach((btn) => {
    //   btn.addEventListener('click', handler.bind(this, btn));
    // });
  }

  _generateMarkup() {
    // _generateItemOrderMarkup(itemData, special) {
    return `<div class="order--item order--item-special" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb special-content__thumb">
                    <div class="thumb__image"><img src="${
                      this.#data.img
                    }"></div>
                    <div class="thumb__title special-thumb__title">
                      <span>${this.#data.name}</span></div>
                    </div>
                    <div class="order--item__qty">
                      <span class="itemQty">${this.#data.qty}</span>
                    </div>
                </div>
            </div>`;
  }
}

export default new specialItemOrderView();
