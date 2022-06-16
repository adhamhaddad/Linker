import React, { Component } from 'react';
import 'Signup.css';

class Signup extends Component {
    render() {
        return (
            <div className='container'>
                <div className='register-box'>
                    <div className='switch-box'>
                        <a href="./login.html">
                            <span>log in</span>
                        </a>
                        <a href="#" rel='noreferrer'>
                            <span>register</span>
                        </a>
                    </div>
                    <div className='links'>
                        <ul>
                            <li>
                                <a href="#" rel='noreferrer'>
                                    <i className='fa-solid fa-facebook fa-1x'></i>
                                </a>
                            </li><li>
                                <a href="#" rel='noreferrer'>
                                    <i className='fa-solid fa-twitter fa-1x'></i>
                                </a>
                            </li><li>
                                <a href="#" rel='noreferrer'>
                                    <i className='fa-solid fa-google fa-1x'></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className='form'>
                        <form action="/login" method="POST" autocomplete="on">
                            <input type="text" placeholder='User Name' id='user' title='User Name' name="username" required/>
                            <input type="email" placeholder='Email Address' id='email' title='Email Address' name="email" required/>
                            <input type="password" placeholder='New Password' minlength="8" maxlength="18" id='pass' title='New Password' name="pass" required/>
                            <div className='radio'>
                                <label for="s1">male</label>
                                <input type="radio" name='sex' id='s1' title='Male' required/>
                                <label for="s2">female</label>
                                <input type="radio" name='sex' id='s2' title='Female' required/>
                            </div>
                            <div className='checkbox'>
                                <input type="checkbox" id='check' name="check" required/>
                                <label for="check">i agree to the terms & conditions</label>
                            </div>
                            <button type='submit'>
                                <span>sign up</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signup;