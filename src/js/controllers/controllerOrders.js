/** @format */

// Data
import * as model from '../model.js';

import ordersView from '../views/orders/ordersView.js';
// Views
class controllerOrders {
  constructor() {}

  renderOrders() {
    ordersView.render();
    // ordersView.eventHandlerDraggable();
    //clear current order after changing page
    ordersView.makeDraggable();
  }
}

export default new controllerOrders();
