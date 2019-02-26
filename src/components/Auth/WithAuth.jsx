import React from 'react';
import firebase from '../../firebase';

const withAuth = WrappedComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            
            this.state = {
                authenticated: false
            };
        }

        componentWillMount() {
            this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
                this.setState({ authenticated: !!user });
            });
        }
        
        componentWillUnmount() {
            this.removeAuthListener();
        }

        render() {
            const { authenticated } = this.state;
            
            return (
                <WrappedComponent{ ...this.props } authenticated={ authenticated } />
            );
        }
    }
};

export default withAuth;