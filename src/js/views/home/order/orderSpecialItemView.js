/** @format */
import xlbImg from 'url:../../../../img/menu/xlb.png';
import hargowImg from 'url:../../../../img/menu/hargow.png';
import bunsImg from 'url:../../../../img/menu/buns.png';
import chickenImg from 'url:../../../../img/menu/chicken.png';
import siumaiImg from 'url:../../../../img/menu/siumai.png';

class orderSpecialItemView {
  #parentElement;
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement = document.querySelector(
      `.menu-sidebar__items-special-container[data-special-item-id='${
        this.#data.specialEditId
      }']`
    );
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  removeSpecialItem(itemId) {
    const specialOrderItem = document.querySelector(
      `.menu-sidebar__items-special-container[data-special-item-id= "${itemId}"]`
    );

    specialOrderItem.remove();
  }

  // passing down the imgs dynamically in order to load in parcel
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
    // _generateItemOrderMarkup(itemData, special) {
    return `<div class="menu-sidebar__item menu-sidebar__item-special" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb special-content__thumb">
                    <div class="thumb__image">
                      <img src="${this._loadImg(this.#data.img)}">
                    </div>
                    <div class="thumb__title special-thumb__title">
                      <span>${this.#data.name}</span>
                    </div>
                </div>
                <div class="menu-sidebar__item__qty">
                  <span class="itemQty">${this.#data.qty}</span>
                </div>
                    
                
            </div>`;
  }
}

export default new orderSpecialItemView();
