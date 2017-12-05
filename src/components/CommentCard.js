import React from 'react';
import PT from 'prop-types';


const CommentCard = ({comment}) => (
  <div>
    <strong><h6>{comment.created_by}</h6></strong>
    <p>
      {comment.body}
    </p>
  </div>
);

CommentCard.propTypes = {
  comment: PT.object.isRequired
};


export default CommentCard;