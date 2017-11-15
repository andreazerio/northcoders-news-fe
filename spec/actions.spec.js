import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { expect } from 'chai';
import config from '../src/config';
import {API_URL} from '../src/config';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        nock.cleanAll();
    });
    describe('fetchArticles', () => {
        it('exists', () => {
            expect(articleActions.fetchArticles).to.be.a('function');
        });
        it('dispatches fetchArticlesSuccess when recieving data with status code 200', () => {
            nock(API_URL)
            .get('/articles')
            .reply(200, {
                articles: ['article1', 'article2', 'article3']
            });

            const expectedActions = [
                articleActions.fetchArticlesRequest(),
                articleActions.fetchArticlesSuccess(['article1', 'article2', 'article3'])
              ];
              const store = mockStore();

              return store.dispatch(articleActions.fetchArticles())
              .then(() => {
                expect(store.getActions()).to.eql(expectedActions);
              });
        });
        it('dispatches fetchArticlesFailure when receiving an error', () => {
            nock(API_URL)
              .get('/articles')
              .replyWithError({'message': 'error'});
            
            const expectedActions = [
                articleActions.fetchArticlesRequest(),
                articleActions.fetchArticlesFailure('error')
            ];
      
            const store = mockStore();
      
            return store.dispatch(articleActions.fetchArticles())
              .then(() => {
                expect(store.getActions()).to.eql(expectedActions);
              });
          });
          it('dispatches fetchArticlesSuccess with the correct id as argument when recieving data with status code 200', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const article = {message: 'successfully fetched single article'};

            nock(API_URL)
            .get(`/articles/${article_id}`)
            .reply(200, article.message);

            const expectedActions = [
                articleActions.fetchArticlesRequest(),
                articleActions.fetchArticlesSuccess(article.message)
              ];
              const store = mockStore();

              return store.dispatch(articleActions.fetchArticles(article_id))
              .then(() => {
                expect(store.getActions()).to.eql(expectedActions);
              });
          });
    });
});


