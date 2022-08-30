import React, { Component } from 'react';
import Posts from '../Post/Post';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <main>
        <h4 className='hint'>
          <span></span>
        </h4>
        {/* <div className={userPosts !== null ? 'container-body' : 'hide'}>
          {userPosts}
        </div> */}
      </main>
    );
  }
}
export default Home;
