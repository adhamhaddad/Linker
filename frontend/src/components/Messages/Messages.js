import React, { Component } from "react";
import './Messages.css';
import img from '../../Images/profile.jpg';
import mrym from '../../Images/mrym.png';
class Messages extends Component {
    state = {
        status: true
    }
    openMenu = () => {
        document.querySelector('.container > .top > .menu > li > ul').style.display = "block";
        document.querySelector('.container > .top > .menu > li > i').className = "fa-solid fa-ellipsis";
    }
    closeMenu = () => {
        document.querySelector('.container > .top > .menu > li > ul').style.display = "none"
        document.querySelector('.container > .top > .menu > li > i').className = "fa-solid fa-ellipsis-vertical";
    }

    status = () => {
        const status = this.state.status;
        document.querySelector('.container > .top > span.status').innerHTML = (status ? 'online' : 'offline');
    }

    render() {
        return (
            <div className='container'>
                <div className='top'>
                    <a href="#" id='back'>
                        <i className='fa fa-arrow-circle-left'></i>
                    </a>
                    <h3>
                        <a href='mariam'>Mariam Maged</a>
                    </h3>  
                    <span className='status'>online</span>
                    <ul className="menu">
                        <li>
                            <i className='fa-solid fa-ellipsis-vertical' id='menu-icon' onClick={this.openMenu}></i>
                            <ul onBlur={this.closeMenu}>
                                <li>
                                    <a href='#'>
                                        <i className="fa-solid fa-phone"></i>
                                        <span>call</span>
                                    </a>
                                </li><li>
                                    <a href='#'>
                                        <i className="fa-solid fa-bell-slash"></i>
                                        <span>mute</span>
                                    </a>
                                </li><li>
                                    <a href='#'>
                                        <i className="fa-solid fa-rectangle-xmark"></i>
                                        <span>close</span>
                                    </a>
                                </li><li>
                                    <a href='#'>
                                        <i className="fa-solid fa-circle-exclamation"></i>
                                        <span>report</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                
                
                <div className='conversation'>
                    <div className='user'>
                        <img src={img} alt="Profile"/>
                        <span>Hellooooooooooooooo</span>
                    </div>
                    <div className='friend-user'>
                        <img src={mrym} alt="Profile"/>
                        <span>Who are you!!?</span>
                    </div>
                    <div className='user'>
                        <img src={img} alt="Profile"/>
                        <span>I am adham. Iam a student ..</span>
                    </div>
                    <div className='friend-user'>
                        <img src={mrym} alt="Profile"/>
                        <span>shshshsh i dont asking about your fuckin story.. i asked about why you texting me!?</span>
                    </div>
                    <div className='user'>
                        <img src={img} alt="Profile"/>
                        <span>I love youu ❤️</span>
                    </div>
                    <div className='friend-user'>
                        <img src={mrym} alt="Profile"/>
                        <span>No I hate you. bye</span>
                    </div>
                    <div className='user'>
                        <img src={img} alt="Profile"/>
                        <span>I cant stop loving youu .. ❤️</span>
                        <img src={mrym} alt="Profile" id="seen"/>
                    </div>
                    <p id="error">This user closed the conversation. <a href='#'>learn more</a></p>
                </div>
                <form action='/sendMessage' method="POST">
                    <input type="text" placeholder="Type Message .." name='message'/>
                    <button type='submit'>
                        send
                        <i className='fa fa-paper-plane'></i>
                    </button>
                </form>
                {/* 
                <i className='fa-solid fa-circle-check'></i>
                <i className='fa-regular fa-circle-check'></i>
                <i className='fa-regular fa-circle'></i>
                 */}
            </div>
        )
    }
}
export default Messages;