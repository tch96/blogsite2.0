const user = require('./users.routes');
const post = require('./posts.routes');

module.exports = (router) => {
    user(router);
    post(router);
}