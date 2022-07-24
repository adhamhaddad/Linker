import React, { Component } from 'react';
import './Settings.css';
import Informations from './Informations/Informations';

class Settings extends Component {
    render() {
        return (
            <div className='container'>
                <aside>
                    <ul>
                        <li>
                            <a href='#'>
                                <i></i>
                                <span>informations</span>
                            </a>
                        </li><li>
                            <a href='#'>
                                <i></i>
                                <span>privacy</span>
                            </a>
                        </li><li>
                            <a href='#'>
                                <i></i>
                                <span>emails</span>
                            </a>
                        </li><li>
                            <a href='#'>
                                <i></i>
                                <span>notifications</span>
                            </a>
                        </li><li>
                            <a href='#'>
                                <i></i>
                                <span>language</span>
                            </a>
                        </li><li>
                            <a href='#'>
                                <i></i>
                                <span>account</span>
                            </a>
                        </li>
                    </ul>
                </aside>
                <section>
                    <Informations />
                </section>
            </div>
        )
    }
}
export default Settings;