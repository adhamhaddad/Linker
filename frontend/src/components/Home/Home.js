import React, { Component } from "react";
import Posts from '../Posts/Posts';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <div>
                <h4 className='hint'>
                    <span></span>
                </h4>
                <div className='container-body'>
                    <Posts/>
                </div>
            </div>
        )
    }
}
export default Home;