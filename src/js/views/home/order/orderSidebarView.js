/** @format */
class orderSidebarView {
  #parentElement;
  #data;
  #btnPayIsClicked;

  render(data) {
    this.#data = data;
    this.#parentElement = document.querySelector('.home');
    this.#btnPayIsClicked = false;
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerPayMethod(handler) {
    const payBtns = document.querySelectorAll(
      '.menu-sidebar__transaction-pay-btn'
    );
    payBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn, payBtns));
    });
  }

  updateOrderPrice(total) {
    const totalEl = document.querySelector(
      '.menu-sidebar__transaction-total-price span'
    );
    totalEl.textContent = Number(total).toFixed(2);
  }

  getSubmitBtnEl() {
    return document.querySelector('.menu-sidebar__footer-submit-btn');
  }

  disablePayMethod() {
    const payMethodBtn = document.querySelectorAll(
      '.menu-sidebar__transaction-pay-btn'
    );

    payMethodBtn.forEach((btn) => {
      btn.classList.remove('menu-sidebar__transaction-pay-btn--active');
    });
  }

  removePayMethod() {
    const payMethodBtn = document.querySelectorAll(
      '.menu-sidebar__transaction-pay-btn'
    );
    this.#btnPayIsClicked = false;

    payMethodBtn.forEach((btn) => {
      btn.classList.remove('menu-sidebar__transaction-pay-btn--active');
    });
  }

  triggerPayMethod() {
    const payMethodBtn = document.querySelector(
      '.menu-sidebar__transaction-pay__credit'
    );

    payMethodBtn.click();
    this.#btnPayIsClicked = true;
  }

  checkBtnPayIsClicked() {
    return this.#btnPayIsClicked;
  }

  addHandlerSubmitOrder(handler) {
    const submitBtn = this.getSubmitBtnEl();
    submitBtn.addEventListener('click', handler);
  }

  clearOrders() {
    document.querySelector(
      '.menu-sidebar__items .menu-sidebar__items-details'
    ).innerHTML = '';
  }

  togglePanelEvent() {
    const panelBtnEl = document.querySelector('.menu-sidebar__toggle-btn');
    panelBtnEl.click();
  }

  addHandlertogglePanel() {
    const panelBtnEl = document.querySelector('.menu-sidebar__toggle-btn');
    const panelEl = document.querySelector('.menu-sidebar');

    panelBtnEl.addEventListener('click', function () {
      panelEl.classList.toggle('menu-sidebar__toggle-panel');
    });
  }

  _generateMarkup() {
    return `
    <div class="menu-sidebar">
      <span class="menu-sidebar__toggle-btn">Check Out</span>
      <div class="menu-sidebar__heading">
        <div class="menu-sidebar__heading-client-info">
          <div><label>Order #</label><input type="text" placeholder="123" class="menu-sidebar-number"></div>
        </div>
        <!--<div class="menu-sidebar__heading-tab">
          <p class="menu-sidebar__heading-tab-item">Item</p>
          <p class="menu-sidebar__heading-tab-price">Price</p>
          <p class="menu-sidebar__heading-tab-qty">Qty</p>
        </div>-->
      </div>
      <div class="menu-sidebar__items">
        <div class="menu-sidebar__items-container">
          <div class="menu-sidebar__items-details"></div>
        </div>
      </div>   
      <div class="menu-sidebar__transaction">
            <div class="menu-sidebar__transaction-total">
            <p class="menu-sidebar__transaction-total-title">Sub total</p>
            <p class="menu-sidebar__transaction-total-price">$ <span>0.00</span></p>
          </div>
          <div class="menu-sidebar__transaction-note">
            <textarea  rows="1" placeholder=" Order Note..."></textarea>
          </div>
          <div class="menu-sidebar__transaction-pay">
            <button type="button" class="menu-sidebar__transaction-pay-btn menu-sidebar__transaction-pay__credit" >Credit Card</button>
            <button type="button" class="menu-sidebar__transaction-pay-btn menu-sidebar__transaction-pay__cash " >Cash</button>
          </div>
        </div>
       
        <div class="menu-sidebar__footer">
          <button type="button" class="menu-sidebar__footer-save-btn hidden">Save Order</button>
          <button type="button" class="menu-sidebar__footer-submit-btn disabled" >Submit Order</button>
        </div>   
    </div> `;
  }
}

export default new orderSidebarView();
