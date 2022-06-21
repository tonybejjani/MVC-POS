/** @format */
import trash from 'url:../../img/icon/trash.png';
class orderItemView {
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
    return `<div class="order--item order--item-normal" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb">

                    <div class="thumb__image"><img src="${
                      this.#data.img
                    }"></div>
                    <div class="thumb__title"><span>${
                      this.#data.name
                    }</span></div>
                    <div class="thumb__price"><span>${
                      this.#data.priceD
                    } </span></div>
                </div>
        
              
                <div class="order--item__total">
                  <span class="item__currency">$ </span> 
                  <span class="totalPrice">${this.#data.priceD}</span>
                </div>

                <div class="order--item__qty">
                  <span class="itemQty">${this.#data.qty}</span>
                </div>
              <div class="order--item__remove"> <img src="${trash}#trash"></div>
                    
              
            </div>`;
  }
}

export default new orderItemView();
