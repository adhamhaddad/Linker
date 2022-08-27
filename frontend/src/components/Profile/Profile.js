import React from "react";
import './Profile.css';
import img from '../../Images/profile.jpg';
import Post from "../Post/Post";

function Profile() {
    const [information, setInfomation] = React.useState({
        img: img,
        story: `Hi, I am Adham. I am a student at High Institute for Computers & Management Information Systems started in 2019 and I will graduate in 2023. I started my Full-Stack journey in 2019 and built many projects using many languages. I also joined Udacity Nanodegree programs and got certified as a Professional Front End Web Developer. I worked too hard to achieve this progress, it's my passion and I need an opportunity to show myself.`,
        work: 'The Sparks Foundation',
        relation: 'Engaged',
        college: 'Information Systems',
        location: 'Giza, Egypt'
    })

    React.useEffect(function() {
        // User
        fetch('http://localhost:3000/user/1')
        .then(res => res.json())
        .then(data => {
            setInfomation(prev => {
                return {
                    ...prev,
                    fname: data.data.fname,
                    lname: data.data.lname
                }
            })
        })
        .catch(err => console.log(err.message));

        // Information
        /*
        fetch('http://localhost:3000/information/1')
        .then(res => res.json())
        .then(data => {
            this.setState({
                ...this.state,
                profile: data.data.profile,
                story: data.data.story,
                work: data.data.work,
                relation: data.data.relation,
                college: data.data.college,
                phone: data.data.phone,
                telegram: data.data.telegram,
                linkedin: data.data.linkedin,
                instagram: data.data.instagram,
                twitter: data.data.twitter,
                facebook: data.data.facebook
            })
        })
        .catch(err => console.log(err.message));
        */
        // Posts
        const posts = fetch('http://localhost:3000/posts')
        .then(res => res.json())
        .then(post => {
            console.log(post.data)
            return post.data;
        })
        .catch(err => console.log(err.message))
        console.log(posts);
    })
    /*
    const post = posts.map(post => {
        const time = post.timedate.split(' - ')[1];
        console.log(post)
        return <Post fname={this.state.fname} lname={this.state.lname} profile={this.state.img} datetime={time} content={post.content}/>
    })
    */
    //If we have 4 posts. so will map on post table and each post in the table will return its own data => [0: {data: {datetime, content}}, 1: {}, 2: {}]
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
                                <span>College {information.college}</span>
                            </li>
                            <li>
                                <i className='fa-solid fa-home fa-1x'></i>
                                <span>lives in {information.location}</span>
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
            </div>
        </div>
    )
}
export default Profile;