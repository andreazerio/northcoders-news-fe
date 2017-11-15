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