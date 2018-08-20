import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleSubsClose } from '../../redux/actions/actions';
import { Link } from 'react-router-dom';
import './subs-modal.css';

class SubsList extends Component {
    render() {
        let subs, subTo;
        if (this.props.subs) {
            console.log(this.props.profile.user.subscribers);
            subs = this.props.profile.user.subscribers.slice().map((sub) =>
                <div className="subs" key={`sub-${sub._id}`}>
                    <img src={sub.provider_img} style={{maxWidth: 100+'%', maxHeight: 100+'%'}} alt="provider_img"/>
                    <Link className="sub-name" to={`/profile/${sub._id}`}>{sub.name}</Link>
                </div>
            )
            subTo = '';
        }
        else if (this.props.subTo) {
            subTo = this.props.profile.user.subscribedTo.slice().map((sub) =>
                <div className="subs" key={`subTo-${sub._id}`}>
                    <img src={sub.provider_img} style={{maxWidth: 100+'%', maxHeight: 100+'%'}} alt="provider_img"/>
                    <Link className="sub-name" to={`/profile/${sub._id}`}>{sub.name}</Link>
                </div>
            )
            subs='';
        }
        return (
            <div className={["modal subs-modal", this.props.subsModalMode ? '' : 'hidden'].join(' ')}>
                <a className="close-btn" onClick={this.props.toggleSubsClose}>&#x2715;</a>
                {subs}
                {subTo}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        profile: state.authUser.profile,
        subsModalMode: state.common.subsModalMode,
        subs: state.common.subs,
        subTo: state.common.subTo
    }
}

export default connect(mapStateToProps, { toggleSubsClose })(SubsList);