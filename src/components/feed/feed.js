import React, {Component} from 'react';
import { connect } from 'react-redux';
import { loadPosts, filterPosts } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './feed.css';

class Feed extends Component {
    componentWillMount() {
        const _id = Object.keys(this.props.user).length > 0 ? this.props.user._id : '';
        this.props.loadPosts(_id, this.props.filter);
    }

    render() {
        const posts = this.props.posts.slice().reverse().map((post) =>
            <div className="post" key={post._id}>
                <Link to={`/post/${post._id}`} className="post-title"> {post.title} </Link>

                {post.feature_img.length > 0 ? 
                        <div style={{width: 100 +'%', textAlign: 'center'}}>
                            <img style={{maxWidth: 100+'%'}} src={post.feature_img} alt="Thumb" /> 
                        </div> : ''
                }

                <p>{post.description}</p>

                <div className="post-subinfo">
                    <img className="provider_img" src={post.author.provider_img} alt="provider_img"/>
                    <div>
                        <Link className="post-author" to={`/profile/${post.author._id}`}>{post.author.name}</Link>  <br/>
                        <span className="post-timestamp">{new Date(parseInt(post._id.substring(0,8), 16) * 1000).toDateString()}</span>
                    </div>
                </div>
            </div>
        )

        return (
            <div className="feed">
                {posts}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        posts: state.posts.posts,
        user: state.authUser.user,
        filter: state.posts.filter,
    }
}

export default connect(mapStateToProps, { loadPosts, filterPosts })(Feed);