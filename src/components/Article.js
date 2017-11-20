import React from 'react';
import PT from 'prop-types';
import ArticleTitle from './ArticleTitle';
import ArticleBody from './ArticleBody';
import { connect } from 'react-redux';
import { fetchArticles } from '../actions/articles';
import { fetchComments } from '../actions/comments';



class Article extends React.Component {

    componentDidMount() {
        this.props.fetchArticles(this.props.match.params.id);
        this.props.fetchComments(this.props.match.params.id);
    }

    render() {
        const style = {
            marginBottom: '50px'
        }
        return (
            <div className="article">
                <div className="uk-card uk-card-default uk-card-hover uk-card-small" style={style}>
                    <div id='cardHeader' className="uk-card-header">
                        <h3>{this.props.article.title}</h3>
                        <p>by {this.props.article.created_by}</p>
                    </div>

                    <div className="uk-card-body">
                        <p>{this.props.article.body}</p>
                    </div>

                    <div id='footer' className="uk-card-footer">
                        <h6>{this.props.comments.length} comments   {this.props.article.votes} votes </h6>
                    </div>
                </div>

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
        //call articles/:id from redux state
        //call articles/:id/comments from redux state
    }
}

const mapStateToProps = state => {
    return {
        article: state.articles.aData,
        articleLoading: state.articles.aLoading,
        articleError: state.articles.aError,
        comments: state.comments.cData,
        commentsLoading: state.comments.cLoading,
        commentsError: state.comments.cError
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: (id) => {
            dispatch(fetchArticles(id));
        },
        fetchComments: (id) => {
            dispatch(fetchComments(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);