import { postsRef } from '../firebase';

class PostService {
    addPost(title, content, language) {
        const post = {
            title, content, language, 
            timestamp: new Date().getTime()
        };

        postsRef.push(post);
    }

    updatePost(title, content, language, id) {
        const post = {
            title, content, language
        };
        
        postsRef.child(id).update(post);
    }

    subscribeForPosts(callback) {
        postsRef.on('value', snapshot => {
            let data = snapshot.val(),
                posts = [];
            
            if (data) {
                for (let id of Object.keys(data)) {
                    data[id].id = id;
                    posts.push(data[id]);
                }
                
                posts.sort(function(a, b) {
                    return b.timestamp - a.timestamp;
                });
            }

            callback(posts);
        });
    }

    unsubscribeForPosts() {
        postsRef.off();
    }
}

export const languageOptions = [
    { label: '#JavaScript', value: 'javascript' },
    { label: '#CSS', value: 'css' },
    { label: '#HTML', value: 'html' },
    { label: '#Java', value: 'java' },
];

const postService = new PostService();
export default postService;