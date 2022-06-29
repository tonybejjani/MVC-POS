/** @format */
class navbarView {
  #parentElement = document.body;
  #data;

  render() {
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _generateMarkup() {
    return `
    <div class="main"></div>`;
  }
}

export default new navbarView();
