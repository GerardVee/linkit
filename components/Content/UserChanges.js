import React, { Component } from 'react';
import Link from 'next/link';
import Option from '../Option';
import UserStatus from '../UserStatus';
import { connect } from 'react-redux';
import { refreshPosts } from '../../ducks/actions';

const mapStateToProps = (linkit) => ({
    loggedIn: linkit.loggedIn,
    postOrder: linkit.postOrder
});

const mapDispatchToProps = (dispatch) => ({ refreshPosts: (order) => dispatch(refreshPosts(order)) });

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    refresh()
    {
        const { postOrder } = this.props;
        this.props.refreshPosts(postOrder);
    }

    render()
    {
        const { loggedIn } = this.props;
        return (
            <div className='col user-changes halign-children flex-1'>
                <UserStatus />
                <Option icon='update' onClick={ () => this.refresh() }>
                    <p>Refresh</p>
                </Option>
                <Link href={ `/new?loggedIn=${ loggedIn }` }>
                    <Option icon='tab'>
                        <p>New Post</p>
                    </Option>
                </Link>
            </div>
        );
    }
});