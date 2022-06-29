/** @format */
class homeView {
  #parentElement;
  #data;

  render() {
    this.#parentElement = document.querySelector('.main');
    this._clear();
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this.#parentElement.innerHTML = '';
  }

  _generateMarkup() {
    return `
    <div class="home"></div>`;
  }
}

export default new homeView();
