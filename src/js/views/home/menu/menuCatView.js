/** @format */
class menuCatView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.menu--navbar');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  activateMenuCat() {
    const menuCatItems = document.querySelectorAll('.menu--items');
    const menuCatLinks = document.querySelectorAll('.menu--navbar__link');

    menuCatLinks.forEach((catLink) =>
      catLink.addEventListener('click', function () {
        if (catLink.closest('li').classList.contains('menu--navbar__active'))
          return;

        menuCatLinks.forEach((link) => {
          link.closest('li').classList.remove('menu--navbar__active');

          if (link.dataset.categoryId === catLink.dataset.categoryId) {
            link.closest('li').classList.add('menu--navbar__active');
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
      markup.push(`<li class="${active ? 'menu--navbar__active' : ''}">
          <a class="menu--navbar__link" data-category-id="${categoryId}">${name}</a>
        </li>`);
    }

    return markup.join('');
  }
}

export default new menuCatView();
