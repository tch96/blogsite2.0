import { combineReducers } from 'redux';
import posts from './reducers/posts';
import authUser from './reducers/authUser';
import common from './reducers/common';
import { routerReducer } from 'react-router-redux';

export default combineReducers({
    posts,
    authUser,
    common,
    router: routerReducer
})