import React, { Component } from "react";
import Header from "../Header/Header";
import './Profile.css';

class Profile extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className='container container-flex'>
                    <div className='user-left'>
                        <div className='user-id'>
                            <img src="" alt="Profile-Photo"/>
                            <span>user name</span>
                        </div>
                        <div className='user-info'>
                            <ul>
                                <li>
                                    <i className='fa fa-briefcase fa-1x'></i>
                                    <span>work at</span>
                                </li>
                                <li>
                                    <i className='fa fa-heart fa-1x'></i>
                                    <span>relationship</span>
                                </li>
                                <li>
                                    <i className='fa fa-graduation-cap fa-1x'></i>
                                    <span>College</span>
                                </li>
                                <li>
                                    <i className='fa fa-home fa-1x'></i>
                                    <span>lives in</span>
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
                            <p>this is bio description</p>
                        </div>
                        <div className='user-footer'>
                            <h3>
                                <i className='fa fa-link fa-1x'></i>
                                <span>links</span>
                            </h3>
                            <a>
                            <i className='fa fa-facebook fa-1x'></i>
                                <span>facebook</span>
                            </a><a href="#" title='Twitter'>
                                <i className='fa fa-twitter fa-1x'></i>
                                <span>twitter</span>
                            </a><a href="#" title='Instagram'>
                                <i className='fa fa-instagram fa-1x'></i>
                                <span>instagram</span>
                            </a><a href="#" title='Linkedin'>
                                <i className='fa fa-linkedin fa-1x'></i>
                                <span>linked in</span>
                            </a><a href="#" title='Whatsapp'>
                                <i className='fa fa-whatsapp fa-1x'></i>
                                <span>whatsapp</span>
                            </a><a href="#" title='Telegram'>
                                <i className='fa fa-telegram fa-1x'></i>
                                <span>telegram</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Profile;