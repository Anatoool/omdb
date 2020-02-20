import axios from 'axios';

let axiosClient = null;

class AxiosClient {
  constructor(props = {}) {
    Object.keys(props).forEach((propName) => {
      this[`_${propName}`] = props[propName];
    });

    const localAxios = axios.create({
      baseURL: this._API_URL,
    });

    localAxios.interceptors.request.use((config) => {
      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      return {
        ...config,
        headers,
      };
    });

    localAxios.interceptors.response.use(
      (response) => ({ ...response.data }),
      async (error) => {
        const { response = {} } = error;

        const unknownServerError = 'Unknown server error';
        const networkConnectionError = 'Network connection error';
        const { data: { Error } = {} } = response;
        return {
          statusCode: response.status,
          errorMessage: response.status ? Error || unknownServerError : networkConnectionError,
          ...response.data,
        };
      },
    );

    this._client = localAxios;
  }

  getAxios() {
    return this._client;
  }
}

/*
 * Initialization
 * @param {object} props - some properties
 */
function init(props) {
  axiosClient = new AxiosClient(props);
}

/*
 * Will return new instance of Axios
 * @returns {object}
 */
function getAxios() {
  return axiosClient.getAxios();
}

export { init, getAxios };
