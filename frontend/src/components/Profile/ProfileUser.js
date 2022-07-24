import React, { Component } from 'react';
import img from '../../Images/profile.jpg';
import './Profile.css';
// import './ProfileUser.css';

class ProfileUser extends Component {
    state = [
        {
            img: img,
            username: 'Adham Ashraf',
            bio: `Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer. I worked too hard to achieve this progress, it's my passion and I need an opportunity to show myself.`,
            work: 'The Sparks Foundation',
            relation: 'Engaged',
            college: 'Information Systems',
            location: 'Giza, Egypt'
        }
    ]
    render() {
        return (
            <div>
                <div className='container container-flex'>
                    <div className='left-side'>
                        <div className='user-id'>
                            <div className='image'>
                                <i className='fa-solid fa-camera fa-lg'></i>
                                <img src={this.state[0].img} alt="Profile"/>
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
                                    <span>works at</span>
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
                    <div className='right-side'>
                        <div className='user-bio'>
                            <h3>
                                <i className='fa-solid fa-book-open'></i>
                                <span>story</span>
                            </h3>
                            <p>Write a short story about you ..</p>
                            <input type="text" placeholder="Type a Description about you .."/>
                            <button className='edit'>
                                <span>edit</span>
                            </button>
                            <button className='save'>
                                <span>save</span>
                            </button>
                        </div>
                        <div className='bottom-side'>
                            <h3>
                                <i className='fa-solid fa-link'></i>
                                <span>links</span>
                            </h3>
                            <ul>
                                <li>
                                    <a href='https://www.facebook.com/' title='Facebook'>
                                        <i className='fa-brands fa-facebook'></i>
                                        <span>+</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.twitter.com/" title='Twitter'>
                                        <i className='fa-brands fa-twitter'></i>
                                        <span>+</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.instagram.com/" title='Instagram'>
                                        <i className='fa-brands fa-instagram'></i>
                                        <span>+</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.linkedin.com/" title='Linkedin'>
                                        <i className='fa-brands fa-linkedin'></i>
                                        <span>+</span>
                                    </a>
                                </li><li>
                                    <a href="tel:01113833449" title='Whatsapp'>
                                        <i className='fa-brands fa-whatsapp'></i>
                                        <span>+</span>
                                    </a>
                                </li><li>
                                    <a href="https://t.me/adhamhaddad" title='Telegram'>
                                        <i className='fa-brands fa-telegram'></i>
                                        <span>+</span>
                                    </a>
                                </li>
                            </ul>
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