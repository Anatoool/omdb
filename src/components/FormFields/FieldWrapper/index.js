import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default function (Component) {
  class fieldHOC extends PureComponent {
    static propTypes = {
      input: PropTypes.object.isRequired,
      meta: PropTypes.object.isRequired,
    };

    render() {
      const {
        input,
        meta,
        ...tailProps
      } = this.props;

      const inputBehaviorProps = {
        onChange: (value) => {
          input.onChange(value);
        },
        onFocus: input.onFocus,
        onBlur: input.onBlur,
        value: input.value,
      };
      return (
        <Component error={meta.touched ? meta.error : ''} {...tailProps} {...inputBehaviorProps} />
      );
    }
  }

  return fieldHOC;
}
