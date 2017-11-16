import * as types from '../types/index';
import axios from 'axios';
import {API_URL} from '../config'

export const fetchArticlesRequest = () => ({
    type: types.FETCH_ARTICLES_REQUEST
});

export const fetchArticlesSuccess = articles => ({
    type: types.FETCH_ARTICLES_SUCCESS,
    payload: articles
});

export const fetchArticlesFailure = error => ({
    type: types.FETCH_ARTICLES_FAILURE,
    payload: error
});

export const putArticleRequest = (article_id, vote) => ({
    type: types.PUT_ARTICLE_REQUEST
});

export const putArticleSuccess = data => ({
    type: types.PUT_ARTICLE_SUCCESS,
    payload: data
});

export const putArticleFailure = error => ({
    type: types.FETCH_ARTICLES_FAILURE,
    payload: error
});

export const fetchArticles = (article_id) => {
    return (dispatch) => {
        const PATH = article_id ? `articles/${article_id}` : 'articles';
        dispatch(fetchArticlesRequest());
        return axios.get(`${API_URL}/${PATH}`)
        .then(res => {
            if (article_id) {
                dispatch(fetchArticlesSuccess(res.data))
            } else {
                dispatch(fetchArticlesSuccess(res.data.articles))
            }
        })
        .catch(error => dispatch(fetchArticlesFailure(error.message)))
    };
};

export const fetchArticlesByTopic = (topic_id) => {
    return (dispatch) => {
        const PATH = `topics/${topic_id}/articles`;
        dispatch(fetchArticlesRequest());
        return axios.get(`${API_URL}/${PATH}`)
            .then(res => {
                dispatch(fetchArticlesSuccess(res.data.articles))
            })
            .catch(error => {
                dispatch(fetchArticlesFailure(error.message));
            });
    };
};

export const putArticle = (article_id, vote) => {
    return (dispatch) => {
        const PATH = `articles/${article_id}?vote=${vote}`;
        dispatch(putArticleRequest());
        return axios.put(`${API_URL}/${PATH}`)
        .then(res => {
            dispatch(putArticleSuccess(res.data));
        })
        .catch(error => {
            dispatch(putArticleFailure(error.message))
        });
    };
};