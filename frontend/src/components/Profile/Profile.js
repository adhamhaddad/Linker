import React from "react";
import './Profile.css';
// import img from 'http://localhost:3000/images/1/profile/profile.jpg';
import Post from "../Post/Post";

function Profile() {
    const [photos, setPohotos] = React.useState({});
    const [user, setUser] = React.useState({})
    const [information, setInfomation] = React.useState({})
    const [links, setLinks] = React.useState({})
    const [posts, setPosts] = React.useState([])
    const [counter, setCounter] = React.useState(posts.length);
    console.log(user.id)
    // User
    React.useEffect(() => {
        fetch('http://localhost:3000/user/1c4f9dbb-e32b-47bb-ae60-9366e406551c')
        .then(res => res.json())
        .then(user => {
            setUser(prev => {
                return {
                    ...prev,
                    id: user.data.id,
                    username: user.data.username,
                    email: user.data.email,
                    gender: user.data.gender,
                    joined: user.data.joined
                }
            })
        })
        .catch(err => console.log(err.message));
    }, []);
    // Photos
    React.useEffect(() => {
        try {
            const response = fetch(`http://localhost:3000/user/${user.id}/photos`);
            const photo = response.json();
            setPohotos(prev => {
                return {
                    ...prev,
                    cover: photo.data.cover,
                    profile: photo.data.profile
                }
            })
        } catch (err) {
            console.log(err.message)
        }
    }, []);
    
    // Information
    React.useEffect(() => {
        fetch(`http://localhost:3000/user/${user.id}/information`)
        .then(res => res.json())
        .then(info => {
            setInfomation(prev => {
                return {
                    ...prev,
                    fname: info.data.fname,
                    lname: info.data.lname,
                    phone: info.data.phone,
                    birthday: info.data.birthday,
                    work: info.data.work,
                    relation: info.data.relation,
                    education: info.data.education,
                    lives: info.data.lives,
                    story: info.data.story
                }
            })
        })
        .catch(err => console.log(err.message));
    }, []);

    // Links
    React.useEffect(() => {
        fetch(`http://localhost:3000/user/${user.id}/links`)
        .then(res => res.json())
        .then(link => {
            setLinks(prev => {
                return {
                    ...prev,
                    facebook: link.data.facebook,
                    twitter: link.data.twitter,
                    linkedin: link.data.linkedin,
                    instagram: link.data.instagram,
                    telegram: link.data.telegram
                }
            })
        })
    }, []);

    // Posts
    React.useEffect(() => {
        fetch(`http://localhost:3000/user/${user.id}/posts`)
        .then(res => res.json())
        .then(post => {
            setPosts(post.data)
            setCounter(posts.length);
        })
        .catch(err => console.log(err.message))
    }, []);

    const userPosts = posts.length ? posts.map(post => {
        const time = post.timedate.split(' - ')[1];
            return <Post fname={user.fname} lname={user.lname} profile={photos.profile} timedate={time} content={post.content} key={post.id}/>
        })
    : null
    const openProfileFullSize = () => {document.querySelector('#fullImage').style.display = "block"}
    const closeProfileFullSize = () => {document.querySelector('#fullImage').style.display = "none"}
    return (
        <div>
            <div id='fullImage' onClick={closeProfileFullSize}>
                <img src={photos.profile} alt="Profile"/>
            </div>
            <div className='container container-flex'>
                <div className='left-side'>
                    <div className='user-id'>
                        <img src={photos.profile} id='profile' alt="Profile" onClick={openProfileFullSize}/>
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
                                <a href={links.facebook} title='Facebook' target='_blank'>
                                    <i className='fa-brands fa-facebook fa-1x'></i>
                                    <span>facebook</span>
                                </a>
                            </li><li>
                                <a href={links.twitter} title='Twitter' target='_blank'>
                                    <i className='fa-brands fa-twitter fa-1x'></i>
                                    <span>twitter</span>
                                </a>
                            </li><li>
                                <a href={links.instagram} title='Instagram' target='_blank'>
                                    <i className='fa-brands fa-instagram fa-1x'></i>
                                    <span>instagram</span>
                                </a>
                            </li><li>
                                <a href={links.linkedin} title='LinkedIn' target='_blank'>
                                    <i className='fa-brands fa-linkedin fa-1x'></i>
                                    <span>linkedIn</span>
                                </a>
                            </li><li>
                                <a href={`tel:${information.phone}`} title='Whatsapp' target='_blank'>
                                    <i className='fa-brands fa-whatsapp fa-1x'></i>
                                    <span>whatsapp</span>
                                </a>
                            </li><li>
                                <a href={links.telegram} title='Telegram' target='_blank'>
                                    <i className='fa-brands fa-telegram fa-1x'></i>
                                    <span>telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={userPosts !== null ? 'container-body' : 'hide'}>
                {userPosts}
            </div>
        </div>
    )
}
export default Profile;