import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Menu from './components/Menu/Menu';
import PostList from './components/PostList/PostList';
import Contact from './components/Contact/Contact';
import About from './components/About/About';
import Login from './components/Login/Login';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'highlightjs/styles/default.css';
import './styles/App.css';

class App extends Component {
    render() {
        return (
            <section className="app p-grid">
                <header className="p-col-12 p-md-6">Hack The Web</header>
                <Menu></Menu>
                <main className="p-md-offset-2 p-md-8 p-col-12">
                    <Switch>
                        <Route exact path="/" component={ PostList }></Route>
                        <Route exact path="/contact" component={ Contact }></Route>
                        <Route exact path="/about" component={ About }></Route>
                        <Route exact path="/login" component={ Login }></Route>
                    </Switch>                
                </main>
            </section>
        );
    }
}

export default App;
