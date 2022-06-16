import React, { Component } from 'react';
import Header from '../Header/Header';
import './ProfileUser.css';

class ProfileUser extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='container container-flex'>
                    <div className='user-left'>
                        <div className='user-id'>
                            <div className='image'>
                                <i className='fa fa-camera fa-lg'></i>
                                <img src="#" alt="Profile-Photo"/>
                                <input type="file"/>
                            </div>
                            <div className='name'>
                                <span></span>
                                <input type='text' placeholder='Name'/>
                            </div>
                        </div>
                        <div className='user-info'>
                            <ul>
                                <li>
                                    <i className='fa fa-briefcase fa-1x'></i>
                                    <span>work at</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>
                                </li>
                                <li>
                                    <i className='fa fa-heart fa-1x'></i>
                                    <span>relationship</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>
                                </li>
                                <li>
                                    <i className='fa fa-graduation-cap fa-1x'></i>
                                    <span>College</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>

                                </li>
                                <li>
                                    <i className='fa fa-home fa-1x'></i>
                                    <span>lives in</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='user-right'>
                        <div className='user-bio'>
                            <h3>
                                <i className='fa fa-pencil fa-1x'></i>
                                <span>bio</span>
                            </h3>
                            <p>Type a Description about you ..</p>
                            <input type="text" placeholder="Type a Description about you .."/>
                            <button className='edit'>
                                <span>edit</span>
                            </button>
                            <button className='save'>
                                <span>save</span>
                            </button>
                        </div>
                        <div className='user-footer'>
                            <h3>
                                <i className='fa fa-link fa-1x'></i>
                                <span>links</span>
                            </h3>
                            <a href="#" title='Facebook'>
                                <i className='fa fa-facebook fa-1x'></i>
                                <span>+</span>
                            </a><a href="#" title='Twitter'>
                                <i className='fa fa-twitter fa-1x'></i>
                                <span>+</span>
                            </a><a href="#" title='Instagram'>
                                <i className='fa fa-instagram fa-1x'></i>
                                <span>+</span>
                            </a><a href="#" title='Linkedin'>
                                <i className='fa fa-linkedin fa-1x'></i>
                                <span>+</span>
                            </a><a href="#" title='Whatsapp'>
                                <i className='fa fa-whatsapp fa-1x'></i>
                                <span>+</span>
                            </a><a href="#" title='Telegram'>
                                <i className='fa fa-telegram fa-1x'></i>
                                <span>+</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className='container-body'>
                    <div className='creat-post'>
                        <div className='post-options'>
                            <button>
                                <span>post</span>
                            </button>
                            <div className='opt'>
                                <span>
                                    file
                                    <i className='fa fa-file fa-1x'></i>
                                </span>
                                <span>
                                    text
                                    <i className='fa fa-pencil fa-1x'></i>
                                </span>
                                <span>
                                    photo
                                    <i className='fa fa-image fa-1x'></i>
                                </span>
                                <span>
                                    video
                                    <i className='fa fa-video-camera fa-1x'></i>
                                </span>
                            </div>
                        </div>

                        <div className='post-content'>
                            <div className='content'>

                            </div>
                            <div className='save'>
                                <button>
                                    <span>save</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileUser;