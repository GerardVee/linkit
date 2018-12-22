import 'isomorphic-fetch';
import '../styles/linkit.scss';
import React, { Component } from 'react';
import { clearError, getPosts, sendLoggedIn, sendPosts } from '../ducks/actions';
import Content from '../components/Content';
import Head from 'next/head';
import Header from '../components/Header';
import MobileFooter from '../components/MobileFooter';
import Modal from 'react-responsive-modal';
import { connect } from 'react-redux';

const api = process.env.API;

const mapStateToProps = (linkit) => ({
    error: linkit.error,
    loggedIn: linkit.loggedIn,
    user: linkit.user
});

const mapDispatchToProps = (dispatch) => ({
    clearError: () => dispatch(clearError()),
    getPosts: (order, accessToken) => dispatch(getPosts(order, accessToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    static async getInitialProps({ store, query })
    {
        const { loggedIn } = query;
        const loginStatus = (loggedIn == null) ? false : loggedIn;
        const res = await fetch(api + 'linkit/posts');
        const posts = await res.json();
        store.dispatch(sendPosts(posts));
        store.dispatch(sendLoggedIn(loginStatus));
        return {};
    }

    componentDidMount()
    {
        const { loggedIn, user } = this.props;
        if (user && loggedIn)
        {
            this.props.getPosts('HOT', user.accessToken);
        }
    }

    clearError()
    {
        this.props.clearError();
    }

    render()
    {
        const { error } = this.props;
        return (
            <div>
                <Head>
                    <title>LinkIt</title>
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <link rel='icon' href='https://s3.amazonaws.com/gerardvee/site/1528500158997.png' />
                </Head>
                <Header extra />
                <Content />
                <Modal open={ !!error } onClose={ () => this.clearError() } center>
                    <h1 className='linkit-error-title'>Error</h1>
                    <h3 className='linkit-error-message'>{ error }</h3>
                </Modal>
                <MobileFooter />
            </div>
        );
    }
});