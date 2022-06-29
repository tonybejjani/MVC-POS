/** @format */
import trash from 'url:../../../../img/icon/trash.png';
import edit from 'url:../../../../img/icon/edit.png';

class orderSpecialBoxView {
  #parentElement;
  #data;

  render(data) {
    this.#parentElement = document.querySelector('.order__details');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  checkSpecialEditId(totalPcs, specialMixPrice, specialEditId) {
    const specialContainerItems = document.querySelectorAll(
      `.special-container[data-special-item-id='${specialEditId}'] .order--item`
    );

    specialEditId
      ? specialContainerItems.forEach((item) => {
          item.remove();
        })
      : ((specialEditId = 'id' + new Date().getTime()),
        this.render({
          totalPcs,
          specialMixPrice,
          specialEditId,
        }));

    return specialEditId;
  }

  _generateMarkup() {
    return `<div class="special-container" data-special-item-id="${
      this.#data.specialEditId
    }">
              <div class="special-container--header">
              
                <h1>MIX ${this.#data.totalPcs} PCS FOR $ ${
      this.#data.specialMixPrice
    }</h1> 
              
               <div class="order--item__remove" data-special-item-id="${
                 this.#data.specialEditId
               }">
                <img src="${trash}#trash">
               </div>
               <div class="order--item__edit" data-special-item-id="${
                 this.#data.specialEditId
               }">
                <img src="${edit}">
               </div>               
              </div>
            
            </div>`;
  }
}

export default new orderSpecialBoxView();
