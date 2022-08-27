import React, { Component } from 'react';
import './Styles.css';

class Signup extends Component {
    render() {
        return (
            <div className='container'>
                <div className='switch-box'>
                    <a href="/login">log in</a>
                    <a href="/register" rel='noreferrer' className={this.props.register ? 'active' : null}>register</a>
                </div>
                <ul className='links'>
                    <li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-facebook fa-1x'></i>
                        </a>
                    </li><li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-twitter fa-1x'></i>
                        </a>
                    </li><li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-google fa-1x'></i>
                        </a>
                    </li>
                </ul>
                <form action="/user" method="POST" autoComplete="on">
                    <input type="text" placeholder='User Name' id='user' title='User Name' name="username" required/>
                    <input type="email" placeholder='Email Address' id='email' title='Email Address' name="email" required/>
                    <input type="password" placeholder='New Password' minLength="8" id='pass' title='New Password' name="password" required/>
                    <div className='radio'>
                        <label>
                            <input type="radio" id='male' name='gender' title='Male' value='male' required/>
                            <span>male</span>
                        </label>
                        <label>
                            <input type="radio" id='female' name='gender' title='Female' value='female' required/>
                            <span>female</span>
                        </label>
                    </div>
                    <label className='checkbox'>
                        <input type="checkbox" name="check" required/>
                        <span>I agree to the terms & conditions</span>
                    </label>
                    <button type='submit'>sign up</button>
                </form>
            </div>
        )
    }
}
export default Signup;