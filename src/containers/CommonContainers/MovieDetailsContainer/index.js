import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getMovieDetails as getMovieDetailsAC, MOVIES_PROCESSING_KEYS } from 'store/actions/movies';
import { stringifyQueryObject } from 'utils/api/stringifyQuery';
import { ErrorPanel } from 'components/ErrorPanel';
import { Loader } from 'components/Loader';
import './movie-details.sass';

@connect(
  ({
    moviesState: {
      processing: moviesProcessingState,
      movieDetails,
    },
  }) => ({
    moviesProcessingState,
    movieDetails,
  }),
  (dispatch) => ({
    getMovieDetails: bindActionCreators(getMovieDetailsAC, dispatch),
  }),
)
export default class MovieDetailsContainer extends React.PureComponent {
  static propTypes = {
    getMovieDetails: PropTypes.func,
    moviesProcessingState: PropTypes.object,
    movieDetails: PropTypes.object,
    match: PropTypes.object,
  };

  static defaultProps = {
    getMovieDetails: Function.prototype,
    moviesProcessingState: {},
    movieDetails: {},
    match: {},
  };

  state = {
    movieDetailsError: '',
  };

  componentDidMount() {
    this.getMovie();
  }

  getMovie = async () => {
    const { getMovieDetails, match: { params: { id: i } = {} } = {} } = this.props;
    const queryObject = { i };

    const response = await getMovieDetails(stringifyQueryObject(queryObject));
    if (response.errorMessage) {
      this.setState({ movieDetailsError: response.errorMessage });
    }
  };

  render() {
    const { movieDetailsError } = this.state;
    if (movieDetailsError) {
      return (
        <div className="movie-details container">
          <ErrorPanel error={movieDetailsError} />
        </div>
      );
    }

    const { movieDetails, moviesProcessingState } = this.props;
    const { Poster, ...tailMovieDetails } = movieDetails;

    const descriptionArr = [];
    Object.keys(tailMovieDetails).forEach((key) => {
      if (typeof movieDetails[key] !== 'string') {
        return;
      }
      descriptionArr.push({ title: key, value: movieDetails[key] });
    });

    const resultPoster = /^http/.test(Poster) ? Poster : '/assets/images/default-image.jpg';

    return (
      <Loader isShow={moviesProcessingState[MOVIES_PROCESSING_KEYS.MOVIE_DETAILS]}>
        <div className="movie-details container">
          <div className="movie-details__img-container">
            <img className="movie-details__img" src={resultPoster} alt="movie poster" />
          </div>
          <div className="movie-details__info">
            {descriptionArr.map(({ title, value }) => (
              <div className="movie-details__description-item" key={title}>
                <span className="bold">{`${title}: `}</span>
                {value}
              </div>
            ))}
          </div>
        </div>
      </Loader>
    );
  }
}
