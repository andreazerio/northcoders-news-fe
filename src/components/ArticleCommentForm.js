import React from 'react';

class ArticleCommentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            commentBody: ''
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    render() {
        return (
            <div className="field">
                <label className="label">Join the conversation!</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        placeholder="Enter comment here..."
                        value={this.state.commentText}
                        onChange={this.handleChange}
                    >
                    </textarea>
                </div>
                <div className="control">
                    <button
                        className="button is-link"
                        onClick={this.handleClick}
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            commentBody: e.target.value
        })
    }

    handleClick(e) {
        e.preventDefault();
        this.props.postComment(this.props.article_id, this.state.commentBody);
        this.setState({
            commentBody: ''
        });
    }
}




export default ArticleCommentForm;