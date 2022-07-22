import React, { Component } from 'react';
// import './ProfileUser.css';
import './Profile.css';

class ProfileUser extends Component {
    render() {
        return (
            <div>
                <div className='container container-flex'>
                    <div className='user-left'>
                        <div className='user-id'>
                            <div className='image'>
                                <i className='fa-solid fa-camera fa-lg'></i>
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
                                    <i className='fa-solid fa-briefcase'></i>
                                    <span>work at</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-heart'></i>
                                    <span>relationship</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-graduation-cap'></i>
                                    <span>College</span>
                                    <input type="text"  placeholder='Type Your Info'/>
                                    <span className='edit2'></span>
                                    <span className='edit'>+</span>

                                </li>
                                <li>
                                    <i className='fa-solid fa-home'></i>
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
                                <i className='fa-solid fa-pencil'></i>
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
                                <i className='fa-solid fa-link'></i>
                                <span>links</span>
                            </h3>
                            <a href="#" title='Facebook'>
                                <i className='fa-brands fa-facebook'></i>
                                <span>+</span>
                            </a><a href="#" title='Twitter'>
                                <i className='fa-brands fa-twitter'></i>
                                <span>+</span>
                            </a><a href="#" title='Instagram'>
                                <i className='fa-brands fa-instagram'></i>
                                <span>+</span>
                            </a><a href="#" title='Linkedin'>
                                <i className='fa-brands fa-linkedin'></i>
                                <span>+</span>
                            </a><a href="#" title='Whatsapp'>
                                <i className='fa-brands fa-whatsapp'></i>
                                <span>+</span>
                            </a><a href="#" title='Telegram'>
                                <i className='fa-brands fa-telegram'></i>
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
                                    <i className='fa-solid fa-file'></i>
                                </span>
                                <span>
                                    text
                                    <i className='fa-solid fa-pencil'></i>
                                </span>
                                <span>
                                    photo
                                    <i className='fa-solid fa-image'></i>
                                </span>
                                <span>
                                    video
                                    <i className='fa-solid fa-video-camera'></i>
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