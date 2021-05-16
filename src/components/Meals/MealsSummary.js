import React from 'react';

import classes from './MealsSummary.module.css';

const MealsSummary = (props) => {
  return (
    <section className={classes.summary}>
      <h2> Farm-fresh Food, Every Day.</h2>
      <p>
        All ingredients are hand-selected and meticulously prepared in small batches.
      </p>
    </section>
  )
};

export default MealsSummary;