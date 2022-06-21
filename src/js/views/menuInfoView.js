/** @format */
class menuInfoView {
  #parentElement = document.querySelector('.info');
  #data;

  render(data) {
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <div class="info__logo"><img src="${this.#data.logo}"></div>
    <div class="info__title">${this.#data.title}</div>
    <div class="info__date">${this.#data.date}</div>`;
  }
}

export default new menuInfoView();
