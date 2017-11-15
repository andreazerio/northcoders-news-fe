import * as types from '../types/index';

export const initialState = {
    aLoading: false,
    aError: null,
    aData: []
};

export default (prevState = initialState, action) => {
    if (action.type === types.FETCH_ARTICLES_REQUEST) {
        let newState = Object.assign({}, prevState);
        newState.aLoading = true;
        newState.aError = null;
        newState.aData = [];
        return newState;
    }
    if (action.type === types.FETCH_ARTICLES_SUCCESS) {
        let newState = Object.assign({}, prevState);
        const articles = action.payload;
        newState.aLoading = false;
        newState.aError = null;
        newState.aData = articles;
        return newState;
    }
    if (action.type === types.FETCH_ARTICLES_FAILURE) {
        let newState = Object.assign({}, prevState);
        const error = action.payload;
        newState.aLoading = false;
        newState.aError = error;
        newState.aData = [];
        return newState;
    }
    return prevState;
};