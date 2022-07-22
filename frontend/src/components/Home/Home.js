import React, { Component } from "react";
import Posts from '../Posts/Posts';
import './Home.css';

class Home extends Component {
    render() {
        return (
            <main>
                <h4 className='hint'>
                    <span></span>
                </h4>
                <Posts/>
            </main>
        )
    }
}
export default Home;