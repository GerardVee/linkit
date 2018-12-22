import { actionTypes } from './actions';

export const initialState =
{
    error: '',
    success: '',
    postOrder: 'HOT',
    user: null,
    loggedIn: false,
    posts: [],
};

export const reducer = (state = initialState, action) =>
{
    switch (action.type)
    {
    case actionTypes.SET_ERROR:
        return Object.assign({}, state, { error: action.error });
    case actionTypes.SET_SUCCESS:
        return Object.assign({}, state, { success: action.success });
    case actionTypes.SET_POST_ORDER:
        return Object.assign({}, state, { postOrder: action.order });
    case actionTypes.SET_POST_VOTE:
        return Object.assign({}, state, { posts: state.posts.map(p => p.post_id === action.post_id ? { ...p, ...action.vote } : p) });
    case actionTypes.SET_USER:
        return Object.assign({}, state, { user: action.user });
    case actionTypes.SET_POSTS:
        return Object.assign({}, state, { posts: action.posts });
    case actionTypes.SET_LOGIN_STATUS:
        return Object.assign({}, state, { loggedIn: action.loggedIn });
    default:
        return state;
    }
};