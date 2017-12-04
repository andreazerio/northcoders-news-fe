import React from 'react';
import PT from 'prop-types';
import ArticleCommentForm from './ArticleCommentForm';
import ArticleCommentList from './ArticleCommentList';
import ActionIcons from './ActionIcons';
import { connect } from 'react-redux';
import { fetchArticles, putArticle } from '../actions/articles';
import { fetchComments, postComment, putComment, deleteComment } from '../actions/comments';



class Article extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.fetchArticles(this.props.match.params.id);
        this.props.fetchComments(this.props.match.params.id);
    }

    render() {
        let article = '';
        if (this.props.article.article) article = this.props.article.article[0];

        return (
            <div id=''>
                {article !== undefined
                    ?
                    <div className="article" style={{ paddingTop: '12%' }}>
                        <div className="uk-card uk-card-default uk-card-hover uk-card-small" style={{marginBottom: '50px', maxWidth: '65%', marginLeft: '16%'}}>
                            <div id='cardHeader' className="uk-card-header">
                                <h3 style={{ fontSize: '150%' }}>{article.title}</h3>
                                <p>by {article.created_by}</p>
                            </div>

                            <div className="uk-card-body">
                                <p>{article.body}</p>
                            </div>

                            <div id='footer' className="uk-card-footer">
                                <h6>{this.props.comments.length} comments</h6>
                            </div>
                        </div>
                        <div className="comments" >
                        <div style={{maxWidth: '65%', marginLeft: '16%'}}>
                            <ArticleCommentForm
                                article_id={article._id}
                                postComment={this.props.postComment}
                            />
                            </div>
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

                    <div className="article" style={{ paddingTop: '12%' }}>
                        <div className="uk-card uk-card-default uk-card-hover uk-card-small" style={{marginBottom: '50px'}}>
                            <div id='cardHeader' className="uk-card-header">
                                <h3>{this.props.article.article.title}</h3>
                                <p>by {this.props.article.article.created_by}</p>
                            </div>

                            <div className="uk-card-body">
                                <p>{this.props.article.article.body}</p>
                            </div>

                            <div id='footer' className="uk-card-footer">
                                <h6>{this.props.comments.length} comments</h6>
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
        putComment: (comment_id, vote) => {
            dispatch(putComment(comment_id, vote))
        },
        deleteComment: (comment_id) => {
            dispatch(deleteComment(comment_id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);