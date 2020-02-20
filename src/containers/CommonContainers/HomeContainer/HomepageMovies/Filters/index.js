import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { parse, stringify } from 'qs';
import { Form, Field } from 'react-final-form';
import { TextField } from 'components/FormFields/TextField';
import { SelectField } from 'components/FormFields/SelectField';
import { Button } from 'components/Button';
import { CLIENT_PAGES } from 'consts';
import './movies-filters.sass';

const yearsOptions = [];
const date = new Date();
let bufferDate = +date.getFullYear();
while (yearsOptions.length < 30) {
  date.getFullYear();
  yearsOptions.push({ label: `${bufferDate}`, value: `${bufferDate}` });
  bufferDate -= 1;
}

export const validate = (values = {}) => {
  const { s } = values;
  const errors = {};
  if (!s) {
    errors.s = 'Field is required!';
  }
  return errors;
};

@withRouter
export default class MoviesFilters extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object,
    history: PropTypes.object,
    initialValues: PropTypes.object,
  };

  static defaultProps = {
    location: {},
    history: {},
    initialValues: {},
  };

  onSubmit = (values) => {
    const { location: { search }, history } = this.props;

    const { s, y } = values;
    const queryObject = parse(search, { ignoreQueryPrefix: true });
    queryObject.page = 1;
    queryObject.s = s;
    queryObject.y = y;
    const query = stringify(queryObject, { addQueryPrefix: true });
    history.push(`${CLIENT_PAGES.HOME}${query}`);
  };

  render() {
    const { initialValues } = this.props;

    return (
      <div className="movies-filters">
        <Form
          initialValues={initialValues}
          onSubmit={this.onSubmit}
          validate={validate}
          render={(formProps) => {
            const { handleSubmit } = formProps;
            return (
              <form className="movies-filters__form" onSubmit={handleSubmit}>
                <div className="movies-filters__inputs-container" style={{ flexBasis: '1' }}>
                  <Field
                    name="s"
                    label="Search"
                    component={TextField}
                    className="movies-filters__search"
                  />
                  <Field
                    name="y"
                    label="Year"
                    component={SelectField}
                    options={yearsOptions}
                  />
                </div>

                <Button type="submit" style={{ width: '140px' }} className="_primary">Search</Button>
              </form>
            );
          }}
        />
      </div>
    );
  }
}
