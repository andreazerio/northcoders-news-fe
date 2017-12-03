import React from 'react';
import PT from 'prop-types';
import { connect } from 'react-redux';
import NewsItem from './NewsItem';
import { fetchArticles, fetchArticlesByTopic, putArticle } from '../actions/articles';
import { fetchComments } from '../actions/comments';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
        this.sourceArticles = this.sourceArticles.bind(this)
    }

    componentDidMount() {
        this.sourceArticles();
    }

    componentWillReceiveProps(nextProps) {
        let oldMatch = this.props.match
        let newMatch = nextProps.match

        if (newMatch.params !== oldMatch.params || newMatch.url !== oldMatch.url) {
            this.sourceArticles(nextProps);
        }
    }

    sourceArticles(nextProps = this.props) {
        const url = nextProps.match.url;
        if (url === '/' || url === '/popular') {
            this.props.fetchArticles();
        } else {
            this.props.fetchArticlesByTopic(nextProps.match.params.topic);
        }
    }

    render() {
        const style = {
            margin: '20px',
            maxWidth: '65%',
            marginLeft: '16%'
        }
        let { articles } = this.props;
        const order = this.props.match.url;
        if (order === "/popular" && Array.isArray(articles)) {
            articles = articles.sort((a, b) => b.votes - a.votes);
        }
        return (
            <div style={{ paddingTop: '10%' }}>
                <h3 style={{ fontSize: '160%' }} >{this.props.loading ? "Loading " : ""}{order === '/' ? "Latest" : "Popular"} News Stories</h3>
                <ul className="uk-list">
                    {Array.isArray(articles) && articles.slice(0, 10).map((article, index) => {
                        return <li style={style} key={article._id}>
                            <NewsItem
                                article={article}
                                fetchComments={this.props.fetchComments}
                                putArticle={this.props.putArticle}
                            />
                        </li>
                    })}
                </ul>
            </div>
        )
    }

    static propTypes = {
        loading: PT.bool.isRequired,
        error: PT.any,
        articles: PT.arrayOf(PT.object).isRequired,
        fetchArticles: PT.func.isRequired,
        fetchArticlesByTopic: PT.func.isRequired
    }
}

const mapStateToProps = state => {
    return {
        loading: state.articles.loading,
        error: state.articles.error,
        articles: state.articles.data
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchArticles: () => {
            dispatch(fetchArticles());
        },
        fetchArticlesByTopic: (topic) => {
            dispatch(fetchArticlesByTopic(topic));
        },
        fetchComments: (article_id) => {
            dispatch(fetchComments(article_id))
        },
        putArticle: (article_id, vote) => {
            dispatch(putArticle(article_id, vote))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList);
