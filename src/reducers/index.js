import {combineReducers} from 'redux'
import articles from './articles';
import comments from './comments';
const reducer = combineReducers ({
 articles, comments
})

export default reducer;