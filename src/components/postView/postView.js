import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPost, commentPost, likePost } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';

import Editor from 'draft-js-plugins-editor';
import { EditorState, getDefaultKeyBinding } from 'draft-js';
import createFocusPlugin from 'draft-js-focus-plugin';

import './postView.css';
import '../../Draft.css';

const focusPlugin = createFocusPlugin();
const _ = require('lodash');

class PostView extends Component {
    constructor() {
        super();
        this.state = {
            editorState: EditorState.createEmpty()
        }
        this.genCommentKey = this.genCommentKey.bind(this);
        this.handleKeyCommand = this.handleKeyCommand.bind(this); 
        this.likePost = this.likePost.bind(this);
    }
    componentWillMount() {
        this.props.getPost(this.props.match.params.id);
    }

    onChange = (editorState) => {
        this.setState({editorState});
    }

    likePost = (like) => {
        this.props.likePost(this.props.post._id, like);
    }

    focus = () => {
        this.editor.focus();
    }

    genCommentKey = (index) => {
        return `${this.props.post._id}_${index}_${new Date().getTime() }`;
    }

    myKeyBindingFn = (event) => {
        if(event.keyCode === 13 && !event.shiftKey) {
            return 'publish-comment';
        }
        return getDefaultKeyBinding(event);
    }

    handleKeyCommand(command) {
        if (command === 'publish-comment') {
            let data = {
                author: this.props.user,
                text: this.state.editorState.getCurrentContent().getPlainText()
            }
            this.props.commentPost(data, this.props.post._id);
            this.setState({editorState: EditorState.createEmpty()});
            return 'handled';
        }
        return 'not-handled';
    }

    render() {
        let post, comments;
        if (!_.isEmpty(this.props.post)) {
            post = 
                <div className="post-info">
                    <h1 className="title"> {this.props.post.title} </h1>
                    <span className="description"> {this.props.post.description} </span>
                    <div className="post-subinfo">
                        <img className="provider_img" src={this.props.post.author.provider_img} alt="provider_img"/>
                        <div>
                            <Link className="post-author" to={`/profile/${this.props.post.author._id}`}>{this.props.post.author.name}</Link>  <br/>
                            <span className="post-timestamp">{new Date(parseInt(this.props.post._id.substring(0,8), 16) * 1000).toDateString()}</span>
                        </div>
                        <div className="post-likes">
                            <i className="fas fa-angle-double-down" onClick={()=>this.likePost(false)}></i>
                            <span> &nbsp; {this.props.post.likes} &nbsp; </span>
                            <i className="fas fa-angle-double-up" onClick={()=>this.likePost(true)}></i>
                        </div>
                    </div>
                    
                    {this.props.post.feature_img.length > 0 ? 
                        <div style={{width: 100 +'%', textAlign: 'center'}}>
                            <img style={{maxWidth: 100+'%'}} src={this.props.post.feature_img} alt="Thumb" /> 
                        </div> : ''
                    }
                    <p>{this.props.post.text}</p>
                </div>;
            
            comments = this.props.post.comments.slice().reverse().map((comment,index) => 
                <div className="comment" key={this.genCommentKey(index)}>
                    <Link className="comment-author" to={`/profile/${comment.author._id}`}>{comment.author.name}</Link>
                    <p className="comment-content">{comment.text}</p>
                </div>
            )
        }

        return (
            <div className="postView extsection">
                <div className="subsection">
                    {post}
                    <br />
                    <div className="comment-section">
                        <span>Comments</span>
                        <div className="commentBox" onClick={this.focus}>
                            <Editor 
                                placeholder = {`Write a comment`}
                                editorState = {this.state.editorState}
                                onChange = {this.onChange}
                                plugins={[focusPlugin]}
                                ref={(element) => {this.editor = element;}}
                                handleKeyCommand={this.handleKeyCommand}
                                keyBindingFn = {this.myKeyBindingFn}
                            />
                        </div>
                        {comments}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        post: state.posts.post,
        user: state.authUser.user
    }
}

export default connect(mapStateToProps, { getPost, commentPost, likePost }) (PostView);