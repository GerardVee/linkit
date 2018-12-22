import PostsContainer from './PostsContainer';
import PostsControls from './PostsControls';
import React from 'react';
import UserChanges from './UserChanges';

export default () => (
    <main>
        <div className='row'>
            <PostsControls />
            <PostsContainer />
            <UserChanges />
        </div>
    </main>
);