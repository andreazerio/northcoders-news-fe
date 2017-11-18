import { expect } from 'chai';
import articleReducer, {initialState} from '../src/reducers/articleReducer';
import commentReducer from '../src/reducers/commentReducer';
import * as types from '../src/types/index';
import * as articleActions from '../src/actions/articles';
import * as commentsActions from '../src/actions/comments'

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
        it('updates the state with the correct data when succesfully voting on an article', () => {
            const vote = 'up';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const article = {
                id: article_id,
                vote: 1
            };
            const prevState = articleReducer(initialState, articleActions.putArticleRequest(article_id)); 
            const action = articleActions.putArticleSuccess(article);
            const newState = articleReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(article);
        });
        it('does not modify the original state when handling a succesfull putArticle action', () => {
            const vote = 'up';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const article = {
                id: article_id,
                vote: 1
            };
            const prevState = articleReducer(initialState, articleActions.putArticleRequest(article_id)); 
            const action = articleActions.putArticleSuccess(article);
            const newState = articleReducer(prevState, action);
    
            expect(newState).to.not.eql(initialState);
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
    
            expect(newState).to.not.eql(prevState);
        });
    });
});

describe('comment reducer', () => {
    it('exists', () => {
        expect(commentReducer).to.be.a('function');
    });
    it('returns the previous state when passed an invalid action', () => {
        const action = {type:'Andrea'};
        const newState = commentReducer(initialState, action);

        expect(newState).to.eql(initialState);
    });
    it('returns the initial state when first argument is undefined', () => {
        const action = {type:'Andrea'};
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
    
            expect(newState).to.not.eql(initialState);
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
    
            expect(newState).to.not.eql(initialState);
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
    
            expect(newState).to.not.eql(prevState);
        });
    });

    describe('postComment', () => {
        it('updates the state loading property when requesting to post a comment', () => {
            const article_id = '5a0b3622eccf201ad70df0a4';
            const comment = {
                body:'comment test',
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
                body:'comment test',
                created_by: 'northcoder'
            };
            const action = commentsActions.postCommentRequest(article_id, comment);
            const newState = commentReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state with the correct data when succesfully posting a comment', () => {
            const comment = {
                body:'comment test',
                created_by: 'northcoder'
            };
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id, comment)); 
            const action = commentsActions.postCommentSuccess(comment);
            const newState = commentReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql(comment);
        });
        it('does not modify the original state when handling a succesfull post comment action', () => {
            const comment = {
                body:'comment test',
                created_by: 'northcoder'
            };
            const article_id = '5a0b3622eccf201ad70df0a4';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id, comment)); 
            const action = commentsActions.postCommentSuccess(comment);
            const newState = commentReducer(prevState, action);
    
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state correctly when recieving an error message from a post comments action', () => {
            const comment = {
                body:'invalid comment',
                created_by: 'northcoder'
            };
            const error = 'error - comment not valid';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id,comment)); 
            const action = commentsActions.postCommentFailure(error);
            const newState = commentReducer(prevState, action);
    
            expect(newState.loading).to.be.false;
            expect(newState.error).to.equal(error);
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a post comments failure action', () => {
            const comment = {
                body:'invalid comment',
                created_by: 'northcoder'
            };
            const error = 'error - comment not valid';
            const article_id = '5a0b3622eccf201ad70df0a1';
            const prevState = commentReducer(initialState, commentsActions.postCommentRequest(article_id,comment)); 
            const action = commentsActions.postCommentFailure(error);
            const newState = commentReducer(prevState, action);
    
            expect(newState).to.not.eql(prevState);
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
    
            expect(newState).to.not.eql(initialState);
        });
        it('updates the state with the correct data when succesfully voting on a comment', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const vote = 'down';
            const action = commentsActions.putCommentRequest(comment_id, vote);
            const newState = commentReducer(initialState, action);
    
            expect(newState.loading).to.be.true;
            expect(newState.error).to.be.null;
            expect(newState.data).to.eql([]);
        });
        it('does not modify the original state when handling a putCommentSuccess action', () => {
            const comment_id = '5a0b3623eccf201ad70df0cb';
            const vote = 'down';
            const action = commentsActions.putCommentRequest(comment_id, vote);
            const newState = commentReducer(initialState, action);
    
            expect(newState).to.not.eql(initialState);
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
    
            expect(newState).to.not.eql(prevState);
        });
    });

});
