import React from 'react';
import firebase from '../../firebase';

const withAuth = WrappedComponent => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            
            this.state = {
                authenticated: false
            };

            this._mounted = false;
        }

        componentDidMount() {
            this._mounted = true;
            this.removeAuthListener = firebase.auth().onAuthStateChanged(user => {
                if (this._mounted) {
                    this.setState({ authenticated: !!user });
                }
            });
        }
        
        componentWillUnmount() {
            this._mounted = false;
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