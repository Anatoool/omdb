import React from 'react';
import { Helmet } from 'react-helmet';
import { hot } from 'react-hot-loader';
import { Header } from 'components/Header';
import { CommonContainers } from './CommonContainers';

import './root-container.sass';

class Root extends React.PureComponent {
  componentDidMount() {}

  render() {
    return (
      <div className="root-container">
        <Helmet>
          <title>OMDB</title>
          <meta name="description" content="OMDB project" />
        </Helmet>
        <Header />

        <div className="root-container__content">
          <CommonContainers />
        </div>

      </div>
    );
  }
}

export default hot(module)(Root);
