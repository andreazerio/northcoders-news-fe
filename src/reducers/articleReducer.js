import * as types from '../types/index';

export const initialState = {
  loading: false,
  error: null,
  data: []
};

export default (prevState = initialState, action) => {
  if (action.type === types.FETCH_ARTICLES_REQUEST) {
    let newState = Object.assign({}, prevState);
    newState.loading = true;
    newState.error = null;
    newState.data = [];
    return newState;
  }
  if (action.type === types.FETCH_ARTICLES_SUCCESS) {
    let newState = Object.assign({}, prevState);
    const articles = action.payload;
    newState.loading = false;
    newState.error = null;
    newState.data = articles;
    return newState;
  }
  if (action.type === types.FETCH_ARTICLES_FAILURE) {
    let newState = Object.assign({}, prevState);
    const error = action.payload;
    newState.loading = false;
    newState.error = error;
    newState.data = prevState.data;
    return newState;
  }
  if (action.type === types.PUT_ARTICLE_REQUEST) {
    let newState = Object.assign({}, prevState);
    newState.loading = true;
    newState.error = null;
    newState.data = prevState.data;
    return newState;
  }
  if (action.type === types.PUT_ARTICLE_SUCCESS) {
    let newState = Object.assign({}, prevState);
    const articles = action.payload;
    newState.loading = false;
    newState.error = null;
    newState.data = newState.data.map(article => {
      if (article._id === articles._id) article.votes = articles.votes;
      return article;
    });
    return newState;
  }
  if (action.type === types.PUT_ARTICLE_FAILURE) {
    let newState = Object.assign({}, prevState);
    const error = action.payload;
    newState.loading = false;
    newState.error = error;
    newState.data = [];
    return newState;
  }
  return prevState;
};