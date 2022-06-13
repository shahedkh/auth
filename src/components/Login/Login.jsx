import React, { useState , useEffect , useReducer} from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state , action)=>{
  if(action.type === 'user'){
    return {value : action.val , isValid : action.val.includes('@')}
  }
  if(action.type === 'input_blur'){
    return {value : state.value , isValid : state.value.includes('@')}
  }
  return {value : '' , isValid : false}
}
const passwordReducer = (state , action)=>{
  if(action.type === 'user'){
    return {value : action.val , isValid : action.val.trim().length > 6}
  }
  if(action.type === 'input_blur'){
    return {value : state.value , isValid : state.value.trim().length > 6}
  }
  return {value : '' , isValid : false}
}
const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

const [emailState , dispatchEmail] = useReducer(emailReducer ,{value:'' , isValid : null})
const [passwordState , dispatchPassword] = useReducer(passwordReducer ,{value:'' , isValid : null})


const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity!');
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 500);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({type : 'user' , val : event.target.value}) 
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type : 'user' , val : event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "input_blur"})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "input_blur"})

  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.isValid);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
