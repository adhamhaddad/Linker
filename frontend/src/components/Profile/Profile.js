import React from 'react';
import './Profile.css';
import Post from '../Post/Post';

function Profile(props) {
  /*
  const date = props.user.joined.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: '2-digit',
  });
  const time = props.user.joined.toLocaleString('en-US').split(',')[1];
    props.user.joined.toLocaleString('en-US').split(',')[1]
  );
  const filter = Date(props.user.joined.toLocaleString('en-US', { month: '2-digit' })).split(' ');
  */

  const userPosts = props.posts.length
    ? props.posts.map((post) => {
        return (
          <Post
            fname={props.information.fname}
            lname={props.information.lname}
            profile={props.photos.profile}
            timedate={post.timedate}
            content={post.content}
            reactions={props.reactions}
            key={post.id}
          />
        );
      })
    : null;
  const openProfileFullSize = () => {
    document.querySelector('#fullImage').style.display = 'block';
  };
  const closeProfileFullSize = () => {
    document.querySelector('#fullImage').style.display = 'none';
  };
  return (
    <div>
      <div id='fullImage' onClick={closeProfileFullSize}>
        <img src={props.photos.profile} alt='Profile' />
      </div>
      <div className='container container-flex'>
        <div className='left-side'>
          <div className='user-id'>
            <img
              src={props.photos.profile}
              id='profile'
              alt='Profile'
              onClick={openProfileFullSize}
            />
            <span>
              {props.information.fname} {props.information.lname}
            </span>
          </div>
          <div className='user-info'>
            <ul>
              <li>
                <i className='fa-solid fa-briefcase fa-1x'></i>
                <span>works at {props.information.work}</span>
              </li>
              <li>
                <i className='fa-solid fa-heart fa-1x'></i>
                <span>relationship {props.information.relation}</span>
              </li>
              <li>
                <i className='fa-solid fa-graduation-cap fa-1x'></i>
                <span>College {props.information.education}</span>
              </li>
              <li>
                <i className='fa-solid fa-home fa-1x'></i>
                <span>lives in {props.information.lives}</span>
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
            <p>{props.information.story}</p>
          </div>
          <div className='bottom-side'>
            <h3>
              <i className='fa-solid fa-link fa-1x'></i>
              <span>links</span>
            </h3>
            <ul>
              <li>
                <a href={props.links.facebook} title='Facebook' target='_blank'>
                  <i className='fa-brands fa-facebook fa-1x'></i>
                  <span>facebook</span>
                </a>
              </li>
              <li>
                <a href={props.links.twitter} title='Twitter' target='_blank'>
                  <i className='fa-brands fa-twitter fa-1x'></i>
                  <span>twitter</span>
                </a>
              </li>
              <li>
                <a
                  href={props.links.instagram}
                  title='Instagram'
                  target='_blank'
                >
                  <i className='fa-brands fa-instagram fa-1x'></i>
                  <span>instagram</span>
                </a>
              </li>
              <li>
                <a href={props.links.linkedin} title='LinkedIn' target='_blank'>
                  <i className='fa-brands fa-linkedin fa-1x'></i>
                  <span>linkedIn</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${props.information.phone}`}
                  title='Whatsapp'
                  target='_blank'
                >
                  <i className='fa-brands fa-whatsapp fa-1x'></i>
                  <span>whatsapp</span>
                </a>
              </li>
              <li>
                <a href={props.links.telegram} title='Telegram' target='_blank'>
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
  );
}
export default Profile;
