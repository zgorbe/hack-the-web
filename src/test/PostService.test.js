import PostService from '../services/PostService';

it('Should subscribe for posts', done => {
    PostService.subscribeForPosts(posts => {
        expect(Array.isArray(posts)).toBe(true);
        PostService.unsubscribeForPosts();
        done();
    });
});
