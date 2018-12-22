import React, { Component } from 'react';
import { getPosts, refreshPosts } from '../../ducks/actions';
import Option from '../Option';
import { connect } from 'react-redux';

const mapStateToProps = (linkit) => ({ postOrder: linkit.postOrder, user: linkit.user });

const mapDispatchToProps = (dispatch) => ({
    getPosts: (order, accessToken) => dispatch(getPosts(order, accessToken)),
    refreshPosts: (order, accessToken) => dispatch(refreshPosts(order, accessToken))
});

const activeClass = (postOrder, order) => postOrder === order ? 'active' : '';

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    fetchPosts(order)
    {
        const { postOrder, user } = this.props;
        if (postOrder === order)
        {
            this.props.refreshPosts(order, user ? user.accessToken : null);
        }
        else
        {
            this.props.getPosts(order, user ? user.accessToken : null);
        }
    }

    render()
    {
        const { postOrder } = this.props;
        return (
            <div className='user-controls halign-children flex-1'>
                <Option icon='whatshot' className={ activeClass(postOrder, 'HOT') } onClick={ () => this.fetchPosts('HOT') }>
                    <p>Hot</p>
                </Option>
                <Option icon='timer' className={ activeClass(postOrder, 'NEW') } onClick={ () => this.fetchPosts('NEW') }>
                    <p>New</p>
                </Option>
                <Option icon='poll' className={ activeClass(postOrder, 'RISING') } onClick={ () => this.fetchPosts('RISING') }>
                    <p>Rising</p>
                </Option>
            </div>
        );
    }
});