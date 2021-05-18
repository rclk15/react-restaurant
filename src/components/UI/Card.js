import classes from "./Card.module.css";

const Card = (props) => {
  
  // since using .module.css and there are no Global classes, this code is pointless. 
  // const collectedClasses = `${classes.card} ${props.className ? props.className : ''}`;

  return (
    <div className={classes.card}>
      {props.children}
    </div>
  );
};

export default Card;
