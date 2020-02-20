import React from 'react';
import PropTypes from 'prop-types';

import './movie-tile.sass';

export const MovieTile = (props) => {
  const {
    data: {
      Title = '',
      Year,
      Poster,
    } = {},
    style,
  } = props;
  return (
    <div className="movie-tile" style={{ ...style }}>
      <div className="movie-tile__image" style={{ backgroundImage: `url(${Poster})` }} />
      <div className="movie-tile__info">
        <div className="movie-tile__info-item">
          <span className="bold">Title:</span>
          {` ${Title}`}
        </div>
        <div className="movie-tile__info-item">
          <span className="bold">Year:</span>
          {` ${Year}`}
        </div>
      </div>
    </div>
  );
};

MovieTile.propTypes = {
  data: PropTypes.shape({
    Title: PropTypes.string,
    Year: PropTypes.string,
    Poster: PropTypes.string,
  }),
  style: PropTypes.object,
};

MovieTile.defaultProps = {
  data: {},
  style: {},
};
