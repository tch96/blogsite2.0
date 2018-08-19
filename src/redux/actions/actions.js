import axios from 'axios';

const url ="/api/";

export function loadPosts(_id, filter) {
    return (dispatch) => {
        axios.get(`${url}posts`).then((res) => {
            let posts = res.data;
            dispatch({type:'LOAD_POSTS', posts:posts, _id:_id, filter: filter});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function filterPosts(filter) {
    return (dispatch) => {
        dispatch({type: 'FILTER_POSTS', filter});
    }
}

export function getUser(_id) {
    return axios.get(`${url}user/${_id}`).then((res) => {
        return res.data;
    }).catch((err) => {
        console.log(err);
    })
}

export function getUserProfile(_id) {
    return (dispatch) => {
        axios.get(`${url}user/profile/${_id}`).then((res) => {
            let profile = res.data;
            dispatch({type: 'SET_PROFILE', profile})
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function getPost(post_id) {
    return (dispatch) => {
        axios.get(`${url}post/${post_id}`).then((res) => {
            let post = res.data;
            dispatch({type: 'VIEW_POST', post})
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function likePost(post_id, like) {
    return (dispatch) => {
        axios.post(`${url}post/like`, {post_id, like}).then((res) => {
            dispatch({type: 'LIKE_POST', like});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function commentPost(comment_data, post_id) {
    return (dispatch) => {
        let comment_meta = {
            author_id: comment_data.author._id,
            text: comment_data.text,
            post_id: post_id
        }
        console.log(comment_data, 'comment_data');
        axios.post(`${url}post/comment`, comment_meta).then(() => {
            dispatch({type:'COMMENT_POST', comment_data});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function subscribeToUser(id, user_data) {
    return (dispatch) => {
        console.log(user_data);
        let user_id = user_data._id
        axios.post(`${url}user/subscribe`, {id, user_id}).then((res) => {
            dispatch({type: 'SUB_TO_USER', user_data});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function unsubToUser(id, user_id) {
    return (dispatch) => {
        axios.post(`${url}user/unsubscribe`, {id, user_id}).then((res) => {
            dispatch({type: 'UNSUB_TO_USER', user_id});
        }).catch((err) => {
            console.log(err);
        })
    }
}

export function SignInUser (user_data) {
    return (dispatch) => {
        axios.post(`${url}user`, user_data).then((res)=> {
            let user = res.data;
            sessionStorage.setItem('Auth', JSON.stringify(user));
            dispatch({type: 'SET_USER', user})
        }).catch((err) => {
            console.log(err);
        })
    }
}
export function LogoutUser () {
    return (dispatch) => {
        sessionStorage.removeItem('Auth');
        dispatch({type: 'LOGOUT_USER'});
    }
}

export function toggleClose() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: false});
    }
}

export function toggleOpen() {
    return (dispatch) => {
        dispatch({type: 'TOGGLE_MODAL', modalMode: true});
    }
}