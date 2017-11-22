import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const style = {
            margin: '20px'
        }
        return (
            <div>
                <nav className="uk-navbar uk-navbar-container uk-margin" style={{backgroundColor:'rgba(0,0,0,0.8)', position: 'fixed', zIndex: '5', width: '100%', marginTop:'0px'}}>
                    <button className="uk-button uk-button-secondary uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push"><span uk-icon="icon: menu" ></span></button>
                    <div id="offcanvas-push" uk-offcanvas="mode: reveal; overlay: true">
                        <div className="uk-offcanvas-bar">
                            <button className="uk-offcanvas-close" type="button" uk-close='true'></button>
                            <h3>Menu</h3>
                            <ul className="uk-list uk-list-divider" style={style}>
                                <li>
                                    <Link to="/">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/popular">
                                        Popular
                                    </Link>
                                </li>
                                <li className="uk-parent">
                                    Topics
                                    <ul className="uk-nav-sub uk-list-divider">
                                        <li>
                                            <Link to="/topics/coding">
                                                Coding
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/topics/cooking">
                                                Cooking
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/topics/football">
                                                Football
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h1 style={{fontSize: '300%', marginLeft: '14.9%', color: 'white'}}className="uk-align-center">Northcoders <img src='https://cdn-images-1.medium.com/max/184/1*LdnSztHVYhhd8K8EqlgCJQ@2x.png' height='100' width='100' style={{marginLeft:'270px', marginRight: '340px'}}/> News</h1>
                </nav>
            </div>
        )
    }
}

export default NavBar