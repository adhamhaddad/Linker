import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
    currentYear = () => {
        // Divide Date.now() with a year
        let years = new Date().getFullYear();
        
        return years;
    }

    render() {
        return (
            <footer>
                <span>
                    copyrights&copy; 2020 - {this.currentYear()}
                    <a href="https://www.linkedin.com/in/adhamashraf/" target='_blank' rel='noreferrer'>
                        <strong>adham ashraf</strong>
                    </a>
                    all rights reserved.
                </span>
            </footer>
        )
    }
}
export default Footer;