import { useContext, useState } from "react";
import CartContext from "../../store/cart-context";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isCheckout, setIsCheckOut] = useState(false);
  const [justCheckedOut, setJustCheckedOut] = useState(false);
  const [error, setError] = useState(); // blank is undefined, falsy
  console.log("justCheckedOut ", justCheckedOut);

  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  // this only adds 1 to existing cart item
  // where as in MealItemForm quantity can be specified.
  const cartItemAddHandler = (item) => {
    cartCtx.addItem({
      ...item,
      quantity: 1,
    });
  };

  // only have to prevent default on submit buttons!
  const checkoutHandler = () => {
    setIsCheckOut(true);
    setError(false); //resets previous error, tries to checkout again
  };

  const checkoutCancel = () => {
    setIsCheckOut(false);
  };

  const confirmCheckoutHandler = async (userData) => {
    const submitPromise = async () => {
      const response = await fetch(
        "https://react-custom-73305-default-rtdb.firebaseio.com/orders.json",
        {
          method: "POST",
          body: JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items,
          }),
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Unable to submit order! Please try again in a few minutes!");
      }
    };
    submitPromise().then(()=>{
      setIsCheckOut(false);
      setJustCheckedOut(true);
      cartCtx.resetCart();
    }).catch((error)=> {
      setError(error.message);
      console.log(error.message);
      console.log(error);
    })

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
      {!!cartCtx.totalAmount && !error && (
        <button className={classes.button} onClick={checkoutHandler}>
          Order
        </button>
      )}
    </div>
  );

  if (error) {
    return (
      <Modal onHideCart={props.onHideCart}>
        <p>{error}</p>
        {modalActions}
      </Modal >
    )
  }


  return (
    <Modal onHideCart={props.onHideCart}>
      {error && <p>{error}</p>}
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
