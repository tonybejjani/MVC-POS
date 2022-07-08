/** @format */
import trash from 'url:../../../../img/icon/trash.png';
import mixImg from 'url:../../../../img/menu/mix.png';
import xlbImg from 'url:../../../../img/menu/xlb.png';
import hargowImg from 'url:../../../../img/menu/hargow.png';
import bunsImg from 'url:../../../../img/menu/buns.png';
import chickenImg from 'url:../../../../img/menu/chicken.png';
import siumaiImg from 'url:../../../../img/menu/siumai.png';
import duck2Img from 'url:../../../../img/menu/duck_x2.png';
import duck4Img from 'url:../../../../img/menu/duck_x4.png';
import duck6Img from 'url:../../../../img/menu/duck_x6.png';
import cokeImg from 'url:../../../../img/menu/coke.png';
import spriteImg from 'url:../../../../img/menu/sprite.png';
import fantaImg from 'url:../../../../img/menu/fanta.png';
import soloImg from 'url:../../../../img/menu/solo.png';
import cokeZeroImg from 'url:../../../../img/menu/coke-zero.png';
import waterImg from 'url:../../../../img/menu/water.png';
import crackersImg from 'url:../../../../img/menu/crackers.png';

class orderItemView {
  #parentElement;
  #data;
  #itemQty;
  #btn;

  render(data) {
    this.#parentElement = document.querySelector(
      '.menu-sidebar__items-details'
    );
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    const deleteBtn = document.querySelector('.menu-sidebar__item__remove');
    deleteBtn.addEventListener('click', handler);
  }

  updateItemTotalPrice(itemId, currItemLog) {
    this.#itemQty = document.querySelector(
      `.menu-sidebar__item.menu-sidebar__item-normal[data-item-id="${Number(
        itemId
      )}"] .itemQty`
    );

    setTimeout(
      this._setQtyEffectIn.bind(this, this.#itemQty, currItemLog),
      200
    );
    setTimeout(this._setQtyEffectOut.bind(this, this.#itemQty), 400);

    this.#itemQty.parentElement.previousElementSibling.querySelector(
      '.totalPrice'
    ).textContent = currItemLog.totalPrice.toFixed(2);
  }

  _setQtyEffectIn(el, currItemLog) {
    el.textContent = currItemLog.qty;
    el.style.color = '#000';
    el.style.backgroundColor = '#fffb2b';
  }

  _setQtyEffectOut(el) {
    el.style.color = '#fff';
    el.style.backgroundColor = '#393c49';
  }

  setBtnEl(btn) {
    this.#btn = btn;
  }

  getBtnId() {
    return this.#btn.getAttribute('data-item-id');
  }

  removeItem(itemId) {
    const orderItem = document.querySelector(
      `.menu-sidebar__item.menu-sidebar__item-normal[data-item-id="${Number(
        itemId
      )}"]`
    );

    orderItem.remove();
  }

  _loadImg(img) {
    // console.log(`${img.replace('.png', 'Img')}`);
    // return `${img.replace('.png', '')}`;

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
        case 'duck_x2.png':
          return duck2Img;
        case 'duck_x4.png':
          return duck4Img;
        case 'duck_x6.png':
          return duck6Img;
        case 'coke.png':
          return cokeImg;
        case 'sprite.png':
          return spriteImg;
        case 'fanta.png':
          return fantaImg;
        case 'solo.png':
          return soloImg;
        case 'water.png':
          return waterImg;
        case 'coke-zero.png':
          return cokeZeroImg;
        case 'crackers.png':
          return crackersImg;
      }
  }
  _generateMarkup() {
    return `<div class="menu-sidebar__item menu-sidebar__item-normal" data-item-id="${
      this.#data.itemId
    }">
                <div class="item-content__thumb">

                    <div class="thumb__image"><img src="${this._loadImg(
                      this.#data.img
                    )}" crossorigin></div>
                    <div class="thumb__title"><span>${
                      this.#data.name
                    }</span></div>
                    <div class="thumb__price"><span>${this.#data.price.toFixed(
                      2
                    )} </span></div>
                </div>
        
              
                <div class="menu-sidebar__item__total">
                  <span class="item__currency">$ </span> 
                  <span class="totalPrice">${this.#data.price.toFixed(2)}</span>
                </div>

                <div class="menu-sidebar__item__qty">
                  <span class="itemQty">${this.#data.qty}</span>
                </div>
              <div class="menu-sidebar__item__remove"> <img src="${trash}#trash" crossorigin></div>
                    
              
            </div>`;
  }
}

export default new orderItemView();
