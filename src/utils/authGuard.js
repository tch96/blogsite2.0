import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

export default function (PassedComponent) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.history.push('/');
            }
        }
        render() {
            return(
                <PassedComponent { ...this.props } />
            )
        }
    }

    Authenticate.contextTypes = {
        router: PropTypes.object.isRequired
    }

    const mapStateToProps = state => {
        return {
            authenticated: state.authUser.authenticated
        }
    }
    return connect(mapStateToProps) (Authenticate);
}