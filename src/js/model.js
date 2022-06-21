/** @format */
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// : To be developed: State should get Data from APi
export const state = {
  info: {
    logo: 'src/img/general/LOGO.png',
    title: 'YUMCHA EAT ST.',
    date: 'Tuesday 9th November 2023',
  },

  menuCategories: {
    0: {
      id: 1,
      name: 'Yumcha',
      active: true,
    },
    1: {
      id: 2,
      name: 'Peking Duck',
      active: false,
    },
    2: {
      id: 3,
      name: 'Drinks',
      active: false,
    },
    3: {
      id: 4,
      name: 'Entrees',
      active: false,
    },
  },

  menuItems: {
    0: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'MIX 8 PCS',
      price: 12.0,
      qty: 8,
      img: 'src/img/menu/mix.png',
      special_deal: true,
    },
    1: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Pork Soup Dumpling',
      price: 2.0,
      qty: 1,
      img: 'src/img/menu/xlb.png',
    },
    2: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Prawn Dumpling',
      price: 2.5,
      qty: 1,
      img: 'src/img/menu/hargow.png',
    },
    3: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'BBQ Pork Buns',
      price: 3,
      qty: 1,
      img: 'src/img/menu/buns.png',
      special_deal_limit: 2,
    },
    4: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Chicken Dim Sims',
      price: 2,
      qty: 1,
      img: 'src/img/menu/chicken.png',
    },
    5: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Pork & Prawn Siumai',
      price: 2.5,
      qty: 1,
      img: 'src/img/menu/siumai.png',
    },
    10: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x2',
      price: 7,
      qty: 1,
      img: 'src/img/menu/duck_x2.png',
    },
    11: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x4',
      price: 12,
      qty: 1,
      img: 'src/img/menu/duck_x4.png',
    },
    12: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x6',
      price: 16,
      qty: 1,
      img: 'src/img/menu/duck_x6.png',
    },
    20: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Water',
      price: 3,
      qty: 1,
      img: 'src/img/menu/water.png',
    },
    21: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Coke',
      price: 3,
      qty: 1,
      img: 'src/img/menu/coke.png',
    },
    22: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Coke Zero',
      price: 3,
      qty: 1,
      img: 'src/img/menu/coke-zero.png',
    },
    23: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Fanta',
      price: 3,
      qty: 1,
      img: 'src/img/menu/fanta.png',
    },

    24: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Sprite',
      price: 3,
      qty: 1,
      img: 'src/img/menu/sprite.png',
    },
    25: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Solo',
      price: 3,
      qty: 1,
      img: 'src/img/menu/solo.png',
    },
    26: {
      catgId: 4,
      catgName: 'Entrees',
      name: 'Prawn Crackers',
      price: 3,
      qty: 1,
      img: 'src/img/menu/crackers.png',
    },
  },
};

// to be developed: load the menuItems through API
export const loadMenu = async function () {
  try {
    const data = await getJSON(`${API_URL}`);

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    // handle menu data here
    // const { } = data.data;
  } catch (err) {
    console.error(`${err}💥 💥 💥 💥`);
  }
};
