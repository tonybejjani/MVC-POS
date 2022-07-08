/** @format */
import logoImg from 'url:../../../../src/img/general/logo.png';

class navbarView {
  #parentElement = document.body;
  #data;

  render() {
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  addHandlerRender(handler) {
    window.addEventListener('hashchange', handler);
  }

  activateNavIcon(hash) {
    const links = document.querySelectorAll('.navbar__link');

    links.forEach((link) => {
      // clear active menu class of prev icon
      if (link.classList.contains('navbar__link--active')) {
        link.classList.remove('navbar__link--active');
      }

      //assign active menu class to icon clicked
      if (link.getAttribute('href').slice(1) === hash) {
        link.classList.add('navbar__link--active');
      }
    });
  }

  setCounterVal(count) {
    const counterEl = document.querySelector('.navbar__link-cook-counter');
    counterEl.classList.remove('hidden');
    counterEl.textContent = String(count);
  }
  _generateMarkup() {
    return `
    <div class="navbar">
      <div class="navbar__logo"><img src="${logoImg}" crossorigin>
      </div>
      <nav class="navbar__links">
        
        <a class="navbar__link navbar__link-home navbar__link--active" href="#home"></a>
        <a class="navbar__link navbar__link-cook " href="#orders"><span class="navbar__link-cook-counter hidden"></span></a>
        <a class="navbar__link navbar__link-dash " href="#dashboard"></a>
        <a class="navbar__link navbar__link-settings " href="#settings"></a>
        <a class="navbar__link navbar__link-logout " href="#logout"></a>
      </nav>
    </div>`;
  }
}

export default new navbarView();
