import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './text-field.sass';

export class TextFieldSimple extends PureComponent {
  static propTypes = {
    value: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    helperText: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
  };

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

  renderLabel = (inputId) => {
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
