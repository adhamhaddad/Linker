import React from "react";
import './Profile.css';
import Post from "../Post/Post";

function Profile(props) {
    const [photos, setPohotos] = React.useState({});
    const [information, setInfomation] = React.useState({})
    const [links, setLinks] = React.useState({})
    const [posts, setPosts] = React.useState([])
    const [reactions, setReactions] = React.useState({
        likes: ['Adham Ashraf', 'Mariam Maged'],
        comments: ['Nice post!', 'Great job!', 'Can i shares it ?'],
        shares: 16
    })
    
    React.useEffect(() => {
        // Photos
        async function getPhotos() {
            const response = await fetch(`http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/photos`);
            const photo = await response.json();
            try {
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
        }
        getPhotos()
        
        // Information
        async function getInformation() {
            const response = await fetch(`http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/information`);
            const info = await response.json();
            try {
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
            } catch (err) {console.log(err.message)}
        }
        getInformation();
        // Links
        async function getLinks() {
            const response = await fetch(`http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/links`);
            const link = await response.json();
            try {
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
            } catch (err) {console.log(err.message)}
        }
        getLinks();
        
        
        // // Reactions
        // async function getReactions() {
        //     const response = await fetch(`http://localhost:3000/user/${user.id}/posts/reactions`);
        //     const post = await response.json();
        //     try {
        //         setPosts(post.data)
        //     } catch (err) {console.log(err.message)}
        // }
        // getReactions();

        // Posts
        async function getPosts() {
            const response = await fetch(`http://localhost:3000/user/4e5c7f44-f20d-458b-a204-5fca018c93c2/posts`);
            const post = await response.json();
            try {
                setPosts(post.data)
            } catch (err) {console.log(err.message)}
        }
        getPosts();
    }, [2])
    
    const userPosts = posts.length ? posts.map(post => {
        return <Post fname={information.fname} lname={information.lname} profile={photos.profile} timedate={post.timedate} content={post.content} reactions={reactions} key={post.id}/>
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