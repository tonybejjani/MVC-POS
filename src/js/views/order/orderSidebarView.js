/** @format */
class orderSidebarView {
  #parentElement = document.querySelector('.main');
  #data;

  render(data) {
    this.#data = data;
    console.log(this.#parentElement);
    const markup = this._generateMarkup();
    this.#parentElement.insertAdjacentHTML('beforeend', markup);
  }

  updateOrderPrice(total) {
    const totalEl = document.querySelector('.order-total--price span');
    totalEl.textContent = Number(total).toFixed(2);
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
        <div class="order-total">
          <p class="order-total--title">Sub total</p>
          <p class="order-total--price">$ <span>0.00</span></p>
        </div>
                <!-- <div class="order--item__note">
          <input type="text" placeholder="Order Note...">
        </div> -->
        <div class="order-footer">
          <button type="button" class="order--list__save hidden">Save Order</button>
          <button type="button" class="order--list__submit">Submit Order</button>
        </div>

      </div>      
    </div> `;
  }
}

export default new orderSidebarView();
