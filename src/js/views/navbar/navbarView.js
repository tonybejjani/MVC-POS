/** @format */
import logoImg from 'url:../../../../src/img/general/logo.png';
import sprite from '../../../img/icon/sprite.svg';
import View from '../View.js';

class navbarView extends View {
  _parentElement = document.querySelector('.container');

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
    const counterEl = document.querySelector(
      '.navbar__link-notification-counter'
    );
    counterEl.classList.remove('hidden');
    counterEl.textContent = String(count);
  }
  _generateMarkup() {
    return `
    <div class="navbar">
      <div class="navbar__logo"><img src="${logoImg}">
      </div>
      <nav class="navbar__links">
        
        <a class="navbar__link navbar__link-home navbar__link--active" href="#home">
          <svg class="navbar__link-icon"> 
            <use xlink:href="${sprite + '#icon-Home'}"></use>
          </svg>
        </a>
        <a class="navbar__link navbar__link-notification " href="#orders"><span class="navbar__link-notification-counter hidden"></span>
          <svg class="navbar__link-icon"> 
            <use xlink:href="${sprite + '#icon-Notification'}"></use>
          </svg>
        </a>
        <a class="navbar__link navbar__link-dash " href="#dashboard">
          <svg class="navbar__link-icon"> 
            <use xlink:href="${sprite + '#icon-Dashboard'}"></use>
          </svg>
        </a>
        <a class="navbar__link navbar__link-settings " href="#settings">
          <svg class="navbar__link-icon"> 
            <use xlink:href="${sprite + '#icon-Setting'}"></use>
          </svg>
      </a>
        <a class="navbar__link navbar__link-logout " href="#logout">
          <svg class="navbar__link-icon"> 
            <use xlink:href="${sprite + '#icon-Log-Out'}"></use>
          </svg>
        </a>

      </nav>
    </div>`;
  }
}

export default new navbarView();
