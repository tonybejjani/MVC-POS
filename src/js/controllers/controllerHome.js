/** @format */

// Data
import * as model from '../model.js';

import homeView from '../views/home/homeView.js';
import menuTempView from '../views/home/menu/menuTempView.js';
import menuInfoView from '../views/home/menu/menuInfoView.js';
import menuCatView from '../views/home/menu/menuCatView.js';
import menuItemsView from '../views/home/menu/menuItemsView.js';
import menuSpecialModalView from '../views/home/menu/menuSpecialModalView.js';

// Views Order
import orderSidebarView from '../views/home/order/orderSidebarView.js';
import orderItemView from '../views/home/order/orderItemView.js';
import orderSpecialBoxView from '../views/home/order/orderSpecialBoxView.js';
import orderSpecialItemView from '../views/home/order/orderSpecialItemView.js';

class controllerHome {
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

      console.log(model.state.currentOrderLog);
    }

    // Update total order price in temp view
    this._controlOrderPrice();
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
    // Update total in State
    let total = 0;

    for (const [key, { totalPrice }] of Object.entries(
      model.state.currentOrderLog
    )) {
      if (key.startsWith('id')) {
        total += model.state.currentOrderLog[key][0].mixPrice;
      } else {
        total += totalPrice;
      }
    }

    // Update Total in UI
    orderSidebarView.updateOrderPrice(total);
  }

  // Remove Normal Item
  _controlOrderItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderItemView.removeItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();
  }

  // Remove Special Item
  _controlOrderSpecialItemRemove(itemId) {
    // delete item from state
    delete model.state.currentOrderLog[itemId];

    //Delete Item from UI
    orderSpecialItemView.removeSpecialItem(itemId);

    // update Total Order Price
    this._controlOrderPrice();
  }
}

export default new controllerHome();
