import React, { Component } from 'react';
import { sendError, sendVote } from '../../ducks/actions';
import { connect } from 'react-redux';
import post from '../../utils/post';

const api = process.env.API;

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch) => ({
    setError: (error) => dispatch(sendError(error)),
    postVote: (post_id, vote) => dispatch(sendVote(post_id, vote))
});

export default connect(mapStateToProps, mapDispatchToProps)(class extends Component
{
    async onUpvote()
    {
        const { post_id, token } = this.props;
        const res = await fetch(api + 'linkit/upvote', post({ post_id, accessToken: token }));
        const upvoted = await res.json();
        if (upvoted.error)
        {
            this.props.setError(upvoted.error);
            return;
        }
        else if (upvoted.upvoted)
        {
            this.props.postVote(post_id, upvoted);
        }
        else
        {
            this.props.setError('Problem upvoting');
        }
    }

    async onDownvote()
    {
        const { post_id, token } = this.props;
        const res = await fetch(api + 'linkit/downvote', post({ post_id, accessToken: token }));
        const downvoted = await res.json();
        if (downvoted.error)
        {
            this.props.setError(downvoted.error);
            return;
        }
        else if (downvoted.downvoted)
        {
            this.props.postVote(post_id, downvoted);
        }
        else
        {
            this.props.setError('Problem downvoting');
        }
    }

    render()
    {
        const { title, link, upvoted, downvoted } = this.props;
        return (
            <div className='linkit-post col halign-children'>
                <a href={ !/^((http|https|ftp):\/\/)/.test(link) ? `http://${ link }` : link }>
                    <h1 className='linkit-post-title center'>{ title }</h1>
                </a>
                <div className='row halign-children'>
                    <div className='row valign flex-1'>
                        <div className='linkit-post-action upvote' onClick={ () => this.onUpvote() }>
                            <i className={ (upvoted ? 'upvoted ' : '') + 'material-icons' }>keyboard_arrow_up</i>
                            Upvote
                        </div>
                    </div>
                    <div className='row valign flex-1'>
                        <div className='linkit-post-action downvote' onClick={ () => this.onDownvote() }>
                            <i className={ (downvoted ? 'downvoted ' : '') + 'material-icons' }>keyboard_arrow_down</i>
                            Downvote
                        </div>
                    </div>
                    <div className='row valign flex-1'>
                        <div className='linkit-post-action report'>
                            <i className='material-icons'>error_outline</i>
                            Report
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});