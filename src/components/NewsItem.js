import React from 'react';
import PT from 'prop-types';
import { Link } from 'react-router-dom';
import ActionIcons from './ActionIcons'

class NewsItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            slice: 300,
            toggle: false,
            votes : this.props.article.votes
        }
        this.handleClick = this.handleClick.bind(this);
        this.voteArticle = this.voteArticle.bind(this);
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

    voteArticle(vote) {
        let increment;
        vote === 'up' ? increment = 1 : increment = -1
        this.props.putArticle(this.props.article._id, vote);
        this.setState({
            votes: this.state.votes + increment
        });
    }

    render() {
        return (
            <div className="uk-card uk-card-default uk-card-hover">
                <div id='cardHeader' className="uk-card-header" style={{display: 'flex', padding: '0px'}}>
                <div style={{maxWidth: '5%'}}>
                <ActionIcons
                        votes={this.state.votes}
                        voteArticle={this.voteArticle}
                />
                </div>
                <div style ={{display: 'block',width: '100%', textAlign: 'center', marginTop:'5%'}}>
                    <h3>{this.props.article.title}</h3>
                    <p>by {this.props.article.created_by}</p>
                </div>
                </div>

                <div className="uk-card-body">
                    <p style={{fontSize:'70%'}}>{this.props.article.body.slice(0, this.state.slice)}</p>

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
                        <h6>Comment</h6>
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
