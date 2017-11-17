import * as types from '../types/index';
import axios from 'axios';
import {API_URL} from '../config'

export const fetchCommentsRequest = article_id => ({
    type: types.FETCH_COMMENTS_REQUEST
});

export const fetchCommentsSuccess = comments => ({
    type: types.FETCH_COMMENTS_SUCCESS,
    payload: comments
});

export const fetchCommentsFailure = error => ({
    type: types.FETCH_COMMENTS_FAILURE,
    payload: error
});

export const postCommentRequest = (article_id, body) => ({
    type: types.POST_COMMENT_REQUEST
});

export const postCommentSuccess = (comment) => ({
    type: types.POST_COMMENT_SUCCESS,
    payload: comment
});

export const postCommentFailure = (err) => ({
    type: types.POST_COMMENT_FAILURE,
    payload: err
});

export const fetchComments = article_id => {
    return (dispatch) => {
        dispatch(fetchCommentsRequest());
        return axios.get(`${API_URL}/articles/${article_id}/comments`)
            .then(res => {
                dispatch(fetchCommentsSuccess(res.data.comments));
            })
            .catch(error => {
                dispatch(fetchCommentsFailure(error.message));
            });
    };
}

export const postComment = (article_id, body) => {
    return(dispatch) => {
        dispatch(postCommentRequest(article_id, body));
        return axios.post(`${API_URL}/articles/${article_id}/comments`, body)
        .then(res => {
            dispatch(postCommentSuccess(res.data.comment))
        })
        .catch(error => {
            dispatch(postCommentFailure(error.message))
        });
    };
}