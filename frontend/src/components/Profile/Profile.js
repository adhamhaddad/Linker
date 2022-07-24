import React, { Component } from "react";
import './Profile.css';
import img from '../../Images/profile.jpg';
import Posts from "../Posts/Posts";

class Profile extends Component {
    state = {
        img: img,
        username: 'Adham Ashraf',
        bio: `Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer. I worked too hard to achieve this progress, it's my passion and I need an opportunity to show myself.`,
        work: 'The Sparks Foundation',
        relation: 'Engaged',
        college: 'Information Systems',
        location: 'Giza, Egypt'
    }

    openProfileFullSize = () => {document.querySelector('#fullImage').style.display = "block"}
    closeProfileFullSize = () => {document.querySelector('#fullImage').style.display = "none"}

    render() {
        return (
            <div>
                <div id='fullImage' onClick={this.closeProfileFullSize}>
                    <img src={this.state.img} alt="Profile"/>
                </div>
                <div className='container container-flex'>
                    <div className='left-side'>
                        <div className='user-id'>
                            <img src={this.state.img} id='profile' alt="Profile" onClick={this.openProfileFullSize}/>
                            <span>{this.state.username}</span>
                        </div>
                        <div className='user-info'>
                            <ul>
                                <li>
                                    <i className='fa-solid fa-briefcase fa-1x'></i>
                                    <span>works at {this.state.work}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-heart fa-1x'></i>
                                    <span>relationship {this.state.relation}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-graduation-cap fa-1x'></i>
                                    <span>College {this.state.college}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-home fa-1x'></i>
                                    <span>lives in {this.state.location}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='user-bio'>
                            <h3>
                                <i className='fa-solid fa-book-open fa-1x'></i>
                                <span>story</span>
                            </h3>
                            <p>{this.state.bio}</p>
                        </div>
                        <div className='bottom-side'>
                            <h3>
                                <i className='fa-solid fa-link fa-1x'></i>
                                <span>links</span>
                            </h3>
                            <ul>
                                <li>
                                    <a href='https://www.facebook.com/' title='Facebook'>
                                        <i className='fa-brands fa-facebook fa-1x'></i>
                                        <span>facebook</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.twitter.com/" title='Twitter'>
                                        <i className='fa-brands fa-twitter fa-1x'></i>
                                        <span>twitter</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.instagram.com/" title='Instagram'>
                                        <i className='fa-brands fa-instagram fa-1x'></i>
                                        <span>instagram</span>
                                    </a>
                                </li><li>
                                    <a href="https://www.linkedin.com/" title='LinkedIn'>
                                        <i className='fa-brands fa-linkedin fa-1x'></i>
                                        <span>linkedIn</span>
                                    </a>
                                </li><li>
                                    <a href="tel:01113833449" title='Whatsapp'>
                                        <i className='fa-brands fa-whatsapp fa-1x'></i>
                                        <span>whatsapp</span>
                                    </a>
                                </li><li>
                                    <a href="https://t.me/adhamhaddad" title='Telegram'>
                                        <i className='fa-brands fa-telegram fa-1x'></i>
                                        <span>telegram</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='container-body'>
                    <Posts name={this.state.username}/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                    <Posts/>
                </div>
            </div>
        )
    }
}
export default Profile;