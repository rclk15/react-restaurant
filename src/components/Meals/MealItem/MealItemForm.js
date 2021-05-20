// This component handles the amount(number) of MealItem submitted.
import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [quantityIsValid, setQuantityIsValid] = useState(true);
  const amountInputRef = useRef();

  const addItemQuantityHandler = (event) => {
    event.preventDefault();
    const quantityStr = amountInputRef.current.value;
    const quantity = +quantityStr// "+" converts to number type
    // console.log(quantity);

    if (quantityStr.trim().length === 0 || quantity < 0 || quantity > 10) {
      setQuantityIsValid(false);
      return; // invalid, terminates handler.
    }
    // valid quantity
    setQuantityIsValid(true);
    props.onAddItem(quantity);
  };

  return (
    <form className={classes.form} onSubmit={addItemQuantityHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      {/* the default type for <button> is submit! */}
      <button>+ Add</button>
      {!quantityIsValid && <p>Valid quantity: 1 - 10.</p>}
    </form>
  );
};

export default MealItemForm;
