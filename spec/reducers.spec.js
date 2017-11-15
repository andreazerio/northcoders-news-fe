import { expect } from 'chai';
import articleReducer, {initialState} from '../src/reducers/articleReducer';
import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';

describe('article reducer', () => {
    it('exists', () => {
        expect(articleReducer).to.be.a("function");
    });
    it('updates the state loading property when requesting articles', () => {
        const action = articleActions.fetchArticlesRequest();
        const newState = articleReducer(initialState, action);

        expect(newState.loading).to.be.true;
        expect(newState.error).to.be.null;
        expect(newState.data).to.eql([]);
    });
    it('does not modify the original state when handling a request action', () => {
        const action = articleActions.fetchArticlesRequest();
        const newState = articleReducer(initialState, action);

        expect(newState).to.not.eql(initialState);
    });
    it('updates the state with the correct data when succesfully receiving articles', () => {
        const data = ['article1', 'article2', 'article3'];
        const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest()); 
        const action = articleActions.fetchArticlesSuccess(data);
        const newState = articleReducer(prevState, action);

        expect(newState.loading).to.be.false;
        expect(newState.error).to.be.null;
        expect(newState.data).to.eql(data);
    });
    it('does not modify the original state when handling a succesful fetch action', () => {
        const data = ['article1', 'article2', 'article3'];
        const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest()); 
        const action = articleActions.fetchArticlesSuccess(data);
        const newState = articleReducer(prevState, action);

        expect(newState).to.not.eql(prevState);
    });
});
