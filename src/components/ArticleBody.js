import React from 'react';
import PT from 'prop-types';
// import VotingIcons from './VotingIcons';

class ArticleBody extends React.Component {
    render () {
        return (
            <article className="box article-body">
                this.props.body
                {/* <VotingIcons /> */}
                {/* pass this id & article type */}
            </article>
        );
    }


    static propTypes = {
        //passed down body
        //passed down id
    }
}


export default ArticleBody;