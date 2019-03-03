import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import { Messages } from 'primereact/messages';
import hljs from 'highlightjs';
import PostService, { languageOptions } from '../../services/PostService';

class Post extends Component {
    state = {
        edited: this.props.edited,
        title: this.props.title,
        content: this.props.content,
        language: this.props.language
    }
   
    constructor(props) {
        super(props);
        this.postElement = React.createRef();
    }

    toggleEdit = () => {
        this.setState({
            edited: !this.state.edited
        }, () => {
            this.postElement.current.querySelectorAll('pre').forEach(block => {
                hljs.highlightBlock(block);
            });
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.edited !== this.state.edited) {
            this.setState({ edited: nextProps.edited });
        }
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.currentTarget.value });
    }
    
    handleContentChange = (e) => {
        this.setState({ content: e.htmlValue });
    }

    handleLanguageChange = (e) => {
        this.setState({ language: e.value });
    }

    handleSave = () => {
        const { title, content, language } = this.state;
        const id  = this.props.id;

        if (title.length && content.length) {
            const saveFn = id !== 'new' ? 'updatePost' : 'addPost'; 

            PostService[saveFn](title, content, language, id);
        } else {
            this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed!', sticky: true });
        }
    }
    
    renderHTML = (rawHTML) => React.createElement('div', { dangerouslySetInnerHTML: { __html: rawHTML } });

    render() { 
        const { id, authenticated, timestamp } = this.props;
        const { edited, title, content, language } = this.state;
        const footer = 
            <div>
                { new Date(timestamp).toLocaleDateString() }
                { authenticated && <span className="pi pi-pencil" onClick={ this.toggleEdit }></span> }
            </div>;

        return (
            <div className="post" ref={ this.postElement }>
                { !edited && id !== 'new' &&
                    <Card title={ title } footer={ footer }>
                        { this.renderHTML(content) }
                    </Card>
                }
                
                { edited && 
                    <form className="edit-form">
                        <Messages ref={ el => this.messages = el } />
                        <InputText value={ title } onChange={ this.handleTitleChange }></InputText>
                        <Editor value={ this.props.content } onTextChange={ this.handleContentChange }></Editor>
                        <SelectButton value={ language } options={ languageOptions } onChange={ this.handleLanguageChange } />
                        <div className="buttons">
                            <Button type="button" label="Save" icon="pi pi-check" className="p-button-warning" onClick={ this.handleSave } />
                            <Button type="button" label="Cancel" className="p-button-secondary" onClick={ this.toggleEdit }/>
                        </div>
                    </form>
                }
            </div>
        );
    }
}

Post.propTypes = {
    id: PropTypes.string,
    authenticated: PropTypes.bool.isRequired,
    edited: PropTypes.bool,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    timestamp: PropTypes.number
}

export default Post;