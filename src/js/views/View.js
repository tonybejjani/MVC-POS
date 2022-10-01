/** @format */

export default class View {
  render(pos) {
    const markup = this._generateMarkup();

    this._parentElement.insertAdjacentHTML(pos, markup);
  }
}
