/** @format */

import sprite from 'url:../../../../img/icon/sprite.svg';
class menuInfoView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.info');
    this.#data = data;

    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerSearch(handler) {
    const searchTextEl = document.querySelector('.info__search-text');

    searchTextEl.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        handler(searchTextEl.value);
      }
    });
  }

  _generateMarkup() {
    return `
      <h1 class="heading--primary info__title">${this.#data.title}</h1>
      <form action="#" class="info__search">
      <input type="text" class="info__search-text" placeholder="search menu"></input>
        <button class="info__search-btn">
          <svg class="info__search-icon">
          <use xlink:href="${sprite + '#icon-Search'}"></use>
          </svg>
        </button>
 
      </form>
      <div class="info__date">${this.#data.date}</div>
    <!--<div class="info__event>
      <label for="event">Event:</label>
      <select name="event" id="event">
        <option value="${this.#data.event}">${this.#data.event}</option>
      </select>
    </div>-->`;
  }
}

export default new menuInfoView();
