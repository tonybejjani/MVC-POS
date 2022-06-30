/** @format */
class orderSidebarView {
  #parentElement;
  #data;
  #btnPayIsClicked = false;

  render(data) {
    this.#data = data;
    this.#parentElement = document.querySelector('.home');
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  addHandlerPayMethod(handler) {
    const payBtns = document.querySelectorAll('.order-pay-btn');
    payBtns.forEach((btn) => {
      btn.addEventListener('click', handler.bind(this, btn, payBtns));
    });
  }

  updateOrderPrice(total) {
    const totalEl = document.querySelector('.order-total--price span');
    totalEl.textContent = Number(total).toFixed(2);
  }

  getSubmitBtnEl() {
    return document.querySelector('.order--list__submit');
  }

  removePayMethod() {
    const payMethodBtn = document.querySelectorAll('.order-pay-btn');
    this.#btnPayIsClicked = false;

    payMethodBtn.forEach((btn) => {
      console.log(btn);
      btn.classList.remove('order-pay-btn--active');
    });
  }

  triggerPayMethod() {
    const payMethodBtn = document.querySelector('.order-pay__credit');

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
    document.querySelector('.order-container .order__details').innerHTML = '';
  }

  _generateMarkup() {
    return `
    <div class="order-sidebar">
      <div class="heading">
        <div class="client-info">
          <div><label>Order #</label><input type="text" placeholder="123" class="order__number"></div>
        </div>
        <div class="order--heading">
          <p class="order--heading__item">Item</p>
          <p class="order--heading__price">Price</p>
          <p class="order--heading__quantity">Qty</p>
        </div>
      </div>
      <div class="order-container">
        <div class="order">
          <div class="order__details"></div>
        </div>
        <div class="order-transaction">
            <div class="order-total">
            <p class="order-total--title">Sub total</p>
            <p class="order-total--price">$ <span>0.00</span></p>
          </div>
          <div class="order-note">
            <input type="text" placeholder=" Order Note...">
          </div>
          <div class="order-pay">
            <button type="button" class="order-pay-btn order-pay__credit" >Credit Card</button>
            <button type="button" class="order-pay-btn order-pay__cash " >Cash</button>
          </div>
        </div>
       
        <div class="order-footer">
          <button type="button" class="order--list__save hidden">Save Order</button>
          <button type="button" class="order--list__submit disabled" >Submit Order</button>
        </div>

      </div>      
    </div> `;
  }
}

export default new orderSidebarView();
