import React, { Component } from 'react';
import FacebookAuthenticate from './Content/FacebookAuthenticate';
import Option from './Option';
import { connect } from 'react-redux';

const mapStateToProps = (linkit) => ({ user: linkit.user });

const noProfile = 'https://transhumane-partei.de/wp-content/uploads/2016/04/blank-profile-picture-973461_960_720.png';

export default connect(mapStateToProps)(class extends Component
{
    render()
    {
        const { mobile, user } = this.props;
        if (mobile)
        {
            return (
                <div className='center thirds inline-block'>
                    { !user && <FacebookAuthenticate mobile /> }
                    { user && <img className='linkit-mobile-photo linkit-profile-photo' src={ user.picture.data.url } /> }
                </div>
            );
        }
        else
        {
            if (user)
            {
                return (
                    <>
                        <div className='row'>
                            <img className='linkit-profile-photo' src={ user.picture.data.url } />
                        </div>
                        <Option icon='person_outline'>
                            <p>{ `Welcome, ${ user.name.split(' ')[0] }` }</p>
                        </Option>
                    </>
                );
            }
            else
            {
                return (
                    <>
                        <div className='row'>
                            <img className='linkit-profile-photo' src={ user ? user.picture.data.url : noProfile } />
                        </div>
                        <FacebookAuthenticate />
                    </>
                );
            }
        }
    }
});