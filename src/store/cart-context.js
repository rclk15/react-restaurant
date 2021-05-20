// context folder should be named 'store', and kebab-case is the filename convention

import React from "react";

const CartContext = React.createContext({
  // place-holders 
    // are these optional?
  // items: [],
  // totalAmount: 0,
  // addItem: (item) => {},
  // removeItem: (id) => {},
});

export default CartContext;