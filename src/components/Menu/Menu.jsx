import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function Menu(props) {
    const [location, setLocation] = useState(props.location.pathname);

    useEffect(() => {
        const unlisten = props.history.listen(loc => {
            setLocation(loc.pathname);
        });
        return function unsubscribe() {
            unlisten();
        };
    });

    return ( 
        <nav className="menu p-col-12 p-md-6">
            <ul>
                <li className={ location === '/' ? 'active' :  '' }><a href="#/">Posts</a></li>
                <li className={ location === '/contact' ? 'active' :  ''}><a href="#/contact">Contact</a></li>
                <li className={ location === '/about' ? 'active' :  '' }><a href="#/about">About</a></li>
            </ul>
        </nav>
    );
}
 
export default withRouter(Menu);