import React from 'react';
import { Link } from 'react-router-dom';
import { CLIENT_PAGES } from 'consts/client-pages';

import './header.sass';

export const Header = () => (
  <header className="header">
    <div className="header__left-container">
      <Link to={CLIENT_PAGES.HOME} className="header__logo">
        <img style={{ width: '31px' }} src="/assets/images/logo.svg" alt="evapixel logo" />
        <div className="header__logo-title control d-none-on-mobile">
          omdb
        </div>
      </Link>
    </div>
  </header>
);
