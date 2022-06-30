/** @format */
class navbarView {
  #parentElement;
  #data;

  render() {
    this.#parentElement = document.querySelector('.main');
    this._hidePage();
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _hidePage() {
    this.#parentElement.innerHTML = '';
  }

  // addHandlerRender(handler) {
  //   const menuItemBtns = document.querySelectorAll('.menu-item__button');

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
