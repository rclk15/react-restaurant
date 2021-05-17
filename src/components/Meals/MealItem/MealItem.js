import classes from "./MealItem.module.css";
import React from "react";
import MealItemForm from "./MealItemForm";

const MealItem = (props) => {

  // rounding price to keep two decimals
  const price = `$${props.meal.price.toFixed(2)}`;

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
        <MealItemForm id={props.meal.id} />
      </div>
    </li>
  );
};

export default MealItem;
