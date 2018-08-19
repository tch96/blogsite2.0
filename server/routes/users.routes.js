const userCtrlr = require('./../controllers/users.ctrl')

module.exports = (router) => {

    /**
     * get a user
     */
    router.route('/user/:id')
        .get(userCtrlr.getUser)

    /**
     * get a user profile
     */
    router.route('/user/profile/:id')
        .get(userCtrlr.getUserProfile)

    /**
     * adds a user
     */
    router.route('/user')
        .post(userCtrlr.addUser)

    /**
     * follow a user
     */
    router.route('/user/subscribe')
        .post(userCtrlr.subscribeToUser)
    
        // Unfollow User
    router.route('/user/unsubscribe')
        .post(userCtrlr.unsubToUser)
}
