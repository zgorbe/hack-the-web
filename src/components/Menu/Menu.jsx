import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Maybe the Menu component could be implemented as a function component with Hooks?
class Menu extends Component {
    state = {
        location: this.props.location.pathname
    }

    componentWillMount = () => {
        this.unlisten = this.props.history.listen(location => {
            this.setState({
                location: location.pathname
            });
        });
    }
    componentWillUnmount = () => {
        this.unlisten();
    }

    // it looks ugly how it's called from jsx, should be refactored
    getActiveClass = location => this.state.location === location ? 'active' : '';

    render() { 
        return ( 
            <nav className="menu p-col-12 p-md-6">
                <ul>
                    <li className={ this.getActiveClass('/') }><a href="#/">Posts</a></li>
                    <li className={ this.getActiveClass('/contact') }><a href="#/contact">Contact</a></li>
                    <li className={ this.getActiveClass('/about') }><a href="#/about">About</a></li>
                </ul>
            </nav>
        );
    }
}
 
export default withRouter(Menu);