import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: 'AIzaSyBJvbuyfABcvCHyf54Mqaq_3FLEembBJM8',
    authDomain: 'hack-the-web.firebaseapp.com',
    databaseURL: 'https://hack-the-web.firebaseio.com',
    projectId: 'hack-the-web'    
};

const app = firebase.initializeApp(config);

export const db = app.database();
export const postsRef = db.ref('posts');
export const feedbacksRef = db.ref('feedbacks');

export default firebase;