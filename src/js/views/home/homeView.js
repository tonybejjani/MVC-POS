/** @format */
class homeView {
  _parentElement;

  render() {
    this._parentElement = document.querySelector('.main');

    this._clear();
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _getPageContainerEl() {
    return document.querySelector('.home');
  }

  hidePage() {
    const pageContainerEl = this._getPageContainerEl();
    pageContainerEl.classList.add('hidden');
  }

  showPage() {
    const pageContainerEl = this._getPageContainerEl();
    pageContainerEl.classList.remove('hidden');
  }

  _generateMarkup() {
    return `
    <div class="home"></div>`;
  }
}

export default new homeView();
