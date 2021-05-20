//This component shows the individual available MealItem.
import React, { useContext } from "react";
import CartContext from "../../../store/cart-context";
import MealItemForm from "./MealItemForm";

import classes from "./MealItem.module.css";

const MealItem = (props) => {
  // rounding price to keep two decimals
  const price = `$${props.meal.price.toFixed(2)}`;

  const cartCtx = useContext(CartContext);

  const addItemHandler = (quantity) => {
    cartCtx.addItem({
      id: props.meal.id,
      name: props.meal.name,
      quantity: quantity,
      price: props.meal.price,
    });
  };

  return (
    // key needs to be set in map() instead of here, i.e. the code that separates the array elements.
    <li className={classes.meal}>
      {/* this outer div creates a stack of VERTICAL elements */}
      <div>
        <h3>{props.meal.name}</h3>
        <div className={classes.description}>{props.meal.description}</div>
        <div className={classes.price}>{price}</div>
      </div>

      <div>
        <MealItemForm id={props.meal.id} onAddItem={addItemHandler} />
      </div>
    </li>
  );
};

export default MealItem;
