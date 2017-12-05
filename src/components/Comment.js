import React from 'react';
import PT from 'prop-types';
import CommentCard from './CommentCard';
import ActionIcons from './ActionIcons';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: this.props.comment.votes
    };
    this.deleteComment = this.deleteComment.bind(this);
    this.voteComment = this.voteComment.bind(this);
  }

  voteComment(vote) {
    let increment;
    vote === 'up' ? increment = 1 : increment = -1;
    this.props.putComment(this.props.comment._id, vote);
    this.setState({
      votes: this.state.votes + increment
    });
  }

  deleteComment() {
    this.props.deleteComment(this.props.comment._id);
  }

  render() {
    return (
      <div style={{display:'flex', flex: 'inline'}}>
        <div className='icons' style={{ display: 'inline' }}>
          <ActionIcons
            comment={this.props.comment}
            created_by={this.props.comment.created_by}
            votes={this.state.votes}
            voteComment={this.voteComment}
            deleteComment={this.deleteComment}
          />
        </div>
        <div>
          <CommentCard comment={this.props.comment}/>
        </div>
      </div>
    );
  }

}
Comment.propTypes = {
  comment: PT.object.isRequired,
  putComment: PT.func.isRequired,
  deleteComment: PT.func.isRequired
};

export default Comment;