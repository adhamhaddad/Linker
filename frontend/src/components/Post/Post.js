import React, { Component } from "react";
import './Post.css';
class Post extends Component {
    postTimeClac = () => {
        const getTime = this.state.timedate;
        const houres = (this.state.timedate > 60 ? `${String(getTime).charAt(0)}h` : `${getTime}m`);
        return houres;
    }
    render() {
        return (
            <div className='posts'>
                <div className='post-header'>
                    <img src={this.props.profile} alt="Profile"/>
                    <span>{this.props.fname} {this.props.lname}</span>
                    <p>posted: {this.props.timedate}</p>
                </div>
                <div className='post-content'>
                    <p>{this.props.content}</p>
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
export default Post;