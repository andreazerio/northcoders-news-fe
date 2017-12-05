import React from 'react';
import PT from 'prop-types';

const ActionIcons = ({voteComment, deleteComment, votes, created_by, voteArticle}) => {
  const handleVoteUp = (event) => {
    event.preventDefault();
    voteComment ? voteComment('up') : voteArticle('up');
  };

  const handleVoteDown = (event) => {
    event.preventDefault();
    voteComment ? voteComment('down') : voteArticle('down');
  };

  const handleDelete = (event) => {
    event.preventDefault();
    deleteComment();
  };

  return (
    <div className="icons" style={{ display: 'block' }}>
      {created_by === 'northcoder' ? <button style={{margin: '10px'}} className='uk-button uk-button-text' onClick={handleDelete}><span uk-icon="icon: close" ></span></button> : <div></div>}
      <button
        className="uk-button uk-button-text"
        value="up"
        onClick={handleVoteUp}
        style={{margin: '10px', marginBottom: '10px'}}
      >
        <span uk-icon="icon: triangle-up" ></span>
      </button>
      <strong><p>{votes}</p></strong>
      <button
        className="uk-button uk-button-text"
        value="down"
        onClick={handleVoteDown}
        style={{margin: '10px'}}
      >
        <span uk-icon="icon: triangle-down"></span>
      </button>
    </div>
  );
};

ActionIcons.propTypes = {
  votes : PT.number.isRequired,
  created_by : PT.string.isRequired,
  voteComment : PT.func.isRequired,
  deleteComment : PT.func.isRequired,
  voteArticle: PT.func
};

export default ActionIcons;