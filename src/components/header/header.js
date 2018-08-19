import React, { Component } from 'react';
import { connect } from 'react-redux';
import './header.css';
import { toggleOpen, loadPosts } from '../../redux/actions/actions';
import { history } from '../../redux/store';
import { Link } from 'react-router-dom';
import { Filter } from '../../App';

class Header extends Component {
    constructor() {
        super();
        this.filterRecent = this.filterRecent.bind(this);
        this.filterRating = this.filterRating.bind(this);
        this.filterSubs = this.filterSubs.bind(this);
    }
    
    filterRecent() {
        const _id = Object.keys(this.props.user).length > 0 ? this.props.user._id : '';
        this.props.loadPosts(_id, Filter.TIME);
        history.push('/');
    }

    filterRating() {
        const _id = Object.keys(this.props.user).length > 0 ? this.props.user._id : '';
        this.props.loadPosts(_id, Filter.RATING);
        history.push('/');
    }

    filterSubs() {
        const _id = Object.keys(this.props.user).length > 0 ? this.props.user._id : '';
        this.props.loadPosts(_id, Filter.FRIENDS);
        history.push('/');
    }

    render() {
        return (
            <div className="header">
                <Link to={`/`} className="logo">BLOGSITE</Link>
                <ul className="filter-buttons">
                    <li className="filter" onClick={this.filterRecent}>Recent</li>
                    <li className="filter" onClick={this.filterRating}>Top</li>
                    <li className={`filter ${this.props.isAuth ? '':'hidden'}`} onClick={this.filterSubs}>Subscribed</li>  
                </ul>
                <a className={`header-button ${this.props.isAuth ? 'hidden':''}`} onClick={this.props.toggleOpen}>Signin/Signup</a>
                <Link to={`/editor`} className={`header-button ${this.props.isAuth ? '':'hidden'}`}> Editor </Link>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser.user,
        isAuth: state.authUser.authenticated
    }    
}

export default connect(mapStateToProps, {toggleOpen, loadPosts})(Header);