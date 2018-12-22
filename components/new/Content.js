import 'isomorphic-fetch';
import React, { Component } from 'react';
import postType from '../../utils/post';
import validUrl from 'valid-url';

const api = process.env.API;

export default class extends Component
{
    state =
    {
        link: '',
        title: ''
    };

    errorParent(message)
    {
        this.props.alert('error', message);
    }

    successParent(message)
    {
        this.props.alert('success', message);
    }

    async newPost()
    {
        const date = new Date();
        const { link, title } = this.state;
        if (title.length > 50 || title.length < 4)
        {
            this.errorParent('title length must shorter than 50 and longer than 4 characters');
            return;
        }
        if (!validUrl.isUri(link))
        {
            this.errorParent('Only proper links allowed');
            return;
        }
        const resp = await fetch(api + 'linkit/dangerous?url=' + encodeURIComponent(link));
        if (!resp.ok)
        {
            this.errorParent('Url is corruput');
            return;
        }
        const isMalicious = await resp.json();
        if (isMalicious)
        {
            this.errorParent('This link is malicious');
            return;
        }
        const post = { link, title, date };
        const res = await fetch(api + 'linkit/post', postType({ post }));
        const result = await res.json();
        if (result)
        {
            this.successParent('Sucessful post');
        }
        else
        {
            this.errorParent('Post failed');
        }
    }

    render()
    {
        const { link, title } = this.state;
        return (
            <main>
                <div className='row'>
                    <div className='linkit-post col halign-children flex-1'>
                        <h1 className='linkit-post-title center'>New Post</h1>
                        <div className='linkit-form halign-children'>
                            <input className='input' placeholder='Title' value={ title } onChange={ (e) => this.setState({ title: e.target.value }) } />
                            <input className='input' placeholder='Url' value={ link } onChange={ (e) => this.setState({ link: e.target.value }) } />
                        </div>
                        <button className='linkit-button' onClick={ () => this.newPost() }>Submit</button>
                    </div>
                </div>
            </main>
        );
    }
}