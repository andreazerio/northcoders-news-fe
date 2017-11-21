import React from 'react';
import PT from 'prop-types';


class ArticleTitle extends React.Component {
    render () {
        return (
            <div className="article-title">
                <h1 className="title">this.props.title</h1>
                <h2 className="subtitle">this.props.createdBy</h2>
            </div>
        );
    }


    static propTypes = {
        //passed down title & created_by
    }
}


export default ArticleTitle;