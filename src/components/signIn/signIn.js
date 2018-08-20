import React, { Component } from 'react';
import './signIn.css';
import { connect } from 'react-redux';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { toggleOpen, toggleClose, SignInUser, LogoutUser} from '../../redux/actions/actions';

class SignIn extends Component {
    render() {
        const responseGoogle = (res) => {
            let user_data = {
                name: res.w3.ig,
                provider: 'google',
                email: res.w3.U3,
                provider_id: res.El,
                token: res.Zi.access_token,
                provider_img: res.w3.Paa
            }
            this.props.SignInUser(user_data);
            this.props.toggleClose();
        }

        const logoutGoogle = () => {
            this.props.LogoutUser();
        }

        let logoutBtn;
        let loginBtn;
        if (this.props.isAuth) {
            logoutBtn = 
            <GoogleLogout className="google-logout"
                buttonText="Logout"
                onLogoutSuccess={logoutGoogle} >
            </GoogleLogout>;
            loginBtn = '';
        } else {
            loginBtn =
            <GoogleLogin className="google-login"
                    clientId= "914992529907-9oc4300vgqkee1dsk8pgau9o9sl5iaaq.apps.googleusercontent.com"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle} >
                    <i className="fab fa-google-plus-g"></i>
                    <span>Sign In with Google</span>
            </GoogleLogin>;
            logoutBtn = '';
        }

        return (
            <div className={["modal", this.props.modalMode ? '':'hidden'].join(' ')}>
                <a className="close-btn" onClick={this.props.toggleClose}>&#x2715;</a>
                <span className="sign-in-label"> Sign In: </span>
                {loginBtn}
                {logoutBtn}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        modalMode: state.common.modalMode,
        isAuth: state.authUser.authenticated
    }
}
export default connect(mapStateToProps, {
    toggleClose,
    toggleOpen,
    SignInUser,
    LogoutUser
})(SignIn);