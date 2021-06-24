import React, { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const inputNotEmpty = (input) => {
  console.log(input);
  return input.trim() !== "";
};

const inputTenNumbers = (input) => {
  console.log(isNaN(+input)); // Not a Number test
  console.log(input.length);
  console.log(input);
  console.log(input.length === 10 && !isNaN(+input));
  return input.length === 10 && !isNaN(+input);
};

const Checkout = (props) => {
  const [fieldValidity, setFieldValidity] = useState({
    name: true,
    address: true,
    phone: true,
  });

  const nameInputRef = useRef();
  const addressInputRef = useRef();
  const phoneInputRef = useRef();

  const checkoutSubmitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    console.log(addressInputRef, enteredAddress);
    const enteredPhone = phoneInputRef.current.value;

    setFieldValidity({
      name: inputNotEmpty(enteredName),
      address: inputNotEmpty(enteredAddress),
      phone: inputTenNumbers(enteredPhone),
    });

    // state has not been updated!!
    // if (fieldValidity.name && fieldValidity.address && fieldValidity.phone) {
    //   console.log('valid')
    //   console.log(enteredAddress);
    //   console.log(inputNotEmpty(enteredAddress));
    // }

    if (
      inputNotEmpty(enteredName) &&
      inputNotEmpty(enteredAddress) &&
      inputTenNumbers(enteredPhone)
    ) {
      console.log("valid");
    } else {
      console.log("not valid");
    }
  };

  const nameInputClases = `${classes.control} ${
    fieldValidity.name ? "" : classes.invalidField
  }`;

  const addressInputClasses = `${classes.control} ${
    fieldValidity.address ? "" : classes.invalidField
  }`;

  const phoneInputClasses = `${classes.control} ${
    fieldValidity.phone ? "" : classes.invalidField
  }`;

  return (
    <form className={classes.form} onSubmit={checkoutSubmitHandler}>
      <div className={nameInputClases}>
        {/* label increases hit area, also benefits screen readers. */}
        <label htmlFor="name">Name</label>
        <input type="text" id="name" ref={nameInputRef} />
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!fieldValidity.address && <p>Please enter a valid address.</p>}
      </div>
      <div className={phoneInputClasses}>
        <label htmlFor="phone">Phone Number (no space)</label>
        <input type="text" id="phone" ref={phoneInputRef} />
        {!fieldValidity.phone && <p>Please enter a 10 digit number.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Submit</button>
      </div>
    </form>
  );
};

export default Checkout;
