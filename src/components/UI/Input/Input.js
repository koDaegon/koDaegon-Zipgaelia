import React from 'react';
import classes from './Input.module.css';

const input =(props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  let validationErrorMsg = null;

  if(props.inValid && props.shouldValidate && props.usedForm) {

    inputClasses.push(classes.Invaild);
    validationErrorMsg= <span>Please enter a valid {props.valueName.toLowerCase()}</span>;

  }

    switch(props.inputType) {
      case('input'):
        inputElement = <input 
          className={inputClasses.join(' ')} 
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />;
        break;
      case('textarea'):
        inputElement= <textarea 
          className={classes.InputElement} 
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
          />
        break;
      case('select'):
        inputElement = (<select 
          className= {classes.InputElement} 
          value={props.value} 
          onChange={props.changed}
          >
            {props.elementConfig.options.map(option =>(
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            ))}
        </select>);
        break;
      default:
          inputElement = <input 
            className={classes.InputElement}
            {...props.elementConfig}
            value={props.value}
            onChange={props.changed}
            />
  }
  
    return(   
  <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        <p className={classes.ErrorMsg}>{validationErrorMsg}</p>
    </div>
  );
};

export default input;