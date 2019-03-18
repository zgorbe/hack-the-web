import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Messages } from 'primereact/messages';
import FeedbackService from '../../services/FeedbackService';
import Post from '../PostList/Post';
import withAuth from '../Auth/WithAuth';

const EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Contact extends Component {
    state = {
        email: '',
        content: '',
        isEmailValid: true,
        isContentValid: true,
        feedbackList: []
    }
   
    componentWillMount = () => {
        FeedbackService.subscribeForFeedbacks(feedbacks => {
            this.setState({
                feedbackList: feedbacks
            });
        });
    }

    componentWillUnmount() {
        FeedbackService.unsubscribeForFeedbacks();
    }

    handleEmailChange = (e) => {
        this.setState({ email: e.currentTarget.value });
    }

    handleContentChange = (e) => {
        this.setState({ content: e.htmlValue });
    }

    _validate = () => {
        const isEmailValid = EMAIL_REGEXP.test(String(this.state.email).toLowerCase()),
            isContentValid = !!this.state.content.length;

        this.setState({
            isEmailValid,
            isContentValid
        });

        return isEmailValid && isContentValid;
    }

    handleSend = () => {
        if (this._validate()) {
            FeedbackService.addFeedback(this.state.email, this.state.content);
            this.messages.show({ severity: 'success', summary: 'Feedback sent', detail: 'Thank you!' });
            setTimeout(() => {
                this.handleCancel();
            }, 3000);
        } else {
            this.messages.show({ severity: 'error', summary: 'Error Message', detail: 'Validation failed!' });
        }
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    render() {
        const { email, content, isEmailValid, isContentValid, feedbackList } = this.state;
        const { authenticated } = this.props;

        return (
            <section className="contact-form">
                <Card title="Send feedback">
                    <Messages ref={ el => this.messages = el } />
                    <InputText type="email" 
                        placeholder="Your email address" 
                        className={ 'email-input' + (isEmailValid ? '' : ' error') } 
                        size="30" value={ email } 
                        onChange={ this.handleEmailChange }>
                    </InputText>
                    <Editor placeholder="Your feedback" 
                        style={ { height:'320px' } } 
                        value={ content } 
                        className={ isContentValid ? '' : 'error' }
                        onTextChange={ this.handleContentChange }>
                    </Editor>
                    <div className="buttons">
                        <Button type="button" label="Send" icon="pi pi-check" className="p-button-warning" onClick={ this.handleSend } />
                        <Button type="button" label="Cancel" className="p-button-secondary" onClick={ this.handleCancel }/>
                    </div>
                </Card>
                { 
                    authenticated && feedbackList.length > 0 &&
                    <h2>Feedbacks</h2>
                }
                {
                    authenticated && feedbackList.map((feedback, index) => {
                        return <Post
                            key={ index }
                            title={ feedback.email }
                            content={ feedback.content }
                            timestamp={ feedback.timestamp }
                            edited={ false }
                            authenticated={ false }>
                        </Post>
                    })
                }
            </section>
        );
    }
}
 
export default withRouter(withAuth(Contact));