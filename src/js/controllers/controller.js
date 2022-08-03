/** @format */
'use strict';
// module file system
const fs = require('fs');

// Views Menu
import navbarView from '../views/navbar/navbarView.js';
import mainView from '../views/mainView.js';

// Controllers
import controllerHome from './controllerHome.js';
import controllerOrders from './controllerOrders.js';

// Polyfilling
import 'core-js/stable';
import 'regenerator-runtime'; // polyfilling async-await
import homeView from '../views/home/homeView.js';
import ordersView from '../views/orders/ordersView.js';

class App {
  constructor() {
    // load the navbar, mainview and Home page on init
    navbarView.render();
    mainView.render();
    controllerHome.renderHome();
    controllerOrders.renderOrders();
    homeView.showPage();
    ordersView.hidePage();

    // publish listener handler on navbar links
    navbarView.addHandlerRender(this._renderPage.bind(this));
  }

  _renderPage() {
    const hash = window.location.hash.slice(1);
    switch (hash) {
      case 'home':
        navbarView.activateNavIcon(hash);
        homeView.showPage();
        ordersView.hidePage();
        break;

      case 'orders':
        navbarView.activateNavIcon(hash);
        homeView.hidePage();
        ordersView.showPage();
        break;

      case 'dashboard':
        navbarView.activateNavIcon(hash);
        controllerOrders.renderOrders();
        break;

      case 'settings':
        navbarView.activateNavIcon(hash);
        controllerOrders.renderOrders();
        break;

      case 'logout':
        navbarView.activateNavIcon(hash);
        controllerOrders.renderOrders();
        break;
    }
  }
}

const app = new App();
