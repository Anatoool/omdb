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
import Filters from './Filters';
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
    initialFilterValues: {},
  };

  async componentDidMount() {
    const { location } = this.props;
    const { search = '' } = location;
    const currentQueriesObject = parse(search, { ignoreQueryPrefix: true });
    await this.getMovies(currentQueriesObject);
    this.setInitialFilterValues(currentQueriesObject);
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { search = '' } = location;
    if (prevProps.location.search !== search) {
      const prevQueriesObject = parse(prevProps.location.search, { ignoreQueryPrefix: true });
      const currentQueriesObject = parse(search, { ignoreQueryPrefix: true });

      const {
        page: prevPage = 1,
        s: prevS = '',
        y: prevY = '',
      } = prevQueriesObject;
      const {
        page: currentPage = 1,
        s: currentS = '',
        y: currentY = '',
      } = currentQueriesObject;

      if (
        prevPage !== currentPage
        || prevS !== currentS
        || prevY !== currentY
      ) {
        this.getMovies(currentQueriesObject);
        this.setInitialFilterValues(currentQueriesObject);
      }
    }
  }

  getMovies = async ({
    page = 1,
    s = '',
    y = '',
  }) => {
    this.setState({ moviesListError: '' });
    const { getHomepageMovies } = this.props;
    if (!s) {
      return;
    }
    const queryObject = {
      s,
      y,
      page,
    };

    const response = await getHomepageMovies(stringifyQueryObject(queryObject));
    if (response.errorMessage) {
      this.setState({ moviesListError: response.errorMessage });
    }
  };

  setInitialFilterValues = ({ s = '', y = '' }) => {
    this.setState({ initialFilterValues: { s, y } });
  };

  render() {
    const { moviesProcessingState, homepageList } = this.props;
    const { totalResults } = homepageList;
    const { moviesListError, initialFilterValues } = this.state;

    return (
      <div className="homepage-movies">
        <div className="flex justify-content-center">
          <Filters initialValues={initialFilterValues} />
        </div>
        <Loader isShow={moviesProcessingState[MOVIES_PROCESSING_KEYS.HOMEPAGE_MOVIES]}>
          {moviesListError
            ? <ErrorPanel error={moviesListError} />
            : <MoviesList data={homepageList} />}
        </Loader>
        <div className="flex justify-content-center" style={{ marginTop: '3rem' }}>
          {+totalResults ? <Pagination total={+totalResults} pageSize={10} /> : null}
        </div>
      </div>
    );
  }
}
