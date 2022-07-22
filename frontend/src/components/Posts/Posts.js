import React, { Component } from "react";
import './Posts.css';
import image from '../../Images/profile.jpg'
class Posts extends Component {
    state = {
        userList: [{name: 'adhamhaddad', profile: image, min: 40, post: 'This is a post'}]
    }
    render() {
        return (
            <div className='container-body'>
                <div className='posts'>
                    <div className='user-post'>
                        <div className='user-id'>
                            <img src={this.state.userList[0].profile} alt="Profile"/>
                            <span>{this.state.userList[0].name}</span>
                        </div>
                        <div className='post-date'>
                            <p>posted: {this.state.userList[0].min}</p>
                        </div>
                    </div>
                    <div className='post-content'>
                        <span>{this.state.userList[0].post}</span>
                    </div>
                    <div className='social'>
                        <button className='btn' title='Like'>
                            <i className='fa-solid fa-thumbs-up fa-lg'></i>
                            <span>like</span>
                        </button>
                        <button title='Dislike'>
                            <i className='fa-solid fa-thumbs-down fa-lg'></i>
                            <span>dislike</span>
                        </button>
                        <div className='input'>
                            <input type="text" placeholder='Comment ...' title='Comment'/>
                            <i className='fa-solid fa-send fa-1x'></i>
                        </div>
                        <button title='Share'>
                            <i className='fa-solid fa-share-square fa-lg'></i>
                            <span>share</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}
export default Posts;