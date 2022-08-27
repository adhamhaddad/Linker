import React, { Component } from 'react';
import './Styles.css';

class Signin extends Component {
    render() {
        return (
            <div className='container'>
                <div className='switch-box'>
                    <a href="/login" className={this.props.login ? 'active' : null}>
                        <span>log in</span>
                    </a>
                    <a href="/register">
                        <span>register</span>
                    </a>
                </div>
                <ul className='links'>
                    <li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-facebook'></i>
                        </a>
                    </li><li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-twitter'></i>
                        </a>
                    </li><li>
                        <a href="#" rel='noreferrer'>
                            <i className='fa-brands fa-google'></i>
                        </a>
                    </li>
                </ul>
                <form action="/authenticate" method="POST" autoComplete="on">
                    <input type="text" placeholder='User Name' id='user' title='User Name' name="username" required/>
                    <input type="password" placeholder='Password' minLength="8" id='pass' title='Password' name="password" required/>
                    <label className="checkbox">
                        <input type="checkbox" id='check' name="check"/>
                        <span>remember password</span>
                    </label>
                    <button type='submit'>log in</button>
                </form>
            </div>
        )
    }
}
export default Signin;