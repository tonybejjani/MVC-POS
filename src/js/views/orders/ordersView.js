/** @format */

import dragula from '../../../../node_modules/dragula/dragula.js';

class navbarView {
  #parentElement;
  #data;
  #moving = null;

  render(data) {
    this.#parentElement = document.querySelector('.main');
    this.#data = data;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  _getPageParentEl() {
    return document.querySelector('.orders');
  }

  hidePage() {
    const pageParentEl = this._getPageParentEl();
    pageParentEl.classList.add('hidden');
  }

  showPage() {
    const pageParentEl = this._getPageParentEl();
    pageParentEl.classList.remove('hidden');
  }

  // addHandlerRender(handler) {
  //   const menuItemBtns = document.querySelectorAll('.menu-item__link');

  //   menuItemBtns.forEach((btn) => {
  //     btn.addEventListener('click', handler.bind(this, btn));
  //   });
  // }

  // eventHandlerDraggable() {
  //   const movableEl = document.querySelector('.movable-element');

  //   movableEl.addEventListener('mousedown', this._pickup.bind(this));
  //   movableEl.addEventListener('touchstart', this._pickup.bind(this));
  //   movableEl.addEventListener('mousemove', this._move.bind(this));
  //   movableEl.addEventListener('touchmove', this._move.bind(this));
  // }

  // _pickup(e) {
  //   e.preventDefault();
  //   this.#moving = e.target;

  //   let heightEl = this.#moving.clientHeight;
  //   let widthEl = this.#moving.clientWidth;

  //   // this.#moving.style.height = this.#moving.clientHeight;
  //   // this.#moving.style.width = this.#moving.clientWidth;

  //   this.#moving.style.height = String(heightEl + 'px');
  //   this.#moving.style.width = String(widthEl + 'px');

  //   this.#moving.style.position = 'fixed';
  // }

  // _move(e) {
  //   e.preventDefault();
  //   if (this.#moving) {
  //     if (e.clientX) {
  //       console.log(e.clientX);
  //       // mousemove
  //       this.#moving.style.left =
  //         String(e.clientX - this.#moving.clientWidth / 2) + 'px';
  //       this.#moving.style.top =
  //         String(e.clientY - this.#moving.clientHeight / 2) + 'px';
  //     } else {
  //       // touchmove - assuming a single touchpoint
  //       this.#moving.style.left =
  //         String(e.changedTouches[0].clientX - this.#moving.clientWidth / 2) +
  //         'px';
  //       this.#moving.style.top =
  //         String(e.changedTouches[0].clientY - this.#moving.clientHeight / 2) +
  //         'px';
  //     }
  //   }
  // }

  makeDraggable() {
    const containers = [
      document.querySelector('.orders__prepare'),
      document.querySelector('.orders__pending'),
      document.querySelector('.orders__complete'),
    ];

    const drake = dragula(containers);

    console.log(drake);
  }

  _generateMarkup() {
    let markup = [];

    markup.push('<div class = "orders">');

    // console.log(this.#data);
    markup.push(`
                  <!--<div class = "orders__heading">
                    <h1 class="heading--primary">Orders</h1>
                    <h3 class="heading--tertiary">Tuesday 2 Nov, 2022</h3>
                  </div>
                  <div class="order-item">
                    <h3 class="order-item__num">14</h3>
                    <h3 class="order-item__status">Completed</h3>
                  </div> -->


                  <div class="orders__container">
                    <div class="orders__prepare">
                        <div class="orders__item movable-element movable-element1">1</div>
                        <div class="orders__item movable-element movable-element2">2</div>
                        <div class="orders__item movable-element movable-element3">3</div>
                    </div>
          
                    <div class="orders__pending"></div>
                    <div class="orders__complete"></div>
                 </div>
                `);

    markup.push('</div>');

    return markup.join('');
  }
}

export default new navbarView();
