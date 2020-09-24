import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import './AddCookbook.css';

// import AuthService from '../auth-service'; <= Needed?

export default function AddCookbook(props) {
  // ! useForm has a reset function to reset the values after submit, but only if default values are passed. see api docs for react-hook-form
  const {register, handleSubmit, errors} = useForm();
  const [submitting, setSubmitting] = useState(false);

  // const service = new AuthService(); <= Needed?

  return (
    <div>
      <form
        onSubmit={handleSubmit(async (onSubmit) => {
          setSubmitting(true);

          // * ADD AXIOS CALL HERE
          // * USE AUTH SERVICE TO CHECK IF USER IS LOGGED IN?
          axios.post('http://localhost:5000/api/cookbooks', {title: onSubmit.title}).then(() => {
            console.log('Successfully created new Cookbook');
            props.getData();
          });

          // service
          //   .signup(onSubmit.username, onSubmit.password)
          //   .then((res) => {
          //     console.log('signup successful!');
          //     props.getUser(res);
          //   })
          //   .catch((error) => console.log(error));

          setSubmitting(false);
        })}
      >
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            autoComplete="off"
            name="title"
            ref={register({
              required: 'title is required',
            })}
          />
          {errors.title ? <p className="error">{errors.title.message}</p> : null}
        </div>
        <button type="submit" disabled={submitting}>
          Submit
        </button>
      </form>
    </div>
  );
}
