import React, { Component } from 'react';
import { Card } from 'primereact/card';

class About extends Component {
    state = {  }
    render() { 
        return ( 
            <Card title="Hello, I am Zoltan." className="about">
                <a className="github" href="https://github.com/zgorbe/hack-the-web" target="_blank" rel="noopener noreferrer">
                    <img src="https://github.blog/wp-content/uploads/2008/12/forkme_right_gray_6d6d6d.png?resize=149%2C149" alt="Fork me on GitHub" />
                </a>
                <p>I am a web UI developer.</p>
                <p>This is a simple blog site created as a pet project with React.</p>
                <p>Your <a href="/#/contact">feedback</a> is welcome.</p>
            </Card>
        );
    }
}
 
export default About;