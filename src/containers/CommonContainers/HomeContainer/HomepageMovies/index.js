import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Loader } from 'components/Loader';
import { ErrorPanel } from 'components/ErrorPanel';
import { stringifyQueryObject } from 'utils/api/stringifyQuery';
import {
  getHomepageMovies as getHomepageMoviesAC,
  MOVIES_PROCESSING_KEYS,
} from 'store/actions/movies';
import MoviesList from './MoviesList';

@connect(
  ({
    moviesState: {
      processing: moviesProcessingState,
      homepageList,
    },
  }) => ({
    moviesProcessingState,
    homepageList,
  }),
  (dispatch) => ({
    getHomepageMovies: bindActionCreators(getHomepageMoviesAC, dispatch),
  }),
)
export default class HomepageMovies extends React.PureComponent {
  static propTypes = {
    getHomepageMovies: PropTypes.func,
    moviesProcessingState: PropTypes.object,
    homepageList: PropTypes.object,
  };

  static defaultProps = {
    getHomepageMovies: Function.prototype,
    moviesProcessingState: {},
    homepageList: {},
  };

  state = {
    moviesListError: '',
  };

  async componentDidMount() {
    await this.getMovies();
  }

  getMovies = async () => {
    this.setState({ moviesListError: '' });
    const { getHomepageMovies } = this.props;
    const queryObject = {
      s: 'bat',
      page: 1,
    };

    const response = await getHomepageMovies(stringifyQueryObject(queryObject));
    if (response.errorMessage) {
      this.setState({ moviesListError: response.errorMessage });
    }
  };

  render() {
    const { moviesProcessingState, homepageList } = this.props;
    const { moviesListError } = this.state;

    return (
      <div className="homepage-movies">
        <Loader isShow={moviesProcessingState[MOVIES_PROCESSING_KEYS.HOMEPAGE_MOVIES]}>
          {moviesListError
            ? <ErrorPanel error={moviesListError} />
            : <MoviesList data={homepageList} />}
        </Loader>
      </div>
    );
  }
}
