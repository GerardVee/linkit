import objectToQuery from '../utils/objectToQuery';

const api = process.env.API;

export const actionTypes =
{
    SET_ERROR: 'LINKIT_SET_ERROR',
    SET_SUCCESS: 'LINKIT_SET_SUCCESS',
    SET_POST_ORDER: 'LINKIT_SET_POST_ORDER',
    SET_POST_VOTE: 'LINKIT_SET_POST_VOTE',
    SET_USER: 'LINKIT_SET_USER',
    SET_POSTS: 'LINKIT_SET_POSTS',
    SET_LOGIN_STATUS: 'LINKIT_SET_LOGIN'
};

export const sendError = (error) => dispatch => dispatch({ type: actionTypes.SET_ERROR, error });
export const clearError = () => dispatch => dispatch({ type: actionTypes.SET_ERROR, error: '' });

export const sendSuccess = (success) => dispatch => dispatch({ type: actionTypes.SET_SUCCESS, success });
export const clearSuccess = () => dispatch => dispatch({ type: actionTypes.SET_SUCCESS, success: '' });

export const sendVote = (post_id, vote) => dispatch => dispatch({ type: actionTypes.SET_POST_VOTE, post_id, vote });
export const sendPostOrder = (order) => dispatch => dispatch({ type: actionTypes.SET_POST_ORDER, order });

export const sendUser = (user) => dispatch => dispatch({ type: actionTypes.SET_USER, user });

export const sendPosts = (posts) => dispatch => dispatch({ type: actionTypes.SET_POSTS, posts });

export const sendLoggedIn = (loggedIn) => dispatch => dispatch({ type: actionTypes.SET_LOGIN_STATUS, loggedIn });

export const getPosts = (order, accessToken) => dispatch =>
{
    const params =
    {
        accessToken: accessToken,
        order: order === 'HOT' ? null : order.toLowerCase()
    };
    fetch(order !== 'HOT' || accessToken ? api + 'linkit/posts' + objectToQuery(params) : api + 'linkit/posts')
        .then(res =>
        {
            if (!res.ok)
            {
                throw Error(res.statusText);
            }
            return res;
        })
        .then(res => res.json())
        .then(posts =>
        {
            dispatch(sendPosts(posts));
            dispatch(sendPostOrder(order));
        })
        .catch((text) =>
        {
            dispatch(sendError(text));
        });
};

export const refreshPosts = (order, accessToken) => dispatch =>
{
    const params =
    {
        accessToken: accessToken,
        order: order === 'HOT' ? null : order.toLowerCase()
    };
    fetch(order !== 'HOT' || accessToken ? api + 'linkit/posts' + objectToQuery(params) : api + 'linkit/posts')
        .then(res =>
        {
            if (!res.ok)
            {
                throw Error(res.statusText);
            }
            return res;
        })
        .then(res => res.json())
        .then(posts =>
        {
            dispatch(sendPosts(posts));
        })
        .catch((text) =>
        {
            dispatch(sendError(text));
        });
};

export const login = (user) => dispatch =>
{
    const isDefined = !!user;
    if (!isDefined)
    {
        dispatch(sendLoggedIn(false));
        dispatch(sendUser(null));
        return;
    }
    if (!user.id || !user.userID)
    {
        dispatch(sendLoggedIn(false));
        dispatch(sendUser(null));
        return;
    }
    else
    {
        dispatch(sendLoggedIn(true));
        dispatch(sendUser(user)); /* accessToken for getting important info and userID as user_id for checking */
        return;
    }
};