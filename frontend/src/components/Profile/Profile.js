import React, { Component } from "react";
import './Profile.css';
import img from '../../Images/profile.jpg';
import Posts from "../Posts/Posts";

class Profile extends Component {
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
                            <img src={this.state[0].img} alt="Profile-Photo"/>
                            <span>{this.state[0].username}</span>
                        </div>
                        <div className='user-info'>
                            <ul>
                                <li>
                                    <i className='fa-solid fa-briefcase fa-1x'></i>
                                    <span>works at {this.state[0].work}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-heart fa-1x'></i>
                                    <span>relationship {this.state[0].relation}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-graduation-cap fa-1x'></i>
                                    <span>College {this.state[0].college}</span>
                                </li>
                                <li>
                                    <i className='fa-solid fa-home fa-1x'></i>
                                    <span>lives in {this.state[0].location}</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='right-side'>
                        <div className='user-bio'>
                            <h3>
                                <i className='fa-solid fa-pencil fa-1x'></i>
                                <span>bio</span>
                            </h3>
                            <p>{this.state[0].bio}</p>
                        </div>
                        <div className='bottom-side'>
                            <h3>
                                <i className='fa-solid fa-link fa-1x'></i>
                                <span>links</span>
                            </h3>
                            <ul>
                                <li>
                                    <a href='#' title='Facebook'>
                                        <i className='fa-brands fa-facebook fa-1x'></i>
                                        <span>facebook</span>
                                    </a>
                                </li><li>
                                    <a href="#" title='Twitter'>
                                        <i className='fa-brands fa-twitter fa-1x'></i>
                                        <span>twitter</span>
                                    </a>
                                </li><li>
                                    <a href="#" title='Instagram'>
                                        <i className='fa-brands fa-instagram fa-1x'></i>
                                        <span>instagram</span>
                                    </a>
                                </li><li>
                                    <a href="#" title='Linkedin'>
                                        <i className='fa-brands fa-linkedin fa-1x'></i>
                                        <span>linkedIn</span>
                                    </a>
                                </li><li>
                                    <a href="#" title='Whatsapp'>
                                        <i className='fa-brands fa-whatsapp fa-1x'></i>
                                        <span>whatsapp</span>
                                    </a>
                                </li><li>
                                    <a href="#" title='Telegram'>
                                        <i className='fa-brands fa-telegram fa-1x'></i>
                                        <span>telegram</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <Posts />
            </div>
        )
    }
}
export default Profile;