/* @flow */
import React, { PureComponent, type AbstractComponent } from 'react';

type FinalFormInputProps = {
  input: {
    onChange: (...args: Array<any>) => any,
    onFocus: (...args: Array<any>) => any,
    onBlur: (...args: Array<any>) => any,
    value: {} | string | number,
  },
  meta: {
    touched: boolean,
    error: string,
  },
};

export default function<Config: {}> (
  Component: AbstractComponent<Config>,
) {
  class fieldHOC extends PureComponent<{...Config, ...FinalFormInputProps}> {
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
        <Component {...tailProps} error={meta.touched ? meta.error : ''} {...inputBehaviorProps} />
      );
    }
  }

  return fieldHOC;
}
