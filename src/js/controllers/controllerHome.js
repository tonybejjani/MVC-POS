/** @format */

// Data
import * as model from '../model.js';

// Views Home Page
import homeView from '../views/home/homeView.js';
import menuTempView from '../views/home/menu/menuTempView.js';
import menuInfoView from '../views/home/menu/menuInfoView.js';
import menuCatView from '../views/home/menu/menuCatView.js';
import menuItemsView from '../views/home/menu/menuItemsView.js';
import menuSpecialModalView from '../views/home/menu/menuSpecialModalView.js';
import orderSidebarView from '../views/home/order/orderSidebarView.js';
import orderItemView from '../views/home/order/orderItemView.js';
import orderSpecialBoxView from '../views/home/order/orderSpecialBoxView.js';
import orderSpecialItemView from '../views/home/order/orderSpecialItemView.js';

// View Navbar Component
import navbarView from '../views/navbar/navbarView.js';

class controllerHome {
  // render views associated to "Home Page" hash
  renderHome() {
    homeView.render();
    menuTempView.render();
    orderSidebarView.render();
    menuInfoView.render(model.state.info);
    menuCatView.render(model.state.menuCategories);
    menuItemsView.render(model.state);
    menuCatView.activateMenuCat();
    menuItemsView.addHandlerRender(this._controlOrderItemForm.bind(this));
    menuSpecialModalView.render(model.state.menuItems);
    menuSpecialModalView.addModalEventListeners();
    menuSpecialModalView.addHandlerAddOrder(
      this._controlOrderSpecialMix.bind(this)
    );
    orderSidebarView.addHandlerPayMethod(this._controlPayMethod.bind(this));
    orderSidebarView.addHandlertogglePanel();
  }

  _controlOrderItemForm(btn) {
    // set btn El global in view
    orderItemView.setBtnEl(btn);

    // The items selected individually from the menu (meaning not in a "special mix")
    // are not special Items === false
    const specialItem = false;

    // Retrieve data from state of item
    const { name, price, qty, img } =
      model.state.menuItems[orderItemView.getBtnId()];
    const totalPrice = price;
    const itemId = orderItemView.getBtnId();
    const currItemLog = model.state.currentOrderLog[itemId];

    // pack all data
    const data = {
      itemId,
      name,
      price,
      qty,
      img,
      specialItem,
      totalPrice,
    };

    // On selecting an item, check if itemId already exists in current Order List
    // 1- if YES: update Qty & total price
    if (currItemLog) {
      //update qty and total of item in state
      currItemLog.qty++;
      currItemLog.totalPrice = currItemLog.price * currItemLog.qty;

      //update qty & total of item in UI
      orderItemView.updateItemTotalPrice(itemId, currItemLog);

      // 2- if NO: push item to state log
    } else {
      model.state.currentOrderLog[itemId] = data;

      // Display the order item in the UI
      orderItemView.render(data);

      // Add remove item event
      orderItemView.addHandlerRender(
        this._controlOrderItemRemove.bind(this, itemId, false)
      );
    }

    // Update total order price in temp view
    this._controlOrderPrice();

    // Choose user default Pay Method
    if (!orderSidebarView.checkBtnPayIsClicked())
      orderSidebarView.triggerPayMethod();

    // Enable Submit Order Btn if state is not empty
    this._controlSubmitOrder();
  }

  _controlPayMethod(btnClick, btns) {
    // remove all active classes
    btns.forEach((btn) =>
      btn.classList.remove('curr-order__transaction-pay-btn--active')
    );

    //toggle class
    btnClick.classList.add('curr-order__transaction-pay-btn--active');

    //update state
    let payCredit = btnClick.className.includes('credit');
    let payMethod;

    payCredit ? (payMethod = 'CR') : (payMethod = 'C');
    model.state.currentOrderLog.payMethod = payMethod;
  }

  _controlSubmitOrder() {
    const submitBtn = orderSidebarView.getSubmitBtnEl();

    //check if order contains items by checking total price of Order in state
    const total = this._checkTotalState();

    // enable btn submit if total is positive
    if (total > 0) {
      submitBtn.classList.remove('disabled');

      // add save order event handler on click
      orderSidebarView.addHandlerSubmitOrder(this._controlSaveOrder.bind(this));
    } else {
      // disable submit btn if order had no items
      submitBtn.classList.add('disabled');
    }
  }

  _controlSaveOrder() {
    //  if currentOrderLog has no items, return.
    const total = this._checkTotalState();

    // guard
    if (total <= 0) return;

    // make a deep copy of currentOrder
    const newOrder = JSON.parse(JSON.stringify(model.state.currentOrderLog));

    // push new order to state
    model.state.orders.push(newOrder);

    // clear currentLog state
    model.state.currentOrderLog = {};

    // clear sideOrder UI
    orderSidebarView.clearOrders();
    console.log('orders:', model.state.orders);

    // remove Pay method tick
    orderSidebarView.removePayMethod();

    // reset Total
    this._controlOrderPrice();

    // disable Submit Order Btn
    this._controlSubmitOrder();

    // increment order counter
    navbarView.setCounterVal(model.state.orders.length);
  }

  _controlOrderSpecialMix(totalPcs, specialMixPrice) {
    // 1- add the special Mix item to state and UI
    const specialEditId = this._controlOrderSpecialItemForm(
      totalPcs,
      specialMixPrice
    );

    // 2- setEditId, totalPcs and specialMixPrice globals in the view
    menuSpecialModalView.setSpecialEditId(specialEditId);

    // 3- close the modal
    menuSpecialModalView.closeModal();

    // 4- update order price in state and UI
    this._controlOrderPrice();

    // 6- Handler Edit:
    //    1- sets ID on save btn
    //    2- adds event handler to save btn
    //    3- update items of Modal to reflect values edited

    menuSpecialModalView.addHandlerEditOrder(
      this._controlOrderSpecialEdit.bind(this, specialEditId)
    );

    menuSpecialModalView.addHandlerRemoveOrder(
      this._controlOrderSpecialItemRemove.bind(this, specialEditId, true)
    );

    // 7- enable pay method default value
    if (!orderSidebarView.checkBtnPayIsClicked())
      orderSidebarView.triggerPayMethod();

    // 8- disable/enable submit order btn
    this._controlSubmitOrder();
  }

  _controlOrderSpecialEdit(specialEditId) {
    //open modal and update it with current values in Modal and State
    const orderSpecialItems = model.state.currentOrderLog[specialEditId];
    menuSpecialModalView.updateModal(orderSpecialItems);

    // add save event handler
    menuSpecialModalView.addHandlerSaveOrder(
      this._controlOrderSpecialItemForm.bind(this)
    );
  }

  _controlOrderSpecialItemForm(totalPcs, specialMixPrice, saveSpecialEditId) {
    // check specialEditId:
    // If clicking on Save, the ID already exists: reset container by removing items
    // If clicking on Add, the ID does not exist; create new container with ID
    // Return the ID

    const specialEditId = orderSpecialBoxView.checkSpecialEditId(
      totalPcs,
      specialMixPrice,
      saveSpecialEditId
    );

    model.state.currentOrderLog[specialEditId] = [
      { mixPrice: specialMixPrice },
    ];

    // add each item in the MIX inside the current log and in the UI
    const modalMenuItems = menuItemsView.getMenuItems();

    modalMenuItems.forEach((item) => {
      const itemId = item.getAttribute('data-item-id');
      const name = model.state.menuItems[itemId].name;
      const specialPrice = Number(specialMixPrice / totalPcs).toFixed(2);
      const img = model.state.menuItems[itemId].img;
      const qty = Number(menuItemsView.getMenuItemText(item));
      const specialItem = true;

      let data = {
        itemId,
        name,
        specialPrice,
        qty,
        img,
        specialItem,
        specialEditId,
      };
      // push data to state
      if (qty > 0) {
        model.state.currentOrderLog[specialEditId].push(data);

        // render item in view
        orderSpecialItemView.render(data);
      }
    });

    if (saveSpecialEditId) {
      menuSpecialModalView.closeModal();
    }

    return specialEditId;
  }

  // Update Total Order Price
  _controlOrderPrice() {
    // get total in State
    const total = this._checkTotalState();

    // Update Total in UI
    orderSidebarView.updateOrderPrice(total);
  }

  // check Total inside the currentOrderLog state
  _checkTotalState() {
    let total = 0;
    for (const [key, { totalPrice }] of Object.entries(
      model.state.currentOrderLog
    )) {
      if (key.startsWith('mix')) {
        total += model.state.currentOrderLog[key][0].mixPrice;

        // check if Key is a number (there is key called 'payMethod' to avoid)
      } else if (isFinite(key)) {
        total += totalPrice;
      }
    }

    return total;
  }

  // Remove the user default pay method
  _disablePayMethod() {
    //check if order contains items by checking total price of Order in state
    const total = this._checkTotalState();

    if (total <= 0) {
      orderSidebarView.removePayMethod();
    }
  }

  // Remove Normal Item
  _controlOrderItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderItemView.removeItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();

    // Disable Tick Pay Method
    this._disablePayMethod();

    // disable/enable submit order btn
    this._controlSubmitOrder();
  }

  // Remove Special Item
  _controlOrderSpecialItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderSpecialItemView.removeSpecialItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();

    // Disable Tick Pay Method
    this._disablePayMethod();

    // disable/enable submit order btn
    this._controlSubmitOrder();
  }
}

export default new controllerHome();
