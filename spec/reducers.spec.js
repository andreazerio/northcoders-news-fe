import { expect } from 'chai';
import articleReducer, {initialState} from '../src/reducers/articleReducer';
import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';

describe('article reducer', () => {
    it('exists', () => {
        expect(articleReducer).to.be.a("function");
    });
    it('returns the previous state when passed an invalid action', () => {
        const action = {type:'Andrea'};
        const newState = articleReducer(initialState, action);

        expect(newState).to.eql(initialState);
    });
    it('returns the initial state when first argument is undefined', () => {
        const action = {type:'Andrea'};
        const newState = articleReducer(undefined, action);

        expect(newState).to.eql(initialState);
    });
    describe('fetchArticles()', () => {

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
        it('updates the state correctly when recieving an error message', () => {
            const error = 'error - unsuccessful request';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest()); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest()); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState).to.not.eql(prevState);
        });
    });

    describe('fetchArticles(article_id)', () => {

        it('updates the state loading property when requesting an article by article_id', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = articleActions.fetchArticlesRequest(article_id);
            const newState = articleReducer(initialState, action);
    
            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a request by article_id action', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = articleActions.fetchArticlesRequest(article_id);
            const newState = articleReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state with the correct data when succesfully receiving one specific article', () => {
            const article = 'article1';
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(article_id)); 
            const action = articleActions.fetchArticlesSuccess(article);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(article);
        });
        it('does not modify the original state when handling a succesfull fetch by article_id action', () => {
            const article = 'article1';
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(article_id));
            const action = articleActions.fetchArticlesSuccess(article);
            const newState = articleReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state correctly when recieving an error message from a fetch by article_id action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(article_id)); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(article_id)); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState).to.not.eql(prevState);
        });
    });
    
    describe('fetchArticlesByTopic(topic_id)', () => {
        it('updates the state loading property when requesting an article by topic_id', () => {
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const action = articleActions.fetchArticlesRequest(topic_id);
            const newState = articleReducer(initialState, action);
    
            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a request by article_id action', () => {
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const action = articleActions.fetchArticlesRequest(topic_id);
            const newState = articleReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state with the correct data when succesfully receiving articles by topic', () => {
            const article = ['article1', 'article2', 'article3'];
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(topic_id)); 
            const action = articleActions.fetchArticlesSuccess(article);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(article);
        });
        it('does not modify the original state when handling a succesfull fetch by article_id action', () => {
            const article = ['article1', 'article2', 'article3'];
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(topic_id)); 
            const action = articleActions.fetchArticlesSuccess(article);
            const newState = articleReducer(prevState, action);
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state correctly when recieving an error message from a fetch by article_id action', () => {
            const error = 'error - unsuccessful request';
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(topic_id)); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const topic_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.fetchArticlesRequest(topic_id)); 
            const action = articleActions.fetchArticlesFailure(error);
            const newState = articleReducer(prevState, action);
    
            expect(newState).to.not.eql(prevState);
        });
    });

    describe('putArticles(article_id, vote)', () => {
        it('updates the state loading property when updating an article votes', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const vote = 'down';
            const action = articleActions.putArticleRequest(article_id, vote);
            const newState = articleReducer(initialState, action);
    
            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a request by article_id action', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const vote = 'down';
            const action = articleActions.putArticleRequest(article_id, vote);
            const newState = articleReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
        });
    });
});
