import React from 'react';
import PT from 'prop-types';
import ArticleCommentForm from './ArticleCommentForm';
import ArticleCommentList from './ArticleCommentList';
import ActionIcons from './ActionIcons';
import { connect } from 'react-redux';
import { fetchArticles, putArticle } from '../actions/articles';
import { fetchComments, postComment, putComment, deleteComment } from '../actions/comments';



class Article extends React.Component {
    constructor(props){
        super(props)

        this.articleVoteUp = this.articleVoteUp.bind(this);
        this.articleVoteDown = this.articleVoteDown.bind(this);
    }

    componentDidMount() {
        this.props.fetchArticles(this.props.match.params.id);
        this.props.fetchComments(this.props.match.params.id);
    }

    articleVoteUp() {
        this.props.putArticle(this.props.match.params.id, 'up');
    }

    articleVoteDown() {
        this.props.putArticle(this.props.match.params.id, 'down');
    }

    render() {
        const style = {
            marginBottom: '50px'
        }
        let article = 'loading';
        if (this.props.article.article) article = this.props.article.article[0];
        
        return (
            <div id= 'conditional'>
            {article !== undefined
            ? 
            <div className="article">
                <div className="uk-card uk-card-default uk-card-hover uk-card-small" style={style}>
                    <div id='cardHeader' className="uk-card-header">
                        <h3>{article.title}</h3>
                        <p>by {article.created_by}</p>
                    </div>

                    <div className="uk-card-body">
                        <p>{article.body}</p>
                    </div>

                    <div id='footer' className="uk-card-footer">
                        <h6>{this.props.comments.length} comments   {article.votes} votes </h6>
                        <ActionIcons 
                        votes={article.votes}
                        articleVoteUp={this.articleVoteUp}
                        articleVoteDown={this.articleVoteDown}
                        putArticle={this.props.putArticle}
                        />
                    </div>
                </div>
                <div className="comments" >

                    <ArticleCommentForm 
                    article_id={article._id}
                    postComment={this.props.postComment}
                    />
                    <ArticleCommentList 
                        comments={this.props.comments}
                        putComment={this.props.putComment}
                        fetchComments={this.props.fetchComments}
                        article_id={article._id}
                        deleteComment={this.props.deleteComment}
                    />   
                </div>

            </div>
            :
            
            <div className="article">
            {console.log('modified props',this.props)}
            <div className="uk-card uk-card-default uk-card-hover uk-card-small" style={style}>
                <div id='cardHeader' className="uk-card-header">
                    <h3>{this.props.article.article.title}</h3>
                    <p>by {this.props.article.article.created_by}</p>
                </div>

                <div className="uk-card-body">
                    <p>{this.props.article.article.body}</p>
                </div>

                <div id='footer' className="uk-card-footer">
                    <h6>{this.props.comments.length} comments   {this.props.article.article.votes} votes </h6>
                    <ActionIcons 
                    votes={this.props.article.article.votes}
                    articleVoteUp={this.articleVoteUp}
                    articleVoteDown={this.articleVoteDown}
                    putArticle={this.props.putArticle}
                    />
                </div>
            </div>
            <div className="comments" >

                <ArticleCommentForm 
                article_id={this.props.article.article._id}
                postComment={this.props.postComment}
                />
                <ArticleCommentList 
                    comments={this.props.comments}
                    putComment={this.props.putComment}
                    fetchComments={this.props.fetchComments}
                    article_id={this.props.article.article._id}
                    deleteComment={this.props.deleteComment}
                />   
            </div>

        </div>
            }
            </div>
        )
    }

    static propTypes = {
        article: PT.any.isRequired,
        articleLoading: PT.bool.isRequired,
        articleError: PT.any,
        comments: PT.any.isRequired,
        commentsLoading: PT.bool.isRequired,
        commentsError: PT.any
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.data,
        articleLoading: state.articles.loading,
        articleError: state.articles.error,
        comments: state.comments.data,
        commentsLoading: state.comments.loading,
        commentsError: state.comments.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: (article_id) => {
            dispatch(fetchArticles(article_id));
        },
        fetchComments: (article_id) => {
            dispatch(fetchComments(article_id));
        },
        postComment: (article_id, body) => {
            dispatch(postComment(article_id, body))
        },
        putArticle: (article_id, vote) => {
            dispatch(putArticle(article_id, vote))
        },
        putComment: (comment_id, vote) => {
            dispatch(putComment(comment_id, vote))
        },
        deleteComment: (comment_id) => {
            dispatch(deleteComment(comment_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);