import React, { Component } from 'react';
import Link from 'next/link';
import UserStatus from './UserStatus';
import { connect } from 'react-redux';
import { refreshPosts } from '../ducks/actions';

const mapStateToProps = (linkit) => ({
    postOrder: linkit.postOrder,
    loggedIn: linkit.loggedIn
});

const mapDispatchToProps = (dispatch) => ({ refresh: (order) => dispatch(refreshPosts(order)) });

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    refresh()
    {
        const { postOrder } = this.props;
        this.props.refresh(postOrder);
    }

    render()
    {
        const { loggedIn } = this.props;
        return (
            <div className='hidden-md hidden-lg linkit-mobile-footer'>
                <div>
                    <UserStatus mobile />
                    <i className='material-icons md-36 md-light center thirds' onClick={ () => this.refresh() }>update</i>
                    <Link href={ `/new?loggedIn=${ loggedIn }` }>
                        <i className='material-icons md-36 md-light center thirds'>tab</i>
                    </Link>
                </div>
            </div>
        );
    }
});