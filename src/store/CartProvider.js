import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    // console.log(action.item);

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // console.log(existingItemIndex);
    const existingItem = state.items[existingItemIndex];
    let updatedItems;

    // has to check for existingItem, b/c existingItemIndex could be -1.
    if (existingItem) {
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + action.item.quantity,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item); // concat creates new array, push just modifies.
    }

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.quantity;

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];
    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems; // this creates a new array that will replace existing array (so we 'concat').
    if (existingItem.quantity === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    }
    else {
      const updatedItem = {...existingItem, quantity: existingItem.quantity - 1};
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, cartActionDispatch] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemHandler = (item) => {
    // console.log(item);
    cartActionDispatch({ type: "ADD", item: item });
  };

  const removeItemHandler = (id) => {
    cartActionDispatch({ type: "REMOVE", id: id });
  };

  // this is the object that will be shared with other component,
  // items and totalAmount are taken from useReducer's cartState!
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  // value is what will be provided by the context, in this case cartContext.
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
