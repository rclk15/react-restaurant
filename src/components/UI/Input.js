import classes from './Input.module.css';

const Input = (props) => {
  return (
    // React.Fragment accepts 'key' only, can't add 'className'. 
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input {...props.input} />

    </div>
  )
}

export default Input;