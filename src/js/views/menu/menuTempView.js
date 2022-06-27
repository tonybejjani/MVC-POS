/** @format */
class menuTempView {
  #parentElement = document.querySelector('.main');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <div class="menu">
    <div class="info"></div>
    <ul class="menu--navbar"></ul>
  </div> `;
  }
}

export default new menuTempView();
