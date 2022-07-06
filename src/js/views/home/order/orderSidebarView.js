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
      '.curr-order__transaction-pay-btn'
    );
    payBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn, payBtns));
    });
  }

  updateOrderPrice(total) {
    const totalEl = document.querySelector(
      '.curr-order__transaction-total-price span'
    );
    totalEl.textContent = Number(total).toFixed(2);
  }

  getSubmitBtnEl() {
    return document.querySelector('.curr-order__footer-submit-btn');
  }

  disablePayMethod() {
    const payMethodBtn = document.querySelectorAll(
      '.curr-order__transaction-pay-btn'
    );

    payMethodBtn.forEach((btn) => {
      btn.classList.remove('curr-order__transaction-pay-btn--active');
    });
  }

  removePayMethod() {
    const payMethodBtn = document.querySelectorAll(
      '.curr-order__transaction-pay-btn'
    );
    this.#btnPayIsClicked = false;

    payMethodBtn.forEach((btn) => {
      btn.classList.remove('curr-order__transaction-pay-btn--active');
    });
  }

  triggerPayMethod() {
    const payMethodBtn = document.querySelector(
      '.curr-order__transaction-pay__credit'
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
      '.curr-order__items .curr-order__items-details'
    ).innerHTML = '';
  }

  addHandlertogglePanel() {
    const panelBtnEl = document.querySelector('.curr-order__toggle-btn');
    const panelEl = document.querySelector('.curr-order');

    panelBtnEl.addEventListener('click', function () {
      panelEl.classList.toggle('curr-order__toggle-panel');
    });
  }

  _generateMarkup() {
    return `
    <div class="curr-order">
      <div class="curr-order__toggle-btn">Check Out</div>
      <div class="curr-order__heading">
        <div class="curr-order__heading-client-info">
          <div><label>Order #</label><input type="text" placeholder="123" class="curr-order-number"></div>
        </div>
        <!--<div class="curr-order__heading-tab">
          <p class="curr-order__heading-tab-item">Item</p>
          <p class="curr-order__heading-tab-price">Price</p>
          <p class="curr-order__heading-tab-qty">Qty</p>
        </div>-->
      </div>
      <div class="curr-order__items">
        <div class="curr-order__items-container">
          <div class="curr-order__items-details"></div>
        </div>
      </div>   
      <div class="curr-order__transaction">
            <div class="curr-order__transaction-total">
            <p class="curr-order__transaction-total-title">Sub total</p>
            <p class="curr-order__transaction-total-price">$ <span>0.00</span></p>
          </div>
          <div class="curr-order__transaction-note">
            <input type="text" placeholder=" Order Note...">
          </div>
          <div class="curr-order__transaction-pay">
            <button type="button" class="curr-order__transaction-pay-btn curr-order__transaction-pay__credit" >Credit Card</button>
            <button type="button" class="curr-order__transaction-pay-btn curr-order__transaction-pay__cash " >Cash</button>
          </div>
        </div>
       
        <div class="curr-order__footer">
          <button type="button" class="curr-order__footer-save-btn hidden">Save Order</button>
          <button type="button" class="curr-order__footer-submit-btn disabled" >Submit Order</button>
        </div>   
    </div> `;
  }
}

export default new orderSidebarView();
