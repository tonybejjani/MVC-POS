/** @format */
class navbarView {
  #parentElement = document.body;
  #data;

  render() {
    console.log(this.#parentElement);
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    return `
    <div class="navbar">
      <div class="navbar__logo"></div>
      <div class="navbar__links">
        <a class="navbar__link navbar__link-home navbar__link--active" href="#"></a>
        <a class="navbar__link navbar__link-cook " href="#"></a>
        <a class="navbar__link navbar__link-dash " href="#"></a>
        <a class="navbar__link navbar__link-settings " href="#"></a>
        <a class="navbar__link navbar__link-logout " href="#"></a>
      </div>
    </div>`;
  }
}

export default new navbarView();
