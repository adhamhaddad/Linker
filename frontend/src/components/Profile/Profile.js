import React from "react";
import './Profile.css';
import img from '../../Images/profile.jpg';
import Post from "../Post/Post";

function Profile() {
    const [user, setUser] = React.useState({})
    
    const [information, setInfomation] = React.useState({
        img: img
    })
    const [posts, setPosts] = React.useState([])
    
    React.useEffect(() => {
        // User
        fetch('http://localhost:3000/user/1')
        .then(res => res.json())
        .then(user => setUser(user.data))
        .catch(err => console.log(err.message));

        // Information
        fetch('http://localhost:3000/information/1')
        .then(res => res.json())
        .then(info => {
            setInfomation(prev => {
                return {
                    ...prev,
                    work: info.data.work,
                    relation: info.data.relation,
                    education: info.data.education,
                    lives: info.data.lives,
                    story: info.data.story
                }
            })
        })
        .catch(err => console.log(err.message));

        // Posts
        fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(post => setPosts(post.data))
        .catch(err => console.log(err.message))
    }, []);

    const userPosts = posts.map(post => {
        const time = post.timedate.split(' - ')[1];
        return <Post fname={user.fname} lname={user.lname} profile={information.img} timedate={time} content={post.content} key={post.id}/>
    })
    const openProfileFullSize = () => {document.querySelector('#fullImage').style.display = "block"}
    const closeProfileFullSize = () => {document.querySelector('#fullImage').style.display = "none"}
    return (
        <div>
            <div id='fullImage' onClick={closeProfileFullSize}>
                <img src={information.img} alt="Profile"/>
            </div>
            <div className='container container-flex'>
                <div className='left-side'>
                    <div className='user-id'>
                        <img src={information.img} id='profile' alt="Profile" onClick={openProfileFullSize}/>
                        <span>{information.fname} {information.lname}</span>
                    </div>
                    <div className='user-info'>
                        <ul>
                            <li>
                                <i className='fa-solid fa-briefcase fa-1x'></i>
                                <span>works at {information.work}</span>
                            </li>
                            <li>
                                <i className='fa-solid fa-heart fa-1x'></i>
                                <span>relationship {information.relation}</span>
                            </li>
                            <li>
                                <i className='fa-solid fa-graduation-cap fa-1x'></i>
                                <span>College {information.education}</span>
                            </li>
                            <li>
                                <i className='fa-solid fa-home fa-1x'></i>
                                <span>lives in {information.lives}</span>
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
                        <p>{information.story}</p>
                    </div>
                    <div className='bottom-side'>
                        <h3>
                            <i className='fa-solid fa-link fa-1x'></i>
                            <span>links</span>
                        </h3>
                        <ul>
                            <li>
                                <a href={information.facebook} title='Facebook'>
                                    <i className='fa-brands fa-facebook fa-1x'></i>
                                    <span>facebook</span>
                                </a>
                            </li><li>
                                <a href={information.twitter} title='Twitter'>
                                    <i className='fa-brands fa-twitter fa-1x'></i>
                                    <span>twitter</span>
                                </a>
                            </li><li>
                                <a href={information.instagram} title='Instagram'>
                                    <i className='fa-brands fa-instagram fa-1x'></i>
                                    <span>instagram</span>
                                </a>
                            </li><li>
                                <a href={information.linkedin} title='LinkedIn'>
                                    <i className='fa-brands fa-linkedin fa-1x'></i>
                                    <span>linkedIn</span>
                                </a>
                            </li><li>
                                <a href={`tel:${information.phone}`} title='Whatsapp'>
                                    <i className='fa-brands fa-whatsapp fa-1x'></i>
                                    <span>whatsapp</span>
                                </a>
                            </li><li>
                                <a href={information.telegram} title='Telegram'>
                                    <i className='fa-brands fa-telegram fa-1x'></i>
                                    <span>telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='container-body'>
                {userPosts}
            </div>
        </div>
    )
}
export default Profile;