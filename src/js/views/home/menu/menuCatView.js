/** @format */
import menuSearchView from './menuSearchView.js';
class menuCatView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.menu-tabs');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _setTabsHeader() {}

  activateMenuCat() {
    const menuCatItems = document.querySelectorAll('.menu-items');
    const menuCatLinks = document.querySelectorAll('.menu-tabs__link');

    menuCatLinks.forEach((catLink) =>
      catLink.addEventListener('click', function () {
        // remove existing search results
        const searchedItems = document.querySelector('.menu-items__search');
        if (searchedItems) {
          searchedItems.remove();
        }

        //change back the header
        const header = document.querySelector('.menu-items__header');
        header.textContent = 'Choose Dishes';

        // if the category tab is already active, stop execution
        if (catLink.classList.contains('menu-tabs__active')) return;

        menuCatLinks.forEach((link) => {
          link.classList.remove('menu-tabs__active');

          if (link.dataset.categoryId === catLink.dataset.categoryId) {
            link.classList.add('menu-tabs__active');
          }
        });

        menuCatItems.forEach((catItem) => {
          catItem.classList.add('hidden');

          if (catLink.dataset.categoryId === catItem.dataset.categoryId) {
            catItem.classList.remove('hidden');
          }
        });
      })
    );
  }

  _generateMarkup() {
    let markup = [];

    for (const { id: categoryId, name, active } of Object.values(this.#data)) {
      markup.push(`<li>
          <a class="menu-tabs__link ${
            active ? 'menu-tabs__active' : ''
          }" data-category-id="${categoryId}">${name}</a>
        </li>`);
    }

    return markup.join('');
  }
}

export default new menuCatView();
