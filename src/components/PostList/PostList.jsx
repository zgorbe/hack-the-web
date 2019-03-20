import React, { Component } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Button } from 'primereact/button';
import { SelectButton } from 'primereact/selectbutton';
import Post from './Post';
import withAuth from '../Auth/WithAuth';
import hljs from 'highlightjs';
import PostService, { languageOptions } from '../../services/PostService';

class PostList extends Component {
    state = {
        postList: [],
        loading: true,
        languageFilter: []
    }

    constructor(props) {
        super(props);
        this.postList = React.createRef();    
    }

    componentDidMount = () => {
        PostService.subscribeForPosts(posts => {
            this.originalList = posts;

            this.setState({
                postList: posts,
                loading: false
            });

            this.updateHighlighting();        
        });
    }

    componentWillUnmount() {
        PostService.unsubscribeForPosts();
    }
    
    filterOutNewPost = () => {
        return this.state.postList.filter(post => post.id !== 'new');
    }

    updateHighlighting = () => {
        this.postList.current.querySelectorAll('.post pre').forEach(block => {
            hljs.highlightBlock(block);
        });
    }

    handleNewClick = () => {
        const postList = this.filterOutNewPost();

        const newPost = {
            id: 'new',
            title: '',
            content: '',
            language: '',
            edited: true
        };

        this.setState({
            postList: [ newPost ].concat(postList)
        });
    }

    handleLanguageFilter = (e) => {
        const languageFilter = e.value,
            postList = this.originalList;

        this.setState({
            languageFilter: languageFilter,
            postList: languageFilter.length ? postList.filter(post => languageFilter.includes(post.language)) : postList
        }, () => {
            this.updateHighlighting();
        });
    }
    render() {
        const { authenticated } = this.props;
        const { loading, postList, languageFilter } = this.state;
        return (
            <section className="posts" ref={ this.postList }>
                <header>
                    { !loading &&
                        <div>
                            <SelectButton value={ languageFilter } multiple={ true } options={ languageOptions } onChange={ this.handleLanguageFilter } />
                            { authenticated && 
                                <Button label="New" onClick={ this.handleNewClick }></Button>
                            }
                        </div>
                    }
                </header>
                {
                    loading && <ProgressBar mode="indeterminate" />
                }
                {
                    !loading && postList.map(post => {
                        return <Post
                            key={ post.id }
                            id={ post.id }
                            title={ post.title }
                            content={ post.content }
                            language={ post.language }
                            timestamp={ post.timestamp }
                            edited= { post.edited }
                            authenticated={ authenticated }>
                        </Post>
                    })
                }
                {
                    !loading && !postList.length &&
                    <p className="no-posts">There is no post to display!</p>
                }
            </section>
        );
    }
}
 
export default withAuth(PostList);