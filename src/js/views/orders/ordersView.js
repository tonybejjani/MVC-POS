/** @format */
class navbarView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.main');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _getPageParentEl() {
    return document.querySelector('.orders');
  }

  hidePage() {
    const pageParentEl = this._getPageParentEl();
    console.log(pageParentEl);
    pageParentEl.classList.add('hidden');
  }

  showPage() {
    const pageParentEl = this._getPageParentEl();
    pageParentEl.classList.remove('hidden');
  }

  // addHandlerRender(handler) {
  //   const menuItemBtns = document.querySelectorAll('.menu-item__link');

  //   menuItemBtns.forEach((btn) => {
  //     btn.addEventListener('click', handler.bind(this, btn));
  //   });
  // }

  _generateMarkup() {
    let markup = [];

    markup.push('<div class = "orders">');

    console.log(this.#data);
    markup.push(`
                  <div class = "orders__heading">
                    <h1 class="heading--primary">Orders</h1>
                    <h3 class="heading--tertiary">Tuesday 2 Nov, 2022</h3>
                  </div>
                  <div class="order-item">
                    <h3 class="order-item__num">14</h3>
                    <h3 class="order-item__status">Completed</h3>
                  </div>
                `);

    markup.push('</div>');

    return markup.join('');
  }
}

export default new navbarView();
