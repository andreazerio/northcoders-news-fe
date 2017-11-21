import React from 'react';
import PT from 'prop-types';
import Comment from './Comment';
import chunk from 'lodash/chunk';

class ArticleCommentList extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        const commentColumns = chunk(this.props.comments, Math.floor(this.props.comments.length / 3));
        console.log('commentColumns',commentColumns)
        return (
            <div className="article-comment-list">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <p className="subtitle is-5">
                                <strong>{this.props.comments.length}</strong> comments
                        </p>
                        </div>
                    </div>
                </nav>
                <div className="uk-child-width-expand@s uk-text-center" uk-grid-parallax="translate:550">
                    {commentColumns.map((commentColumn, i) => {
                        return <div key={i}>
                            {commentColumn.map(comment => {
                                const cardClass = i % 2 === 0 ?
                                    "uk-card uk-card-default uk-card-default uk-grid-margin uk-card-hover" :
                                    "uk-card uk-card-default uk-card-primary uk-grid-margin uk-card-hover";
                                return <div className={cardClass} key={comment._id}>
                                    <Comment
                                        comment={comment}
                                    />
                                </div>
                            })}
                        </div>
                    })}
                </div>
            </div>
        );
    }


    static propTypes = {
        comments: PT.array.isRequired
    }
}

export default ArticleCommentList;