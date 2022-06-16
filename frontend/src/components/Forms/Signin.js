import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
    render() {
        return (
            <div className='container'>
                <div className='login-box'>
                    <div className='switch-box'>
                        <a href="/login">
                            <span>log in</span>
                        </a>
                        <a href="register.html">
                            <span>register</span>
                        </a>
                    </div>
                    <div className='links'>
                        <ul>
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
                    </div>
                    <div className='form'>
                        <form action="/login" method="POST" autoComplete="on">
                            <input type="text" placeholder='User Name' id='user' title='User Name' name="username" required/>
                            <input type="password" placeholder='User Password' minLength="8" maxLength="18" id='pass' title='User Password' name="pass" required/>
                            <span className='alert'>
                                <i className='fa fa-exclamation-circle fa-1x'></i>
                                wrong username or password
                            </span>
                            <div className='checkbox'>
                                <input type="checkbox" id='check' name="check"/>
                                <label htmlFor="check">remember password</label>
                            </div>
                            <button type='submit'>
                                <span>log in</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
export default Signin;