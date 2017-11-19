import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';
import * as commentsActions from '../src/actions/comments'
import * as topicsActions from '../src/actions/topics'
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
    describe('article actions', () => {
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
              it('dispatches fetchArticlesFailure when receiving an error', () => {
                  const invalid_article_id = 'Andrea';
                  const error = {message: 'error - article_id not valid'}
                nock(API_URL)
                .get(`/articles/${invalid_article_id}`)
                  .replyWithError(error.message);
                
                const expectedActions = [
                    articleActions.fetchArticlesRequest(),
                    articleActions.fetchArticlesFailure(error.message)
                ];
          
                const store = mockStore();
          
                return store.dispatch(articleActions.fetchArticles(invalid_article_id))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
              });
        });
    
        describe('fetchArticlesByTopic', () => {
            it('exists', () => {
                expect(articleActions.fetchArticlesByTopic).to.be.a('function');
            });
            it('dispatches fetchArticlesSuccess with the correct topic id as argument when recieving data with status code 200', () => {
                const topic_id = 'football';
                const articles = {data: ['article1', 'article2', 'article3']};
    
                nock(API_URL)
                .get(`/topics/${topic_id}/articles`)
                .reply(200, {articles});
    
                const expectedActions = [
                    articleActions.fetchArticlesRequest(),
                    articleActions.fetchArticlesSuccess(articles)
                  ];
                  const store = mockStore();
    
                  return store.dispatch(articleActions.fetchArticlesByTopic(topic_id))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
              });
              it('dispatches fetchArticlesFailure when receiving an error', () => {
                const invalid_topic_id = 'Andrea';
                const error = {message: 'error - article_id not valid'}
              nock(API_URL)
              .get(`/articles/${invalid_topic_id}`)
                .replyWithError(error.message);
              
              const expectedActions = [
                  articleActions.fetchArticlesRequest(),
                  articleActions.fetchArticlesFailure(error.message)
              ];
        
              const store = mockStore();
        
              return store.dispatch(articleActions.fetchArticles(invalid_topic_id))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
    
        });
    
        describe('putArticle', () => {
            it('exists', () => {
                expect(articleActions.putArticle).to.be.a('function');
            });
            it('dispatches putArticlesSuccess with the correct article_id and vote as arguments when recieving data with status code 200', () => {
                const article_id = '5a0b3622eccf201ad70df0a4';
                const vote = 'up'
                const data = {
                    id: article_id,
                    votes: 1
                };
    
                nock(API_URL)
                .put(`/articles/${article_id}?vote=${vote}`)
                .reply(200, data);
    
                const expectedActions = [
                    articleActions.putArticleRequest(article_id, vote),
                    articleActions.putArticleSuccess(data)
                  ];
                  const store = mockStore();
    
                  return store.dispatch(articleActions.putArticle(article_id, vote))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
              });
              it('dispatches putArticleFailure when receiving an error', () => {
                const vote = 'up';
                const invalid_article_id = 'Andrea';
                const error = {message: 'error - article_id not valid'}
              nock(API_URL)
              .put(`/articles/${invalid_article_id}?vote=${vote}`)
                .replyWithError(error.message);
              
              const expectedActions = [
                  articleActions.putArticleRequest(),
                  articleActions.putArticleFailure(error.message)
              ];
        
              const store = mockStore();
        
              return store.dispatch(articleActions.putArticle(invalid_article_id, vote))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
        });
    });

    describe('comments actions', () => {
        describe('fetchComments', () => {
            it('exists', () => {
                expect(commentsActions.fetchComments).to.be.a('function');
            })
            it('dispatches fetchCommentsSuccess with the correct article_id as argument when recieving data with status code 200', () => {
                const article_id = '5a0b3622eccf201ad70df0a4';
                const comments = {data: ['comment1', 'comment2', 'comment3']};
    
                nock(API_URL)
                .get(`/articles/${article_id}/comments`)
                .reply(200, {comments});
    
                const expectedActions = [
                    commentsActions.fetchCommentsRequest(),
                    commentsActions.fetchCommentsSuccess(comments)
                  ];
                  const store = mockStore();
    
                  return store.dispatch(commentsActions.fetchComments(article_id))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
              });
              it('dispatches fetchCommentsFailure when receiving an error', () => {
                const invalid_article_id = 'Andrea';
                const error = {message: 'error - article_id not valid'}
              nock(API_URL)
              .get(`/articles/${invalid_article_id}/comments`)
                .replyWithError(error.message);
              
              const expectedActions = [
                  commentsActions.fetchCommentsRequest(),
                  commentsActions.fetchCommentsFailure(error.message)
              ];
        
              const store = mockStore();
        
              return store.dispatch(commentsActions.fetchComments(invalid_article_id))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
        });
        describe('postComment', () => {
            it('exists', () => {
                expect(commentsActions.postComment).to.be.a('function');
            });
            it('dispatches postCommentsSuccess with the correct article_id as argument when recieving data with status code 200', () => {
                const article_id = '5a0b3622eccf201ad70df0a4';
                const comment = {
                    body:'comment test',
                    created_by: 'northcoder'
                }
                nock(API_URL)
                .post(`/articles/${article_id}/comments`, comment)
                .reply(201, {comment});
          
              const expectedActions = [
                commentsActions.postCommentRequest(article_id, comment),
                commentsActions.postCommentSuccess(comment)
              ];
          
              const store = mockStore();
              
              return store.dispatch(commentsActions.postComment(article_id, comment))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
            it('dispatches postCommentFailure when receiving an error', () => {
                const comment = {
                    body:'comment test',
                    created_by: 'northcoder'
                }
                const error = 'article not found';
                const invalid_article_id = 'andrea';
                nock(API_URL)
                  .post(`/articles/${invalid_article_id}/comments`, comment)
                  .replyWithError({'message': error});
                
                const expectedActions = [
                  commentsActions.postCommentRequest(invalid_article_id, comment),
                  commentsActions.postCommentFailure(error) 
                ];
                
                const store = mockStore();
            
                return store.dispatch(commentsActions.postComment(invalid_article_id, comment))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
            });
        });
        describe('putComment', () => {
            it('exists', () => {
                expect(commentsActions.putComment).to.be.a('function');
            });
            it('dispatches putCommentSuccess with the correct comment_id and vote as arguments when recieving data with status code 200', () => {
                const comment_id = '5a0b3623eccf201ad70df0cb';
                const vote = 'up'
                const data = {
                    id: comment_id,
                    votes: 1
                };
    
                nock(API_URL)
                .put(`/comments/${comment_id}?vote=${vote}`)
                .reply(200, data);
    
                const expectedActions = [
                    commentsActions.putCommentRequest(comment_id, vote),
                    commentsActions.putCommentSuccess(data)
                  ];
                  const store = mockStore();
    
                  return store.dispatch(commentsActions.putComment(comment_id, vote))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
              });
              it('dispatches putCommentFailure when receiving an error', () => {
                const vote = 'up';
                const invalid_comment_id = 'Andrea';
                const error = {message: 'error - comment_id not valid'}
              nock(API_URL)
              .put(`/comments/${invalid_comment_id}?vote=${vote}`)
                .replyWithError(error.message);
              
              const expectedActions = [
                  commentsActions.putCommentRequest(),
                  commentsActions.putCommentFailure(error.message)
              ];
        
              const store = mockStore();
        
              return store.dispatch(commentsActions.putComment(invalid_comment_id, vote))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
    
        });
        describe('deleteComment', () => {
            it('exists', () => {
                expect(commentsActions.deleteComment).to.be.a('function');
            });
            it('dispatches deleteCommentSuccess action when recieving an action with status code of 200', () => {
                const comment_id = '5a0b3623eccf201ad70df0cb';
                nock(API_URL)
                  .delete(`/comments/${comment_id}`) 
                  .reply(204, {});
          
                const expectedActions = [
                  commentsActions.deleteCommentRequest(comment_id),
                  commentsActions.deleteCommentSuccess({})
                ];
          
                const store = mockStore();
          
                return store.dispatch(commentsActions.deleteComment(comment_id))
                  .then(() => {
                    expect(store.getActions()).to.eql(expectedActions);
                  });
            });
            it('dispatches deleteCommentFailure when receiving an error', () => {
                const invalid_comment_id = 'Andrea';
                const error = {message: 'error - comment_id not valid'}
              nock(API_URL)
              .delete(`/comments/${invalid_comment_id}`)
                .replyWithError(error.message);
              
              const expectedActions = [
                  commentsActions.deleteCommentRequest(),
                  commentsActions.deleteCommentFailure(error.message)
              ];
        
              const store = mockStore();
        
              return store.dispatch(commentsActions.deleteComment(invalid_comment_id))
                .then(() => {
                  expect(store.getActions()).to.eql(expectedActions);
                });
            });
        });
    });

describe('topics actions', () => {
    describe('fetchTopics', () => {
        it('exists', () => {
            expect(topicsActions.fetchTopics).to.be.a('function');
        });
        it('dispatches fetchTopicsSuccess when recieving data with status code 200', () => {
            nock(API_URL)
            .get('/topics')
            .reply(200, {
                topics: ['topic1', 'topic2', 'topic3']
            });

            const expectedActions = [
                topicsActions.fetchTopicsRequest(),
                topicsActions.fetchTopicsSuccess(['topic1', 'topic2', 'topic3'])
              ];
              const store = mockStore();

              return store.dispatch(topicsActions.fetchTopics())
              .then(() => {
                expect(store.getActions()).to.eql(expectedActions);
              });
        });
        it('dispatches fetchCommentsFailure when receiving an error', () => {
            const error = {message: 'error - topics not available'}
          nock(API_URL)
          .get(`/topics`)
            .replyWithError(error.message);
          
          const expectedActions = [
              topicsActions.fetchTopicsRequest(),
              topicsActions.fetchTopicsFailure(error.message)
          ];
    
          const store = mockStore();
    
          return store.dispatch(topicsActions.fetchTopics())
            .then(() => {
              expect(store.getActions()).to.eql(expectedActions);
            });
        });
    });
});


});


