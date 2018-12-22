import Post from './Post';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (linkit) => ({
    posts: linkit.posts,
    user: linkit.user
});

export default connect(mapStateToProps)(({ posts, user }) => (
    <div className='col posts halign-children flex-6'>
        <div className='col'>
            { posts.map((props) => (
                <Post key={ props.post_id } token={ user ? user.accessToken : '' } { ...props } />
            ))}
        </div>
    </div>
));