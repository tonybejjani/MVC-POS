/** @format */
import trash from 'url:../../../../img/icon/trash.png';
class orderSpecialItemView {
  #parentElement;
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement = document.querySelector(
      `.curr-order__items-special-container[data-special-item-id='${
        this.#data.specialEditId
      }']`
    );
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  removeSpecialItem(itemId) {
    const specialOrderItem = document.querySelector(
      `.curr-order__items-special-container[data-special-item-id= "${itemId}"]`
    );

    specialOrderItem.remove();
  }

  _generateMarkup() {
    // _generateItemOrderMarkup(itemData, special) {
    return `<div class="curr-order__item curr-order__item-special" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb special-content__thumb">
                    <div class="thumb__image"><img src="${
                      this.#data.img
                    }" crossorigin></div>
                    <div class="thumb__title special-thumb__title">
                      <span>${this.#data.name}</span></div>
                    </div>
                    <div class="curr-order__item__qty">
                      <span class="itemQty">${this.#data.qty}</span>
                    </div>
                </div>
            </div>`;
  }
}

export default new orderSpecialItemView();
