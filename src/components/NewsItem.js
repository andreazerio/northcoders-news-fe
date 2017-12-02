import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';

class NewsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slice: 300,
            toggle: false
        }
        this.handleClick = this.handleClick.bind(this)
        this.showNextCharacter = this.showNextCharacter.bind(this)
    }

    handleClick(event) {
        event.preventDefault();
        let key = Object.keys(event.target)[0]
        if (!this.state.toggle) {
            this.setState({
                slice: event.target[key].memoizedProps.val,
                toggle: true
            })

        }
        if (this.state.toggle) {
            this.setState({
                slice: 300,
                toggle: false
            })


        }

    }

    showNextCharacter(num) {
        this.setState({
            slice: this.state.slice + 1
        })
        if (this.state.slice < num) {
            setTimeout(this.showNextCharacter(num), 100)
        }
    }

    render() {
        return (
            <div className="uk-card uk-card-default uk-card-hover uk-card-small">
                <div id='cardHeader' className="uk-card-header">
                    <h3>{this.props.article.title}</h3>
                    <p>by {this.props.article.created_by}</p>
                </div>

                <div className="uk-card-body">
                    <p>{this.props.article.body.slice(0, this.state.slice)}</p>

                    {this.props.article.body.length > 300 && <button
                        className="uk-button uk-button-text"
                        val={this.props.article.body.length}
                        onClick={this.handleClick}
                    >
                        Read {this.state.toggle ? 'Less' : "More"}
                    </button>}
                </div>

                <div id='footer' className="uk-card-footer">
                    <Link to={`/articles/${this.props.article._id}`}>
                        <h6>Comments and Votes</h6>
                    </Link>
                </div>
            </div>

        )
    }

    static propTypes = {
        article: PT.object.isRequired
    }
}

export default NewsItem
