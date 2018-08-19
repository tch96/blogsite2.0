import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import axios from 'axios';
import Editor from 'draft-js-plugins-editor';
import { EditorState, RichUtils, Modifier} from 'draft-js';
import createFocusPlugin from 'draft-js-focus-plugin';
import './writer.css';

const focusPlugin = createFocusPlugin();

class Writer extends Component {
    constructor () {
        super();
        this.state = {
          title: '',
          description: '',
          editorState: EditorState.createEmpty(),
          feature_img: null,
          published: false,
        }
        this.publishPost = this.publishPost.bind(this);
        this.handleTab = this.handleTab.bind(this);
        this.titleChangeHandler = this.titleChangeHandler.bind(this);
        this.descChangeHandler = this.descChangeHandler.bind(this);
        this.imgChangeHandler = this.imgChangeHandler.bind(this);
    }
    handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);

        if ( newState ) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }
    handleTab = (event) => {
        event.preventDefault();
        let currentState = this.state.editorState;
        let newContentState = Modifier.replaceText(
            currentState.getCurrentContent(),
            currentState.getSelection(),
            '\t'
        )
        this.setState({
            editorState: EditorState.push(currentState, newContentState, 'insert-characters')
        })
    }
    publishPost() {
        const url = '/api/';
        const formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('text', this.state.editorState.getCurrentContent().getPlainText('\n'));
        formData.append('image', this.state.feature_img);
        formData.append('likes', 0);
        formData.append('description', this.state.description);
        formData.append('author_id', this.props.user._id);

        console.log(this.state.editorState.getCurrentContent().getPlainText(), 'text');
       
        axios.post(`${url}create`, formData).then(() => {
            console.log('post published');
            this.setState({published: true});
        })
    }
    onChange = (editorState) => {
        this.setState({editorState});
    }

    titleChangeHandler = (event) => {
        this.setState({title: event.target.value});
    }
    descChangeHandler = (event) => {
        this.setState({description: event.target.value});
    }
    imgChangeHandler = (event) => {
        console.log('file set');
        this.setState({feature_img: event.target.files[0]});

    }
    focus = () => {
        this.editor.focus();
    }

    render() {
        if (this.state.published) {
            return <Redirect to='/' />
        }

        return (
            <div>
                <input type="text" placeholder="Enter Title Here" onChange={this.titleChangeHandler}/> <br />
                <input type="textarea" placeholder="Enter Description Here" onChange={this.descChangeHandler}/> <br />
                <input type="file" id="imgUpload" accept="image/x-png,image/gif,image/jpeg" style={{visibility: 'hidden', width:0}} onChange={this.imgChangeHandler} />
                <label className="uploadIcon" htmlFor="imgUpload">Upload Feature Image</label><br/>
                {this.state.feature_img != null ? <img src={URL.createObjectURL(this.state.feature_img)} alt="preview_img"/> : '' }

                <div className="writer" onClick={this.focus}>
                    <Editor
                        placeholder = {`Write your story`}
                        editorState = {this.state.editorState}
                        onChange = {this.onChange}
                        handleKeyCommand = {this.handleKeyCommand}
                        spellCheck = {true}
                        plugins={[focusPlugin]}
                        onTab={this.handleTab}
                        ref={(element) => {this.editor = element;}}
                    />
                </div>
                <button onClick={this.publishPost}> Post </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser.user
    }
}

export default connect(mapStateToProps)(Writer);