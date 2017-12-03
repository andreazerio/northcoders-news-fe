import { expect } from 'chai';
import articleReducer, { initialState } from '../src/reducers/articleReducer';
import commentReducer from '../src/reducers/commentReducer';
import topicReducer from '../src/reducers/topicReducer';
import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';
import * as commentsActions from '../src/actions/comments'
import * as topicsActions from '../src/actions/topics'

describe('article reducer', () => {
    it('exists', () => {
        expect(articleReducer).to.be.a("function");
    });
    it('returns the previous state when passed an invalid action', () => {
        const action = { type: 'Andrea' };
        const newState = articleReducer(initialState, action);

        expect(newState).to.eql(initialState);
    });
    it('returns the initial state when first argument is undefined', () => {
        const action = { type: 'Andrea' };
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

            expect(newState).to.not.equal(initialState);
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

            expect(newState).to.not.equal(prevState);
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

            expect(newState).to.not.equal(prevState);
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

            expect(newState).to.not.equal(initialState);
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

            expect(newState).to.not.equal(initialState);
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

            expect(newState).to.not.equal(prevState);
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

            expect(newState).to.not.equal(initialState);
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

            expect(newState).to.not.equal(initialState);
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

            expect(newState).to.not.equal(prevState);
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

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully voting on an article', () => {
            const vote = 'up';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const dataSet = [
                { _id: article_id, votes: 5 },
                { _id: 'test1', votes: 4 }
            ];
            const article = {
                _id: article_id,
                votes: 6 
            }

            const state = {
                loading: false,
                error: null,
                data: dataSet
            }
            const action = articleActions.putArticleSuccess(article);
            const newState = articleReducer(state, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([
                { _id: article_id, votes: 6 },
                { _id: 'test1', votes: 4 }
            ]);
        });
        it('does not modify the original state when handling a succesfull putArticle action', () => {
            const vote = 'up';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const dataSet = [
                { _id: article_id, votes: 5 },
                { _id: 'test1', votes: 4 }
            ];
            const article = {
                _id: article_id,
                votes: 6 
            }

            const state = {
                loading: false,
                error: null,
                data: dataSet
            }
            const action = articleActions.putArticleSuccess(article);
            const newState = articleReducer(state, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state correctly when recieving an error message from a putArticle action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.putArticleRequest(article_id));
            const action = articleActions.putArticleFailure(error);
            const newState = articleReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = articleReducer(initialState, articleActions.putArticleRequest(article_id));
            const action = articleActions.putArticleFailure(error);
            const newState = articleReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });
});

describe('comment reducer', () => {
    it('exists', () => {
        expect(commentReducer).to.be.a('function');
    });
    it('returns the previous state when passed an invalid action', () => {
        const action = { type: 'Andrea' };
        const newState = commentReducer(initialState, action);

        expect(newState).to.eql(initialState);
    });
    it('returns the initial state when first argument is undefined', () => {
        const action = { type: 'Andrea' };
        const newState = commentReducer(undefined, action);

        expect(newState).to.eql(initialState);
    });

    describe('fetchComments', () => {
        it('updates the state loading property when requesting comments by article_id', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = commentsActions.fetchCommentsRequest(article_id);
            const newState = commentReducer(initialState, action);

            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a request by article_id action', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = commentsActions.fetchCommentsRequest(article_id);
            const newState = commentReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully receiving comments for a particular article', () => {
            const comments = ['comments1', 'comments2', 'comments3'];
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = commentReducer(initialState, commentsActions.fetchCommentsRequest(article_id));
            const action = commentsActions.fetchCommentsSuccess(comments);
            const newState = commentReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(comments);
        });
        it('does not modify the original state when handling a succesfull fetch by article_id action', () => {
            const comments = ['comments1', 'comments2', 'comments3'];
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = commentReducer(initialState, commentsActions.fetchCommentsRequest(article_id));
            const action = commentsActions.fetchCommentsSuccess(comments);
            const newState = commentReducer(prevState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state correctly when recieving an error message from a fetch comments action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.fetchCommentsRequest(article_id));
            const action = commentsActions.fetchCommentsFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch comments failure action', () => {
            const error = 'error - unsuccessful request';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.fetchCommentsRequest(article_id));
            const action = commentsActions.fetchCommentsFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });

    describe('postComment', () => {
        it('updates the state loading property when requesting to post a comment', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const comment = {
                body: 'comment test',
                created_by: 'northcoder'
            };
            const action = commentsActions.postCommentRequest(article_id, comment);
            const newState = commentReducer(initialState, action);

            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a post request action', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const comment = {
                body: 'comment test',
                created_by: 'northcoder'
            };
            const action = commentsActions.postCommentRequest(article_id, comment);
            const newState = commentReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully posting a comment', () => {
            const comment = {
                _id: '5',
                body: 'comment test',
                belongs_to: 'test article 1',
                created_by: 'test person 5'
            };

            const dataSet1 = [
                { _id: '1', body: 'test1', belongs_to: 'test article 1', created_by: 'test person 1' },
                { _id: '2', body: 'test2', belongs_to: 'test article 1', created_by: 'test person 2' },
                { _id: '3', body: 'test3', belongs_to: 'test article 1', created_by: 'test person 3' },
                { _id: '4', body: 'test4', belongs_to: 'test article 1', created_by: 'test person 4' }
            ]

            const state = {
                loading: false,
                error: null,
                data: dataSet1
            }
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = commentsActions.postCommentSuccess(comment);
            const newState = commentReducer(state, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(state.data.concat(comment));
        });
        it('does not modify the original state when handling a succesfull post comment action', () => {
            const comment = {
                _id: '5',
                body: 'comment test',
                belongs_to: 'test article 1',
                created_by: 'test person 5'
            };

            const dataSet1 = [
                { _id: '1', body: 'test1', belongs_to: 'test article 1', created_by: 'test person 1' },
                { _id: '2', body: 'test2', belongs_to: 'test article 1', created_by: 'test person 2' },
                { _id: '3', body: 'test3', belongs_to: 'test article 1', created_by: 'test person 3' },
                { _id: '4', body: 'test4', belongs_to: 'test article 1', created_by: 'test person 4' }
            ]

            const state = {
                loading: false,
                error: null,
                data: dataSet1
            }
            const article_id = '5a0b3622eccf201ad70df0a4';
            const action = commentsActions.postCommentSuccess(comment);
            const newState = commentReducer(state, action);


            expect(newState).to.not.equal(initialState);
        });
        it('updates the state correctly when recieving an error message from a post comments action', () => {
            const comment = {
                body: 'invalid comment',
                created_by: 'northcoder'
            };
            const error = 'error - comment not valid';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id, comment));
            const action = commentsActions.postCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a post comments failure action', () => {
            const comment = {
                body: 'invalid comment',
                created_by: 'northcoder'
            };
            const error = 'error - comment not valid';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id, comment));
            const action = commentsActions.postCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });

    describe('putComment', () => {
        it('updates the state loading property when updating a comment votes', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const vote = 'down';
            const action = commentsActions.putCommentRequest(comment_id, vote);
            const newState = commentReducer(initialState, action);

            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a putCommentRequest action', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const vote = 'down';
            const action = commentsActions.putCommentRequest(comment_id, vote);
            const newState = commentReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully voting on a comment', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const dataSet = [
                { _id: comment_id, votes: 5 },
                { _id: 'test1', votes: 4 }
            ]

            const comment = { _id: comment_id, votes: 4 }
            const vote = 'down';
            const state = {
                loading: false,
                error: null,
                data: dataSet
            }

            const action = commentsActions.putCommentSuccess(comment);
            const newState = commentReducer(state, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([
                { _id: comment_id, votes: 4 },
                { _id: 'test1', votes: 4 }
            ]);
        });
        it('does not modify the original state when handling a putCommentSuccess action', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const vote = 'down';
            const action = commentsActions.putCommentRequest(comment_id, vote);
            const newState = commentReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state correctly when recieving an error message from a putComment action', () => {
            const error = 'error - unsuccessful request';
            const comment_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.putCommentRequest(comment_id));
            const action = commentsActions.putCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const comment_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.putCommentRequest(comment_id));
            const action = commentsActions.putCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });

    describe('deleteComment', () => {
        it('updates the state loading property when requesting to delete a comment', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const action = commentsActions.deleteCommentRequest(comment_id);
            const newState = commentReducer(initialState, action);

            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(initialState.data);
        });
        it('does not modify the original state when handling a putCommentRequest action', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const action = commentsActions.deleteCommentRequest(comment_id);
            const newState = commentReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully deleting comment', () => {
            const comment_id = 1;
            const dataSet = [
                { _id: '1', body: 'test1', belongs_to: 'test article 1', created_by: 'test person 1' },
                { _id: '2', body: 'test2', belongs_to: 'test article 2', created_by: 'test person 2' },
                { _id: '3', body: 'test3', belongs_to: 'test article 3', created_by: 'test person 3' },
                { _id: '4', body: 'test4', belongs_to: 'test article 4', created_by: 'test person 4' }
            ]
            const state = {
                loading: false,
                error: null,
                data: dataSet
            }
            const action = commentsActions.deleteCommentSuccess(comment_id);
            const newState = commentReducer(state, action);
            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([{ _id: '2', body: 'test2', belongs_to: 'test article 2', created_by: 'test person 2' },
            { _id: '3', body: 'test3', belongs_to: 'test article 3', created_by: 'test person 3' },
            { _id: '4', body: 'test4', belongs_to: 'test article 4', created_by: 'test person 4' }]);
        });
        it('does not modify the original state when handling a putCommentSuccess action', () => {
            const comment_id = 1;
            const dataSet = [
                { _id: '1', body: 'test1', belongs_to: 'test article 1', created_by: 'test person 1' },
                { _id: '2', body: 'test2', belongs_to: 'test article 2', created_by: 'test person 2' },
                { _id: '3', body: 'test3', belongs_to: 'test article 3', created_by: 'test person 3' },
                { _id: '4', body: 'test4', belongs_to: 'test article 4', created_by: 'test person 4' }
            ]
            const state = {
                loading: false,
                error: null,
                data: dataSet
            }
            const action = commentsActions.deleteCommentSuccess(comment_id);
            const newState = commentReducer(state, action);

            expect(newState).to.not.equal(state);
        });
        it('updates the state correctly when recieving an error message from a deleteComment action', () => {
            const error = 'error - unsuccessful request';
            const comment_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.deleteCommentRequest(comment_id));
            const action = commentsActions.deleteCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const comment_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.deleteCommentRequest(comment_id));
            const action = commentsActions.deleteCommentFailure(error);
            const newState = commentReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });
});

describe('topic reducer', () => {
    it('exists', () => {
        expect(topicReducer).to.be.a('function');
    });
    describe('fetchTopics', () => {
        it('updates the state loading property when requesting topics', () => {
            const action = topicsActions.fetchTopicsRequest();
            const newState = topicReducer(initialState, action);

            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a request action', () => {
            const action = topicsActions.fetchTopicsRequest();
            const newState = topicReducer(initialState, action);

            expect(newState).to.not.equal(initialState);
        });
        it('updates the state with the correct data when succesfully receiving topics', () => {
            const data = ['topic1', 'topic2', 'topic3'];
            const prevState = topicReducer(initialState, topicsActions.fetchTopicsRequest());
            const action = topicsActions.fetchTopicsSuccess(data);
            const newState = topicReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(data);
        });
        it('does not modify the original state when handling a succesful fetchTopics action', () => {
            const data = ['topic1', 'topic2', 'topic3'];
            const prevState = topicReducer(initialState, topicsActions.fetchTopicsRequest());
            const action = topicsActions.fetchTopicsSuccess(data);
            const newState = topicReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
        it('updates the state correctly when recieving an error message', () => {
            const error = 'error - unsuccessful request';
            const prevState = topicReducer(initialState, topicsActions.fetchTopicsRequest());
            const action = topicsActions.fetchTopicsFailure(error);
            const newState = topicReducer(prevState, action);

            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a fetch failure action', () => {
            const error = 'error - unsuccessful request';
            const prevState = topicReducer(initialState, topicsActions.fetchTopicsRequest());
            const action = topicsActions.fetchTopicsFailure(error);
            const newState = topicReducer(prevState, action);

            expect(newState).to.not.equal(prevState);
        });
    });

});
