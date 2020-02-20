import React from 'react';
import HomepageMovies from './HomepageMovies';

export default class HomeContainer extends React.PureComponent {
  render() {
    return (
      <div className="home-container container">
        <HomepageMovies />
      </div>
    );
  }
}
