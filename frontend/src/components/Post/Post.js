import React from "react";
import './Post.css';

function Post(props) {
    const postTimeClac = (timedate) => {
        // const houres = (getTime > 60 ? `${String(getTime).charAt(0)}h` : `${getTime}m`);
        const filter = `${timedate.split(':')[0]}:${timedate.split(':')[1]} ${timedate.split(' ')[1]}`;
        return filter;
    }
    return (
        <div className='posts'>
            <div className='post-header'>
                <img src={props.profile} alt="Profile"/>
                <span>{props.fname} {props.lname}</span>
                <p>posted: {postTimeClac(props.timedate)}</p>
            </div>
            <div className='post-content'>
                <p>{props.content}</p>
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
export default Post;