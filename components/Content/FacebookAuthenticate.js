import React, { Component } from 'react';
import { getPosts, login } from '../../ducks/actions';
import FacebookAuth from 'react-facebook-auth';
import Option from '../Option';
import { connect } from 'react-redux';

const noProfile = 'https://transhumane-partei.de/wp-content/uploads/2016/04/blank-profile-picture-973461_960_720.png';

const appId = process.env.FB_APP_ID;

const mapStateToProps = (linkit) => ({ loggedIn: linkit.loggedIn });

const mapDispatchToProps = (dispatch) => ({
    login: (user) => dispatch(login(user)),
    getPosts: (order, accessToken) => dispatch(getPosts(order, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    desktopLogin({ onClick })
    {
        return (
            <Option icon='person_outline' onClick={ onClick }>
                <p>Sign In</p>
            </Option>
        );
    }

    mobileLogin({ onClick })
    {
        return (
            <img className='linkit-profile-photo linkit-mobile-photo' src={ noProfile } onClick={ onClick } />
        );
    }

    login(user)
    {
        this.props.login(user);
        this.props.getPosts('HOT', user.accessToken);
    }

    render()
    {
        const { mobile, loggedIn } = this.props;
        if (mobile)
        {
            return <FacebookAuth autoLoad={ loggedIn } appId={ appId } callback={ (user) => this.login(user) } component={ ({ onClick }) => this.mobileLogin({ onClick }) } />;
        }
        return <FacebookAuth autoLoad={ loggedIn } appId={ appId } callback={ (user) => this.login(user) } component={ ({ onClick }) => this.desktopLogin({ onClick }) } />;
    }
});
