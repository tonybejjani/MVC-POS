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
    <main class="main"></main>`;
  }
}

export default new navbarView();
