/** @format */

export default class View {
  render(pos) {
    console.log(this._parentElement);
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML(pos, markup);
  }
}
