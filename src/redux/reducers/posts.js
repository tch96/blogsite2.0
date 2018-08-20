import { Filter } from '../../App'; 

const initialState = {
    posts: [],
    post: {},
    filter: 0,
}

export default (state=initialState, action) => {
    let post;
    switch (action.type) {
        case 'LOAD_POSTS':
            let posts = action.posts.slice();
            switch (parseInt(action.filter, 10)) {
                case Filter.TIME:
                    posts.sort(function(a, b) {
                        let timestampA = a._id.toString().substring(0,8);
                        let timestampB = b._id.toString().substring(0,8);
                        // convert ObjectId into datetime
                        return parseInt(timestampA, 16) - parseInt(timestampB, 16);
                    })
                break;
                case Filter.RATING:
                    posts.sort(function(a,b) {
                        return a.likes-b.likes
                    })
                break;
                case Filter.FRIENDS:
                    posts.sort(function(a,b) {
                        let subbedToA = a.author.subscribers.includes(action._id);
                        let subbedToB = b.author.subscribers.includes(action._id);
                        return subbedToA - subbedToB;
                    })
                break;
                default: // do Nothing
            }
            return {
                ...state,
                posts: posts,
                filter: action.filter,
            }
        case 'VIEW_POST':
            return {
                ...state,
                post: action.post
            }
        case 'LIKE_POST':
            post = Object.assign({}, state.post);
            action.like ? post.likes++ : post.likes--;
            return {
                ...state,
                post: post
            }
        case 'COMMENT_POST':
            post = Object.assign({}, state.post);
            if (Object.keys(post).length > 0) {
                post.comments.push(action.comment_data);
            }
            return {
                ...state,
                post: post
            }
        
        case 'FILTER_POSTS': 
            return {
                ...state,
                filter: action.filter
            }
        default:
            return state;
    }
}