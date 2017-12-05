import React from 'react';
import Comment from './Comment';
import chunk from 'lodash/chunk';
import PT from 'prop-types';

const ArticleCommentList = ({ comments, putComment, fetchComments, article_id, deleteComment }) => (
  <div className="article-comment-list">
    <nav className="level">
      <div className="level-left">
        <div className="level-item">
          <p className="subtitle is-5">
            <strong>{comments.length}</strong> comments
          </p>
        </div>
      </div>
    </nav>
    <div className="uk-child-width-expand@s uk-text-center" uk-grid-parallax="translate:550">
      {chunk(comments, Math.floor(comments.length / 3)).map((commentColumn, i) => {
        return <div key={i}>
          {commentColumn.map(comment => {
            const cardClass = i % 2 === 0 ?
              'uk-card uk-card-default uk-card-default uk-grid-margin uk-card-hover' :
              'uk-card uk-card-default uk-card-secondary uk-grid-margin uk-card-hover';
            return <div className={cardClass} key={comment._id}>
              <Comment
                comment={comment}
                putComment={putComment}
                fetchComments={fetchComments}
                article_id={article_id}
                deleteComment={deleteComment}
              />
            </div>;
          })}
        </div>;
      })}
    </div>
  </div>
);

ArticleCommentList.propTypes = {
  comments: PT.object,
  putComment: PT.func.isRequired,
  fetchComments: PT.func.isRequired,
  article_id: PT.string,
  deleteComment: PT.func.isRequired
};

export default ArticleCommentList;