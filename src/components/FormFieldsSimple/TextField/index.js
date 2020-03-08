/* @flow */
import React, { PureComponent, type Node } from 'react';
import './text-field.sass';

type Props = {
  value: string,
  label: string,
  type: string,
  placeholder: string,
  name: string,
  className: string,
  style: {},
  disabled: boolean,
  error: string,
  helperText: string,
  onBlur?: (...args: Array<any>) => any,
  onChange?: (...args: Array<any>) => any,
  onFocus?: (...args: Array<any>) => any,
};

export class TextFieldSimple extends PureComponent<Props> {
  static defaultProps = {
    value: '',
    label: '',
    type: 'text',
    placeholder: '',
    name: '',
    className: '',
    style: {},
    disabled: false,
    error: '',
    helperText: '',
    onChange: () => {},
    onBlur: () => {},
    onFocus: () => {},
  };

  renderLabel = (inputId: string): Node => {
    const { label } = this.props;
    if (!label) {
      return <label style={{ display: 'none' }} htmlFor={inputId}>{label}</label>;
    }

    return <label htmlFor={inputId}>{label}</label>;
  };

  renderBottomText = () => {
    const { helperText, error } = this.props;
    if (!helperText && !error) {
      return null;
    }

    return <div className="text-input-container__bottom-text">{error || helperText}</div>;
  };

  render() {
    const {
      value,
      type,
      placeholder,
      name,
      disabled,
      onChange,
      onBlur,
      onFocus,
      className,
      style,
      error,
    } = this.props;

    const finalClassName = `text-input-container ${className} ${error ? '_error' : ''}`;
    const inputId = `text-input-${name}`;

    // пропсы для передачи в input
    const inputProps = {
      value: value || '',
      type,
      placeholder,
      name,
      disabled,
      onChange,
      onBlur,
      onFocus,
    };

    return (
      <div style={{ ...style }} className={finalClassName}>
        <input {...inputProps} />
        { this.renderLabel(inputId) }
        { this.renderBottomText() }
      </div>
    );
  }
}
