/** @format */
class menuInfoView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.info');
    this.#data = data;

    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <h1 class="heading--primary info__title">${this.#data.title}</h1>
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
