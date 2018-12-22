import React, { Component } from 'react';
import { getPosts, refreshPosts } from '../../ducks/actions';
import { connect } from 'react-redux';

const mapStateToProps = (linkit) => ({ postOrder: linkit.postOrder, user: linkit.user });

const mapDispatchToProps = (dispatch) => ({
    getPosts: (order, accessToken) => dispatch(getPosts(order, accessToken)),
    refreshPosts: (order, accessToken) => dispatch(refreshPosts(order, accessToken))
});

const icons =
[
    { order: 'HOT', icon: 'whatshot' },
    { order: 'NEW', icon: 'timer' },
    { order: 'RISING', icon: 'poll' },
];

const activeClass = (postOrder, order) => postOrder === order ? 'active' : 'md-light';

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
            <>
                { icons.map(({ order, icon }) => (
                    <i className={ 'material-icons md-36 center thirds ' + activeClass(postOrder, order) }
                        onClick={ () => this.fetchPosts(order) } key={ `mobile-${ order }` }
                    >
                        { icon }
                    </i>
                ))}
            </>
        );
    }
});