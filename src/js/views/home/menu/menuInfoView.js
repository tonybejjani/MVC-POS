/** @format */
class menuInfoView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.info');
    this.#data = data;
    console.log(this.#data);
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <!-- <div class="info__title">${this.#data.title}</div> -->
    <div class="info__event">${this.#data.event}</div>
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
