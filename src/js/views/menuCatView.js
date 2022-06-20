/** @format */
class menuCatView {
  #parentElement = document.querySelector('.menu--navbar');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    // this._clear();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  // _clear() {
  //   this.#parentElement.innerHTML = '';
  // }

  _generateMarkup() {
    let markup = [];

    for (const { id: categoryId, name, active } of Object.values(this.#data)) {
      markup.push(`<li class="${active ? 'menu--navbar__active' : ''}">
          <a class="menu--navbar__link" data-category-id="${categoryId}">${name}</a>
        </li>`);
    }

    return markup.join('');
  }
}

export default new menuCatView();
