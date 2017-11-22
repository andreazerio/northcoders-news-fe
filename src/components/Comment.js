import React from 'react';
import PT from 'prop-types';
import ActionIcons from './ActionIcons'

class Comment extends React.Component {
    constructor(props){
        super(props)
        this.state= {
            timesVoted: 0
        }

        this.voteCommentUp = this.voteCommentUp.bind(this);
        this.voteCommentDown = this.voteCommentDown.bind(this);
        this.deleteSingleComment = this.deleteSingleComment.bind(this);
    }
    voteCommentUp() {
        this.props.putComment(this.props.comment._id, 'up');
       let numberOfVotes = this.state.timesVoted + 1 
        this.setState({
            timesVoted: numberOfVotes
        });
    }

    voteCommentDown() {
        this.props.putComment(this.props.comment._id, 'down');
        let numberOfVotes = this.state.timesVoted + 1 
        this.setState({
            timesVoted: numberOfVotes
        });
    }

    deleteSingleComment() {
        this.props.deleteComment(this.props.comment._id)
    }

    componentDidMount() {
        this.voteCommentUp();
        this.voteCommentDown();
    }
    render () {
        return (
            <div> 
                   
               <strong><h6>{this.props.comment.created_by}</h6></strong> 
                <p>
                    {this.props.comment.body}
                </p>
                <strong>{this.props.comment.votes} Votes</strong>
                <div className ='icons' style={{display: 'inline'}}>
                <ActionIcons
                voteCommentUp={this.voteCommentUp}
                voteCommentDown={this.voteCommentDown}
                putComment={this.props.putComment}
                created_by = {this.props.comment.created_by}
                deleteSingleComment={this.deleteSingleComment}
                />
                </div>
            </div>
        );
    }

    static propTypes = {
        comment : PT.object.isRequired
    }
}

export default Comment;