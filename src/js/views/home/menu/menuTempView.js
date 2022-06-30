/** @format */
class menuTempView {
  #parentElement;
  #data;

  render(data) {
    this.#data = data;
    this.#parentElement = document.querySelector('.home');
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
      <div class="menu">
        <div class="info"></div>
        <ul class="menu-navbar"></ul>
      </div>`;
  }
}

export default new menuTempView();
