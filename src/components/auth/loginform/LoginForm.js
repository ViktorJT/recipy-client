import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';
import AuthService from '../auth-service';
import './LoginForm.css';

export default function LoginForm(props) {
  // ! useForm has a reset function to reset the values after submit, but only if default values are passed. need to check api docs for react-hook-form
  const {register, handleSubmit, errors} = useForm();
  const service = new AuthService();
  const [submitting, setSubmitting] = useState(false);

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (onSubmit) => {
          setSubmitting(true);

          service
            .login(onSubmit.username, onSubmit.password)
            .then((res) => {
              console.log('signup successful!');
              props.getUser(res);
              props.history.push('/');
            })
            .catch((error) => console.log(error));

          setSubmitting(false);
        })}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            autoComplete="off"
            name="username"
            ref={register({
              required: 'Username is required',
            })}
          />
          {errors.username ? <p className="error">{errors.username.message}</p> : null}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            autoComplete="off"
            name="password"
            ref={register({
              required: 'Password is required',
            })}
          />
          {errors.password ? <p className="error">{errors.password.message}</p> : null}
        </div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>

      <p>
        Don't have an account yet?
        <br />
        <Link to={'/signup'}>Sign up</Link>
      </p>
    </div>
  );
}
