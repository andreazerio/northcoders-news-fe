export const fetchTopicsRequest = () => ({
    type: types.FETCH_ARTICLES_REQUEST
});

export const fetchTopicsSuccess = articles => ({
    type: types.FETCH_ARTICLES_SUCCESS,
    payload: articles
});

export const fetchTopicsFailure = error => ({
    type: types.FETCH_ARTICLES_FAILURE,
    payload: error
});

export const fetchTopic = () => {
    return (dispatch) => {
        const PATH = 'topics';
        dispatch(fetchTopicRequest());
        return axios.get(`${API_URL}/${PATH}`)
        .then(res => {
            if (article_id) {
                dispatch(fetchTopicSuccess(res.data))
            } else {
                dispatch(fetchTopicSuccess(res.data.articles))
            }
        })
        .catch(error => dispatch(fetchTopicFailure(error.message)))
    };
};