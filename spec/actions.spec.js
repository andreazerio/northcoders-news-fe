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
        it('dispatches FETCH_ARTICLES_SUCCESS when recieving data with status code 200', () => {
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
    });
});


