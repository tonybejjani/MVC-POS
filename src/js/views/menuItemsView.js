/** @format */
// import infoIcon from 'url:../src/img/icon/info-icon.png';

class menuCatView {
  #parentElement = document.querySelector('.menu');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    // this._clear();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  // _clear() {
  //   this.#parentElement.innerHTML = '';
  // }

  _generateMarkup() {
    let markup = [];

    // for each category load corresponsding items markup
    for (const { id: categoryId, active } of Object.values(
      this.#data.menuCategories
    )) {
      markup.push(
        `<div class="menu--items ${
          active ? '' : 'hidden'
        }" data-category-id="${categoryId}">`
      );

      for (const [
        key,
        { catgId: productCatgId, name, price, qty, img, special_deal },
      ] of Object.entries(this.#data.menuItems)) {
        if (productCatgId === categoryId) {
          markup.push(`<div class="menu--item" data-item-id="${key}">
                          <div class="menu--item__image"><img src="${img}"></div>
                          <div class="menu--item__details">
                            
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
}

export default new menuCatView();
