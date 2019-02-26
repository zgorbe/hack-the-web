import React, { Component } from 'react';
class Menu extends Component {
    state = {  }
    render() { 
        return ( 
            <nav className="menu p-col-12 p-md-6">
                <ul>
                    <li><a href="#/">Posts</a></li>
                    <li><a href="#/contact">Contact</a></li>
                    <li><a href="#/about">About</a></li>
                </ul>
            </nav>
        );
    }
}
 
export default Menu;