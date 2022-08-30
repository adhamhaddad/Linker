import React from 'react';
import './Styles.css';

function Signup(props) {
  const [formData, setFormData] = React.useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    check: false,
  });
  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  return (
    <div className='container'>
      <div className='switch-box'>
        <a href='/login'>log in</a>
        <a
          href='/register'
          rel='noreferrer'
          className={props.register ? 'active' : null}
        >
          register
        </a>
      </div>
      <ul className='links'>
        <li>
          <a href='https://www.facebook.com' rel='noreferrer'>
            <i className='fa-brands fa-facebook fa-1x'></i>
          </a>
        </li>
        <li>
          <a href='https://www.twitter.com' rel='noreferrer'>
            <i className='fa-brands fa-twitter fa-1x'></i>
          </a>
        </li>
        <li>
          <a href='https://www.google.com' rel='noreferrer'>
            <i className='fa-brands fa-google fa-1x'></i>
          </a>
        </li>
      </ul>
      <form action='http://localhost:3000/user' method='POST' autoComplete='on'>
        <input
          type='text'
          placeholder='User Name'
          id='user'
          title='User Name'
          name='username'
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type='email'
          placeholder='Email Address'
          id='email'
          title='Email Address'
          name='email'
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          placeholder='New Password'
          minLength='8'
          id='pass'
          title='New Password'
          value={formData.password}
          name='password'
          onChange={handleChange}
          required
        />
        <div className='radio'>
          <label>
            <input
              type='radio'
              id='male'
              name='gender'
              title='Male'
              value='male'
              onChange={handleChange}
              required
            />
            <span>male</span>
          </label>
          <label>
            <input
              type='radio'
              id='female'
              name='gender'
              title='Female'
              value='female'
              onChange={handleChange}
              required
            />
            <span>female</span>
          </label>
        </div>
        <label className='checkbox'>
          <input
            type='checkbox'
            name='check'
            checked={formData.check}
            onChange={handleChange}
            required
          />
          <span>I agree to the terms & conditions</span>
        </label>
        <button>sign up</button>
      </form>
    </div>
  );
}
export default Signup;
