import React from 'react';
import PT from 'prop-types';

class ActionIcons extends React.Component {
    constructor (props) {
        super (props);

        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
       this.handleClickDelete = this.handleClickDelete.bind(this);
    }
    handleClickUp (e) {
        e.preventDefault();
        if (this.props.putArticle) this.props.articleVoteUp();
        if (this.props.putComment) this.props.voteCommentUp();
    }

    handleClickDown (e) {
        e.preventDefault();
        if (this.props.putArticle) this.props.articleVoteDown();
        if (this.props.putComment) this.props.voteCommentDown();
    }

   handleClickDelete(e) {
    e.preventDefault();
    this.props.deleteSingleComment();
   }

    render() {
        const style ={
            margin: '10px'
        }
        return (
            <div className="icons" style={{display:'flex'}}>
                <button
                    className="button"
                    value="up"
                    onClick={this.handleClickUp}
                    style={style}
                >
                    <span uk-icon="icon: plus" ></span>
                </button>
                <button
                    className="button"
                    value="down"
                    onClick={this.handleClickDown}
                    style={style}
                >
                    <span uk-icon="icon: minus"></span>
                </button>
                {this.props.created_by === 'northcoder' ? <button style={style} className='button' onClick={this.handleClickDelete}><span uk-icon="icon: close" ></span></button> :<div></div>}
            </div>
        );
    }

    static PT = {
        votes: PT.number.isRequired,
        voteUp: PT.func.isRequired,
        voteDown: PT.func.isRequired
    }
}


export default ActionIcons;