/** @format */
import infoIcon from 'url:../../../../img/icon/info-icon.png';
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

// import
class menuCatView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.menu');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerRender(handler) {
    const menuItemBtns = document.querySelectorAll('.menu-item__button');

    menuItemBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn));
    });
  }

  getMenuItems() {
    return document.querySelectorAll('.modal-menu-item');
  }

  getMenuItem(item) {
    return item.querySelector('.menu-sidebar__item__qty-num');
  }

  getMenuItemText(item) {
    return item.querySelector('.menu-sidebar__item__qty-num').textContent;
  }

  setBtnEffect(btn) {
    setTimeout(function () {
      btn.innerHTML = 'Added';
      btn.style.backgroundColor = '#fffb2b';
      btn.style.color = '#000';
      btn.disabled = true;
    }, 100);

    setTimeout(function () {
      btn.innerHTML = 'Add';
      btn.style.backgroundColor = '#1f1d2b';
      btn.style.color = '#fffb2b';
      btn.disabled = false;
    }, 800);
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
    let markup = [];

    // markup.push(
    //   `<h3 class="heading--tertiary menu-items__title">Choose Dishes</h3>`
    // );
    // for each category load corresponsding items markup
    for (const { id: categoryId, active } of Object.values(
      this.#data.menuCategories
    )) {
      markup.push(
        ` 
        <div class="menu-items ${
          active ? '' : 'hidden'
        }" data-category-id="${categoryId}">
       `
      );

      for (const [
        key,
        { catgId: productCatgId, name, price, qty, img, special_deal },
      ] of Object.entries(this.#data.menuItems)) {
        if (productCatgId === categoryId) {
          markup.push(`<div class="menu-item" data-item-id="${key}">
         <!-- <div class="menu-item__image"><img src="/${img}"></div> -->
                          <div class="menu-item__image"><img src="${this._loadImg(
                            img
                          )}"></div>
                          <div class="menu-item__details">
                            <div class="menu-item__info"><img src="${infoIcon}"></div>
                            <h3 class="heading--tertiary menu-item__title">${name}</h3>
                            <span class="menu-item__price">$ ${price}</span>
                            <button class="${
                              special_deal
                                ? 'menu-item__button-special'
                                : 'menu-item__button'
                            }"  data-item-id="${key}">Add</button>
                          </div>
                      </div>`);
        }
      }
      markup.push('</div>');
    }

    return markup.join(' ');
  }
}

export default new menuCatView();
