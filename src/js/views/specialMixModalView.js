/** @format */

class specialMixModalView {
  #parentElement = document.querySelector('.menu');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerRender(handler) {
    const menuItemBtns = document.querySelectorAll('.menu--item__button');
    menuItemBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn));
    });
  }

  _generateMarkup() {
    const menuSpecialBtnItemId = Number(
      document
        .querySelector('.menu--special--item__button')
        .getAttribute('data-item-id')
    );
    const totalPcs = this.#data[menuSpecialBtnItemId].qty;
    const specialBtnCatId = Number(
      document
        .querySelector('.menu--special--item__button')
        .closest('.menu--items')
        .getAttribute('data-category-id')
    );
    let markup = [];

    markup.push(`<div class="modal hidden" data-category-id="1">
                      <button class="close-modal">×</button>
                      <h1 class="special-menu--header">Select <span>${totalPcs}</span> pcs:</h1>
                      <div class="special-menu--items">`);

    for (const [key, { catgId, name, img, special_deal }] of Object.entries(
      this.#data
    )) {
      if (catgId === specialBtnCatId && !special_deal)
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

export default new specialMixModalView();
