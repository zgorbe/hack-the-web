import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Maybe the Menu component could be implemented as a function component with Hooks?
class Menu extends Component {
    constructor(props) {
        super(props);

        this.intialLocation = this.props.location.pathname;
    }
    // this should be refactored to use state instead of DOM (css class) to store the active menu item
    handleMenuClick = (e) => {
        const menuItem = e.currentTarget,
            menuList = menuItem.parentElement;
            
        for (let child of menuList.childNodes) {
            child.classList.remove('active');
        }

        menuItem.classList.add('active');
    }

    // this looks ugly how it's called from jsx, should be refactored
    getActiveClass = location => this.intialLocation === location ? 'active' : '';

    render() { 
        return ( 
            <nav className="menu p-col-12 p-md-6">
                <ul>
                    <li onClick={ this.handleMenuClick } className={ this.getActiveClass('/') }><a href="#/">Posts</a></li>
                    <li onClick={ this.handleMenuClick } className={ this.getActiveClass('/contact') }><a href="#/contact">Contact</a></li>
                    <li onClick={ this.handleMenuClick } className={ this.getActiveClass('/about') }><a href="#/about">About</a></li>
                </ul>
            </nav>
        );
    }
}
 
export default withRouter(Menu);