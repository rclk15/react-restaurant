import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";

import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [showBump, setShowBump] = useState(false);
  const cartCtx = useContext(CartContext);

  const { items } = cartCtx; // pulls items out so we can use items in useEffect

  const totalCartItems = items.reduce((currentTotal, item) => {
    return currentTotal + item.quantity;
  }, 0);

  const buttonClasses = `${classes.button} ${showBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setShowBump(true);

    const timer = setTimeout(() => {
      setShowBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={buttonClasses} onClick={props.onShowCart}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{totalCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
