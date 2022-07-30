import React, { Component } from "react";
import './Posts.css';
import image from '../../Images/profile.jpg'
class Posts extends Component {
    state = {
        name: 'Adham Ashraf', profile: image, time: 220, post: 'this is a post'
    }
    postTimeClac = () => {
        const getTime = this.state.time;
        const houres = (this.state.time > 60 ? `${String(getTime).charAt(0)}h` : `${getTime}m`);
        return houres;
    }
    render() {
        return (
            <div className='posts'>
                <div className='post-header'>
                    <img src={this.state.profile} alt="Profile"/>
                    <span>{this.state.name}</span>
                    <p>posted: {this.postTimeClac()}</p>
                </div>
                <div className='post-content'>
                    <p>{this.state.post}</p>
                </div>
                <div className='post-bottom'>
                    <button className='btn' title='Like'>
                        <i className='fa-solid fa-thumbs-up'></i>
                        <span>like</span>
                    </button>
                    <button title='Dislike'>
                        <i className='fa-solid fa-thumbs-down'></i>
                        <span>dislike</span>
                    </button>
                    <div className='comment'>
                        <input type="text" placeholder='Comment ...' title='Comment'/>
                        <i className='fa-solid fa-paper-plane'></i>
                    </div>
                    <button title='Share'>
                        <i className='fa-solid fa-share'></i>
                        <span>share</span>
                    </button>
                </div>

            </div>
        )
    }
}
export default Posts;