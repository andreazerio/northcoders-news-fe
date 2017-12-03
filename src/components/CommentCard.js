import React from 'react';


const CommentCard = ({comment}) => (
    <div>
        <strong><h6>{comment.created_by}</h6></strong>
                <p>
                    {comment.body}
                </p>
    </div>
)



export default CommentCard