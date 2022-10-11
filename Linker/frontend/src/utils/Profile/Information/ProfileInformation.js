import React from 'react';
import './ProfileInformation.css';

function ProfileInformation(props) {
  return (
    <div className='user-info'>
      <ul>
        <li>
          <i className='fa-solid fa-briefcase fa-1x'></i>
          <span>works at {props.information.work}</span>
        </li>
        <li>
          <i className='fa-solid fa-graduation-cap fa-1x'></i>
          <span>college {props.information.education}</span>
        </li>
        <li>
          <i className='fa-solid fa-heart fa-1x'></i>
          <span>relationship {props.information.relation}</span>
        </li>
        <li>
          <i className='fa-solid fa-home fa-1x'></i>
          <span>lives in {props.information.lives}</span>
        </li>
      </ul>
    </div>
  );
}
export default ProfileInformation;
