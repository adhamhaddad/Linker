import React from 'react';
import './ProfileLinks.css';

function ProfileLinks(props) {
  return (
    <div className='links-section'>
      <h3>
        <i className='fa-solid fa-link fa-1x'></i>
        <span>links</span>
      </h3>
      <ul>
        <li>
          <a
            href={props.links.facebook}
            title='Facebook'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-facebook fa-1x'></i>
            <span>facebook</span>
          </a>
        </li>
        <li>
          <a
            href={props.links.twitter}
            title='Twitter'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-twitter fa-1x'></i>
            <span>twitter</span>
          </a>
        </li>
        <li>
          <a
            href={props.links.instagram}
            title='Instagram'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-instagram fa-1x'></i>
            <span>instagram</span>
          </a>
        </li>
        <li>
          <a
            href={props.links.linkedin}
            title='LinkedIn'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-linkedin fa-1x'></i>
            <span>linkedIn</span>
          </a>
        </li>
        <li>
          <a
            href={`tel:${props.links.phone}`}
            title='Whatsapp'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-whatsapp fa-1x'></i>
            <span>whatsapp</span>
          </a>
        </li>
        <li>
          <a
            href={props.links.telegram}
            title='Telegram'
            target='_blank'
            rel='noreferrer'
          >
            <i className='fa-brands fa-telegram fa-1x'></i>
            <span>telegram</span>
          </a>
        </li>
      </ul>
    </div>
  );
}
export default ProfileLinks;
