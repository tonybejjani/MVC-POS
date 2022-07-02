/** @format */
class navbarView {
  #parentElement;
  #data;

  render() {
    this.#parentElement = document.querySelector('.main');
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
    return `
    <div class = "orders"> This is the Orders View</div>`;
  }
}

export default new navbarView();
