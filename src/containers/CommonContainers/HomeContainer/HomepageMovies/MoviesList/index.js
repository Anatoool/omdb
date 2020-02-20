import React from 'react';
import PropTypes from 'prop-types';
import { MovieTile } from 'components/Movies/MovieTile';
import './movies-list.sass';

export default class MoviesList extends React.PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: {},
  };

  render() {
    const { data: { Search = [] } = {} } = this.props;

    return (
      <div className="movies-list">
        {(Search || []).map((movie) => {
          const { imdbID } = movie;
          return (
            <MovieTile
              data={movie}
              key={imdbID}
              style={{ margin: '2rem 1rem 0 1rem' }}
            />
          );
        })}
      </div>
    );
  }
}
