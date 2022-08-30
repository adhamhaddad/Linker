import React, { Component } from 'react';
import Posts from '../Posts/Posts';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <main>
        <h4 className='hint'>
          <span></span>
        </h4>
        <div className='container-body'>
          <Posts />
          <Posts />
          <Posts />
          <Posts />
          <Posts />
        </div>
      </main>
    );
  }
}
export default Home;
