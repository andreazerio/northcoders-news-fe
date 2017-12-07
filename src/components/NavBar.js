import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <div>
    <nav className="uk-navbar uk-navbar-container uk-margin" style={{ backgroundColor: 'rgba(0,0,0,0.8)', position: 'fixed', zIndex: '5', minWidth: '100%', marginTop: '0px', height: '13%' }}>
      <button className="uk-button uk-button-secondary uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-push"><span uk-icon="icon: menu" ></span></button>
      <div id="offcanvas-push" uk-offcanvas="mode: reveal; overlay: true">
        <div className="uk-offcanvas-bar">
          <button className="uk-offcanvas-close" type="button" uk-close='true'></button>
          <h3>Menu</h3>
          <ul className="uk-list uk-list-divider" style={{ margin: '20px' }}>
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
      <div className='container' style={{display: 'flex', marginTop: '1%', justifyContent: 'center'}}>
        <h1 style={{ fontSize: '250%', color: 'white'}}>NorthCoders</h1>
        <Link to="/"> <img src='https://cdn-images-1.medium.com/max/184/1*LdnSztHVYhhd8K8EqlgCJQ@2x.png' width='36%'  /></Link>
        <h1 style={{ fontSize: '250%', color: 'white'}}>News</h1>
        <h1>Placeholder--------------</h1>
      </div>
    </nav>
  </div>
);

export default NavBar;