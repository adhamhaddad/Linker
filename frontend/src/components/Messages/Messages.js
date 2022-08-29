import React from "react";
import './Messages.css';

function Messages() {
    const [status, setStatus] = React.useState(true);
    const [receiverUser, setReceiverUser] = React.useState({
        name: 'mariam maged',
        profile: './images/mrym.png'
    })
    const [senderUser, setSenderUser] = React.useState({
        name: 'adham ashraf',
        profile: './images/profile.jpg'
    })

    const timeFormat = (time) => {
        const hours = time.split(':')[0]
        const minutes = time.split(':')[1];
        return `${hours}:${minutes} ${time.split(' ')[1]}`;
    }
    const getTime = time => {
        const filter =  `${time.split(':')[0]}${time.split(':')[1]}${time.split(':')[2]}`
        const final = filter.split(' ')[0];
        return Number(final);
    }
    const openMenu = () => {
        document.querySelector('.container > .top > .menu > li > ul').style.display = "block";
        document.querySelector('.container > .top > .menu > li > i').className = "fa-solid fa-ellipsis";
    }
    const closeMenu = () => {
        document.querySelector('.container > .top > .menu > li > ul').style.display = "none"
        document.querySelector('.container > .top > .menu > li > i').className = "fa-solid fa-ellipsis-vertical";
    }

    React.useEffect(() => {
        async function getSenderMessages() {
            try {
                const response = await fetch('http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/message');
                const messages = await response.json();
                setSenderUser(prev => {
                    return {
                        ...prev,
                        messages: [...messages.data]
                    }
                });
            } catch (err) {console.log(err.message)};
        }
        getSenderMessages();

        async function getReceiverMessages() {
            try {
                const response = await fetch('http://localhost:3000/user/baf446dd-0384-42d3-bca5-acf64e0fd79f/message');
                const messages = await response.json();
                setReceiverUser(prev => {
                    return {
                        ...prev,
                        messages: [...messages.data]
                    }
                });
            } catch (err) {console.log(err.message)}
        }
        getReceiverMessages();
    }, [])

    const receiver = receiverUser.messages.map(msg => {
        return (
            <div className='receiver' key={getTime(msg.time)}>
                <p className="message-time">{timeFormat(msg.time)}</p>
                <div className="message-content">
                    <img src={receiverUser.profile} alt="Profile"/>
                    <span>{msg.message}</span>
                </div>
            </div>
        )
    })
    const sender = senderUser.messages.map(msg => {
        return (
            <div className='sender' key={getTime(msg.time)}>
                <p className="message-time">{timeFormat(msg.time)}</p>
                <div className="message-content">
                    <img src={senderUser.profile} alt="Profile"/>
                    <span>{msg.message}</span>
                </div>
            </div>
        )
    })
    const final = [...sender, ...receiver].sort((a, b) => a.key - b.key)
    
    return (
        <div className='container'>
            <div className='top'>
                <a href="#" id='back'>
                    <i className='fa fa-arrow-circle-left'></i>
                </a>
                <h3>
                    <a href='mariam'>{receiverUser.name}</a>
                </h3>  
                <span className='status'>{status ? 'online' : 'offline'}</span>
                <ul className="menu">
                    <li>
                        <i className='fa-solid fa-ellipsis-vertical' id='menu-icon' onClick={openMenu}></i>
                        <ul onBlur={closeMenu}>
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
                {final}
                {/*
                <div className='user'>
                    <img src={img} alt="Profile"/>
                    <span>I cant stop loving youu .. ❤️</span>
                    <img src={mrym} alt="Profile" id="seen"/>
                </div>
                */}
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
export default Messages;