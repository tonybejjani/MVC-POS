/** @format */
'use strict';

// Views Menu
import navbarView from '../views/navbar/navbarView.js';
import mainView from '../views/mainView.js';

// Controllers
import controllerHome from './controllerHome.js';
import controllerOrders from './controllerOrders.js';

// Polyfilling
import 'core-js/stable';
import 'regenerator-runtime'; // polyfilling async-await

class App {
  constructor() {
    // load the navbar, mainview and Home page on init
    navbarView.render();
    mainView.render();
    controllerHome.renderHome();

    // publish listener handler on navbar links
    navbarView.addHandlerRender(this._showPage.bind(this));
  }

  _showPage() {
    const hash = window.location.hash.slice(1);
    switch (hash) {
      case 'home':
        navbarView.activateNavIcon(hash);
        controllerHome.renderHome();
        break;
      case 'orders':
        navbarView.activateNavIcon(hash);
        controllerOrders.renderOrders();
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
