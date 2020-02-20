import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/Button';
import { Link } from 'react-router-dom';
import { CLIENT_PAGES } from 'consts';

import './movie-tile.sass';

export const MovieTile = (props) => {
  const {
    data: {
      Title = '',
      Year,
      Poster,
      imdbID,
    } = {},
    style,
  } = props;

  const resultPoster = /^http/.test(Poster) ? Poster : '/assets/images/default-image.jpg';

  return (
    <div className="movie-tile" style={{ ...style }}>
      <div className="movie-tile__image" style={{ backgroundImage: `url(${resultPoster})` }} />
      <div className="movie-tile__info">

        <div>
          <div className="movie-tile__info-item">
            <span className="bold">Title:</span>
            {` ${Title}`}
          </div>
          <div className="movie-tile__info-item">
            <span className="bold">Year:</span>
            {` ${Year}`}
          </div>
        </div>

        <div className="flex justify-content-flex-end">
          <Link to={CLIENT_PAGES.MOVIE_DETAILS(imdbID)}>
            <Button style={{ width: '130px' }} className="_primary _small">Details</Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

MovieTile.propTypes = {
  data: PropTypes.shape({
    imdbID: PropTypes.string,
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
