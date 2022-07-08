/** @format */
import trash from 'url:../../../../img/icon/trash.png';
import edit from 'url:../../../../img/icon/edit.png';

class orderSpecialBoxView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector(
      '.menu-sidebar__items-details'
    );
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  checkSpecialEditId(totalPcs, specialMixPrice, specialEditId) {
    const specialContainerItems = document.querySelectorAll(
      `.menu-sidebar__items-special-container[data-special-item-id='${specialEditId}'] .menu-sidebar__item`
    );

    specialEditId
      ? specialContainerItems.forEach((item) => {
          item.remove();
        })
      : ((specialEditId = 'mix' + new Date().getTime()),
        this.render({
          totalPcs,
          specialMixPrice,
          specialEditId,
        }));

    return specialEditId;
  }

  _generateMarkup() {
    return `<div class="menu-sidebar__items-special-container" data-special-item-id="${
      this.#data.specialEditId
    }">
              <div class="menu-sidebar__items-special-container__header">
              
                <h3 class="menu-sidebar__items-special-container__header-heading">MIX ${
                  this.#data.totalPcs
                } PCS FOR $ ${this.#data.specialMixPrice}</h3> 
              
               <div class="menu-sidebar__item__remove" data-special-item-id="${
                 this.#data.specialEditId
               }">
                <img src="${trash}#trash" crossorigin>
               </div>
               <div class="menu-sidebar__item__edit" data-special-item-id="${
                 this.#data.specialEditId
               }">
                <img src="${edit}" crossorigin>
               </div>               
              </div>
            
            </div>`;
  }
}

export default new orderSpecialBoxView();
