const _ = require('lodash');

const initialState = {
    user: {},
    authenticated: false,
    profile: {}
}

export default (state=initialState, action) => {
    let user, profile;
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
                authenticated: Object.keys(action.user).length > 0 ? true: false
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                user: {},
                authenticated: false,
            }
        case 'SUB_TO_USER':
            user = Object.assign({}, state.user);
            user.subscribedTo.push(action.user_data);
            
            profile = Object.assign({}, state.profile);
            if (Object.keys(profile).length > 0) profile.user.subscribers.push({_id:state.user._id, provider_img: state.user.provider_img, name:state.user.name});
            sessionStorage.setItem('Auth', JSON.stringify(user));
            return {
                ...state,
                user: user,
                profile: profile
            }
        case 'UNSUB_TO_USER':
            user = Object.assign({}, state.user);
            let index =_.findIndex(user.subscribedTo, {_id: action.user_id})
            if (index > -1) user.subscribedTo.splice(index, 1);
            
            profile = Object.assign({}, state.profile);
            if (Object.keys(profile).length > 0) {
                let index_subs =_.findIndex(profile.user.subscribers, {_id: state.user._id})
                if (index_subs > -1 ) profile.user.subscribers.splice(index_subs, 1);
            }
            sessionStorage.setItem('Auth', JSON.stringify(user));
            return {
                ...state,
                user: user,
                profile: profile
            }
        case 'SET_PROFILE':
            return {
                ...state,
                profile: action.profile
            }
        default:
            return state;
    }
}