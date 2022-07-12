/** @format */
import { async } from 'regenerator-runtime';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

// : To be developed: State should get Data from APi
export const state = {
  orders: [],
  currentOrderLog: {},
  info: {
    logo: 'src/img/general/LOGO-01.png',
    title: 'Yumcha Eat St.',
    date: 'Tuesday, 9 Nov 2022',
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
      name: 'Sides',
      active: false,
    },
  },

  menuItems: {
    0: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'MIX 10 PCS',
      price: 7.0,
      qty: 4,
      img: 'mix.png',
      special_deal: true,
    },
    1: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Pork Soup Dumpling',
      price: 2.0,
      qty: 1,
      img: 'xlb.png',
    },
    2: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Prawn Dumpling',
      price: 2.5,
      qty: 1,
      img: 'hargow.png',
    },
    3: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'BBQ Pork Buns',
      price: 3,
      qty: 1,
      img: 'buns.png',
      special_deal_limit: 2,
    },
    4: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Chicken Dim Sims',
      price: 2,
      qty: 1,
      img: 'chicken.png',
    },
    5: {
      catgId: 1,
      catgName: 'Yumcha',
      name: 'Pork & Prawn Siumai',
      price: 2.5,
      qty: 1,
      img: 'siumai.png',
    },
    // 6: {
    //   catgId: 1,
    //   catgName: 'Yumcha',
    //   name: 'BBQ Pork Buns',
    //   price: 3,
    //   qty: 1,
    //   img: 'buns.png',
    //   special_deal_limit: 2,
    // },
    // 7: {
    //   catgId: 1,
    //   catgName: 'Yumcha',
    //   name: 'Chicken Dim Sims',
    //   price: 2,
    //   qty: 1,
    //   img: 'chicken.png',
    // },
    // 8: {
    //   catgId: 1,
    //   catgName: 'Yumcha',
    //   name: 'Pork & Prawn Siumai',
    //   price: 2.5,
    //   qty: 1,
    //   img: 'siumai.png',
    // },

    // 9: {
    //   catgId: 1,
    //   catgName: 'Yumcha',
    //   name: 'Chicken Dim Sims',
    //   price: 2,
    //   qty: 1,
    //   img: 'chicken.png',
    // },

    10: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x2',
      price: 7,
      qty: 1,
      img: 'duck_x2.png',
    },
    11: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x4',
      price: 12,
      qty: 1,
      img: 'duck_x4.png',
    },
    12: {
      catgId: 2,
      catgName: 'Peking Duck',
      name: 'Peking Duck x6',
      price: 16,
      qty: 1,
      img: 'duck_x6.png',
    },
    20: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Water',
      price: 3,
      qty: 1,
      img: 'water.png',
    },
    21: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Coke',
      price: 3,
      qty: 1,
      img: 'coke.png',
    },
    22: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Coke Zero',
      price: 3,
      qty: 1,
      img: 'coke-zero.png',
    },
    23: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Fanta',
      price: 3,
      qty: 1,
      img: 'fanta.png',
    },

    24: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Sprite',
      price: 3,
      qty: 1,
      img: 'sprite.png',
    },
    25: {
      catgId: 3,
      catgName: 'Drinks',
      name: 'Solo',
      price: 3,
      qty: 1,
      img: 'solo.png',
    },
    26: {
      catgId: 4,
      catgName: 'Entrees',
      name: 'Prawn Crackers',
      price: 3,
      qty: 1,
      img: 'crackers.png',
    },
  },
};

// load the menuItems through API setup skeleton
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
