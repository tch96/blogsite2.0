const postCtrlr = require('../controllers/posts.ctrl');
const multipartWare = require('connect-multiparty')();

module.exports = (router) => {
    router.route('/posts')
    .get(postCtrlr.getAllPosts);

    router.route('/create')
    .post(multipartWare, postCtrlr.addPost);

    router.route('/post/like')
    .post(postCtrlr.likePost);

    router.route('/post/comment')
    .post(postCtrlr.commentPost);

    router.route('/post/:id')
    .get(postCtrlr.getPost)
}