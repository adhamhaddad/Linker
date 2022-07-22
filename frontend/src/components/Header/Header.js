import React, { Component } from "react";
import './Header.css';

class Header extends Component {
    handleFocus = () => {
        
    }
    render() {
        return (
            <nav>
                <div className='logo-image'>
                    <img src="#" alt="Logo"/>
                </div>
                <ul>
                    <li>
                        <a href='/home' title='Home' rel='noreferrer'>
                            <i className='fa-solid fa-home fa-1x'></i>
                            <span>home</span>
                        </a>
                    </li><li>
                        <a href='/profile-user' title='Profile' rel='noreferrer'>
                            <i className='fa-solid fa-user-circle fa-1x'></i>
                            <span>profile</span>
                        </a>
                    </li><li className='msg'>
                        <a href='/message' title='Messages' rel='noreferrer'>
                            <i className='fa-solid fa-comments fa-1x msg'>
                                <span></span>
                            </i>
                            <span>messages</span>
                            <div className='all-msg'>
                                <iframe src="/message-port" title='Message' frameBorder="0" className='msg-iframe'></iframe>
                            </div>
                        </a>
                    </li><li className='notifi'>
                        <a href='/notification' title='Notification' rel='noreferrer'>
                            <i className='fa-solid fa-bell fa-1x notifi'>
                                <span></span>
                            </i>
                            <span>notifications</span>
                            <div className='all-notifi'>
                                <iframe src="/notification-port" title='Notification' frameBorder="0" className='notifi-iframe'></iframe>
                            </div>
                        </a>
                    </li><li className='sett'>
                        <a href='/settings' title='Settings' rel='noreferrer'>
                            <i className='fa-solid fa-cog fa-1x'></i>
                            <span>settings</span>
                        </a>
                        <ul>
                            <li>
                                <a href="/about" title='About' rel='noreferrer'>
                                    <i className='fa-solid fa-question fa-1x'></i>
                                    <span>about</span>
                                </a>
                            </li><li>
                                <a href="/contact" title='Contact Us' rel='noreferrer'>
                                    <i className='fa-solid fa-phone fa-1x'></i>
                                    <span>contact us</span>
                                </a>
                            </li><li>
                                <a href="/privacy" title='Privacy' rel='noreferrer'>
                                    <i className='fa-solid fa-lock fa-1x'></i>
                                    <span>privacy</span>
                                </a>
                            </li><li>
                                <a href="/login" title='Log Out' rel='noreferrer'>
                                    <i className='fa-solid fa-sign-out fa-1x'></i>
                                    <span>log out</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>

                <div className='menu-bar'>
                    <i className='fa-solid fa-bars fa-1x' title='Menu'>
                        <span className='all-alerts'></span>
                    </i>
                </div>
                <div className='search-bar'>
                    <input type="search" placeholder='Type to Search ..'/>
                    <button title='search'>
                        <i className='fa-solid fa-search fa-1x'></i>
                    </button>
                </div>

                <div className='links'>
                    <ul>
                        <li>
                            <a href="https://www.facebook.com/" target='_blank' title='Facebook' rel='noreferrer'>
                                <i className='fa-brands fa-facebook fa-1x'></i>
                            </a>
                        </li><li>
                            <a href="https://www.instagram.com/" target='_blank' title='Instagram' rel='noreferrer'>
                                <i className='fa-brands fa-instagram fa-1x'></i>
                            </a>
                        </li><li>
                            <a href="https://twitter.com/" target='_blank' title='Twitter' rel='noreferrer'>
                                <i className='fa-brands fa-twitter fa-1x'></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
export default Header;