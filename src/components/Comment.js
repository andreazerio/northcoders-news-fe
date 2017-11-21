import React from 'react';
import PT from 'prop-types';
// import VotingIcons from './VotingIcons'

class Comment extends React.Component {
    render () {
        return (
            <div>
               <strong><h6>{this.props.comment.created_by}</h6></strong> 
                <p>
                    {this.props.comment.body}
                </p>
                {/* //<VotingIcons /> */}
            </div>
            // <div className="box">
            //     <p><strong>{this.props.comment.created_by}:</strong> {this.props.comment.body}</p>
            //    <VotingIcons />
            // pass this id & article type
            // </div>
        );
    }

    static propTypes = {
        comment : PT.string.isRequired
        //actually, PT.object.isRequired
    }
}

export default Comment;