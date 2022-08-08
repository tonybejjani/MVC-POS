/** @format */
import View from './View.js';

class mainView extends View {
  _parentElement = document.querySelector('.container');

  _generateMarkup() {
    return `
    <main class="main"></main>`;
  }
}

export default new mainView();
