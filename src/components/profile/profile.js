import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserProfile, subscribeToUser, unsubToUser, toggleSubsOpen, toggleSubsClose} from '../../redux/actions/actions';
import './profile.css';
import { Link } from 'react-router-dom';
const _ = require('lodash');

class Profile extends Component {
    componentWillMount() {
        this.props.getUserProfile(this.props.match.params.id);
    }
    componentDidUpdate(prevProps) {
        if (prevProps.match.params.id !== this.props.match.params.id) {
            this.props.getUserProfile(this.props.match.params.id);
            this.props.toggleSubsClose();
        }
    }
    componentWillUnmount() {
        this.props.toggleSubsClose();
    }
    render() {
        let posts, profile;
        if (!_.isEmpty(this.props.profile)) {
            const user = this.props.profile.user;
            const currentUser = this.props.user;
            let isSubscriber = (Object.keys(currentUser).length > 0) ?  ((_.findIndex(currentUser.subscribedTo, {_id: user._id}) > -1) ? true : false) : false ;
            let isSelf = (currentUser._id === user._id) ? true : false;
            profile =  
                <div className="user">
                    <img className="user-pic" src={user.provider_img} alt="user_pic"/>
                    <div className="user-info">
                        <h2 className="user-name"> {user.name} </h2>
                        <h3 className="user-email"> {user.email} </h3>
                        <h3> 
                            <span className="toggleSubs" onClick={() => this.props.toggleSubsOpen(true)}>
                                Subscribers:&nbsp;{user.subscribers.length}
                            </span> 
                            &emsp; 
                            <span className="toggleSubs" onClick={() => this.props.toggleSubsOpen(false)}>
                                Subscribed:&nbsp;{user.subscribedTo.length}
                            </span> 
                        </h3>
                        <button 
                            onClick={() => this.props.subscribeToUser(currentUser._id, {_id: user._id, provider_img: user.provider_img, name: user.name})} 
                            className={`sub-button ${(isSubscriber || isSelf || (Object.keys(currentUser).length<=0)) ? 'hidden' : ''}`}
                            style={{backgroundColor:'#435078'}}
                        > <i className="fas fa-plus"></i> &nbsp;Subscribe </button>
                        <button 
                            onClick={()=>this.props.unsubToUser(currentUser._id, user._id)} 
                            className={`sub-button ${(!isSubscriber || isSelf || (Object.keys(currentUser).length<=0)) ? 'hidden':''}`}
                            style={{backgroundColor:'lightskyblue'}}
                        > <i className="fas fa-minus"></i> &nbsp; Unsubscribe </button>
                    </div>
                </div>;

            posts = this.props.profile.posts.slice().reverse().map((post) =>
                <div className="post" key={post._id}>
                    <Link to={`/post/${post._id}`} className="post-title"> {post.title} </Link>
                    {post.feature_img.length > 0 ? 
                        <div style={{width: 100 +'%', textAlign: 'center'}}>
                            <img style={{maxWidth: 100+'%'}} src={post.feature_img} alt="Thumb" /> 
                        </div> : ''
                    }

                    <p>{post.description}</p>
                </div>
            )
        }
        
        
        return (
            <div className="profileView extsection">
                <div className="subsection">
                {profile}
                <div className="profile-posts">
                    {posts}
                </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        profile: state.authUser.profile
    }
}

export default connect(mapStateToProps, {
    getUserProfile, 
    subscribeToUser,
    unsubToUser,
    toggleSubsOpen,
    toggleSubsClose
}) (Profile);