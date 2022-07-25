import React, { Component } from 'react';
import './Styles.css';

class Signup extends Component {
    render() {
        return (
            <div className='container'>
                <div className='switch-box'>
                    <a href="/login">log in</a>
                    <a href="/register" rel='noreferrer'>register</a>
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
                <form action="/login" method="POST" autocomplete="on">
                    <input type="text" placeholder='User Name' id='user' title='User Name' name="username" required/>
                    <input type="email" placeholder='Email Address' id='email' title='Email Address' name="email" required/>
                    <input type="password" placeholder='New Password' minlength="8" maxlength="18" id='pass' title='New Password' name="pass" required/>
                    <div className='radio'>
                        <label for="s1">
                            <input type="radio" id='s1' name='sex' title='Male' required/>
                            male
                        </label>
                        <label for="s2">
                            <input type="radio" id='s2' name='sex' title='Female' required/>
                            female
                        </label>
                    </div>
                    <label className='checkbox'>
                        <input type="checkbox" name="check" required/>
                        i agree to the terms & conditions
                    </label>
                    <button type='submit'>sign up</button>
                </form>
            </div>
        )
    }
}
export default Signup;