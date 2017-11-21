import React from 'react';
import PT from 'prop-types';

class VotingIcons extends React.Component {
    constructor (props) {
        super (props);

        this.handleClickUp = this.handleClickUp.bind(this);
        this.handleClickDown = this.handleClickDown.bind(this);
    }
    handleClickUp (e) {
        e.preventDefault();
        if (this.props.putArticle) this.props.articleVoteUp()
    }

    handleClickDown (e) {
        e.preventDefault();
        if (this.props.putArticle) this.props.articleVoteDown()
    }

    render() {
        const style ={
            margin: '10px'
        }
        return (
            <div className="icons">
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
            </div>
        );
    }

    static PT = {
        votes: PT.number.isRequired,
        voteUp: PT.func.isRequired,
        voteDown: PT.func.isRequired
    }
}


export default VotingIcons;