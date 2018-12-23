import 'isomorphic-fetch';
import '../styles/linkit.scss';
import React, { Component } from 'react';
import Content from '../components/new/Content';
import Head from 'next/head';
import Header from '../components/Header';
import Modal from 'react-responsive-modal';

export default class extends Component
{
    state =
    {
        error: '',
        success: ''
    };

    static async getInitialProps({ query })
    {
        const { loggedIn } = query;
        return { loggedIn };
    }

    alert(error)
    {
        this.setState({ error });
    }

    triumph(success)
    {
        this.setState({ success });
    }

    render()
    {
        const { error, success } = this.state;
        const { loggedIn } = this.props;
        return (
            <div>
                <Head>
                    <meta charset='utf-8' />
                    <title>LinkIt - New Post</title>
                    <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                    <meta name='description' content='LinkIt by GerardVee' />
                    <meta property='og:title' content='LinkIt - New Post' />
                    <meta property='og:description' content='Linkit by GerardVee' />
                    <meta property='og:image' content='https://s3.amazonaws.com/gerardvee/site/1528500158997.png' />
                    <link rel='icon' href='https://s3.amazonaws.com/gerardvee/site/1528500158997.png' />
                </Head>
                <Header loggedIn={ loggedIn } />
                <Content alert={ (type, message) => type === 'success' ? this.triumph(message) : this.alert(message) } loggedIn={ loggedIn } />
                <Modal open={ !!error } onClose={ () => this.setState({ error: '' }) } center>
                    <h1 className='linkit-error-title'>Error</h1>
                    <p className='linkit-error-message'>{ error }</p>
                </Modal>
                <Modal open={ !!success } onClose={ () => this.setState({ success: '' }) } center>
                    <h1 className='linkit-success-title'>Success</h1>
                    <p className='linkit-success-message'>{ success }</p>
                </Modal>
            </div>
        );
    }
}