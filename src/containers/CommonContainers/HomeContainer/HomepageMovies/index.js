import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { parse } from 'qs';
import { withRouter } from 'react-router';
import { Loader } from 'components/Loader';
import { ErrorPanel } from 'components/ErrorPanel';
import { Pagination } from 'components/Pagination';
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
@withRouter
export default class HomepageMovies extends React.PureComponent {
  static propTypes = {
    getHomepageMovies: PropTypes.func,
    moviesProcessingState: PropTypes.object,
    homepageList: PropTypes.object,
    location: PropTypes.object,
  };

  static defaultProps = {
    getHomepageMovies: Function.prototype,
    moviesProcessingState: {},
    homepageList: {},
    location: {},
  };

  state = {
    moviesListError: '',
  };

  async componentDidMount() {
    const { location } = this.props;
    const { search = '' } = location;
    const currentQueriesObject = parse(search, { ignoreQueryPrefix: true });
    await this.getMovies(currentQueriesObject);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { search = '' } = location;
    if (prevProps.location.search !== search) {
      const prevQueriesObject = parse(prevProps.location.search, { ignoreQueryPrefix: true });
      const currentQueriesObject = parse(search, { ignoreQueryPrefix: true });

      const { page: prevPage = 1 } = prevQueriesObject;
      const { page: currentPage = 1 } = currentQueriesObject;

      if (prevPage !== currentPage) {
        this.getMovies(currentQueriesObject);
      }
    }
  }

  getMovies = async ({
    page = 1,
  }) => {
    this.setState({ moviesListError: '' });
    const { getHomepageMovies } = this.props;
    const queryObject = {
      s: 'bat',
      page,
    };

    const response = await getHomepageMovies(stringifyQueryObject(queryObject));
    if (response.errorMessage) {
      this.setState({ moviesListError: response.errorMessage });
    }
  };

  render() {
    const { moviesProcessingState, homepageList } = this.props;
    const { totalResults } = homepageList;
    const { moviesListError } = this.state;

    return (
      <div className="homepage-movies">
        <Loader isShow={moviesProcessingState[MOVIES_PROCESSING_KEYS.HOMEPAGE_MOVIES]}>
          {moviesListError
            ? <ErrorPanel error={moviesListError} />
            : <MoviesList data={homepageList} />}
        </Loader>
        <div className="flex justify-content-center" style={{ marginTop: '3rem' }}>
          <Pagination total={+totalResults} pageSize={10} />
        </div>
      </div>
    );
  }
}
