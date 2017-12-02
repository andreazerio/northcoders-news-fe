import { combineReducers } from 'redux'
import articles from './articleReducer';
import comments from './commentReducer';
import topics from './topicReducer';
const reducer = combineReducers({
    articles, comments, topics
});

export default reducer;