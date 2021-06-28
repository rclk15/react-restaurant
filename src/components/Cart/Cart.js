import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckOut] = useState(false);
  const [justCheckedOut, setJustCheckedOut] = useState(false);
  console.log("justCheckedOut ", justCheckedOut);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      quantity: 1,
    });
  };

  // only have to prevent default on submit buttons!
  const checkoutHandler = () => {
    setIsCheckOut(true);
  };

  const checkoutCancel = () => {
    setIsCheckOut(false);
  };

  const confirmCheckoutHandler = async (userData) => {
    await fetch(
      "https://react-custom-73305-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsCheckOut(false);
    setJustCheckedOut(true);
    cartCtx.resetCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          // null is the context, item is the default argument
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideCart}>
        Close
      </button>
      {/* if totalAmount is 0, !! turns it to boolean false. */}
      {!!cartCtx.totalAmount && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  return (
    <Modal onHideCart={props.onHideCart}>
      {justCheckedOut && <p>Checkout successful!</p>}
      {cartItems}
      {!justCheckedOut && (
        <div className={classes.total}>
          <span>Total Amount</span>
          <span>{totalAmount}</span>
        </div>
      )}
      {/* this shows the extra Checkout (form) */}
      {isCheckout && (
        <Checkout
          onCancel={checkoutCancel}
          onConfirmCheckout={confirmCheckoutHandler}
        />
      )}
      {!isCheckout && modalActions}
    </Modal>
  );
};

export default Cart;
