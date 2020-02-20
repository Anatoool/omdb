import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect, { components } from 'react-select';
import { ArrowDownIcon } from 'components/SvgIcons';

import './select.sass';

const ValueContainer = (props) => {
  const { selectProps = {}, children } = props || {};
  const { valueContainerIcon = null } = selectProps;
  return (
    <>
      {valueContainerIcon}
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
    </>
  );
};

export class Select extends React.Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({ label: PropTypes.string, value: PropTypes.string })),
    placeholder: PropTypes.string,
    noOptionsMessage: PropTypes.string,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.string,
    ]),
    name: PropTypes.string,
    isMulti: PropTypes.bool,
    valueContainerIcon: PropTypes.node,
    label: PropTypes.string,
    styleTypes: PropTypes.arrayOf(PropTypes.oneOf(['small-gray'])),
  };

  static defaultProps = {
    options: [],
    placeholder: '',
    noOptionsMessage: 'Not found options',
    onChange: Function.prototype,
    onFocus: Function.prototype,
    onBlur: Function.prototype,
    value: null,
    name: '',
    isMulti: false,
    valueContainerIcon: null,
    label: '',
    styleTypes: [],
  };

  onChange = (changeValue) => {
    const { onChange, isMulti } = this.props;
    if (isMulti) {
      onChange(changeValue ? changeValue.map(({ value }) => value) : []);
    } else {
      const { value } = changeValue;
      onChange(value);
    }
  };

  renderLabel = (inputId) => {
    const { label } = this.props;
    if (!label) {
      return <label style={{ display: 'none' }} htmlFor={inputId}>{label}</label>;
    }
    return <label htmlFor={inputId}>{label}</label>;
  };

  render() {
    const {
      options,
      placeholder, noOptionsMessage,
      value,
      name,
      isMulti,
      valueContainerIcon,
      onFocus,
      onBlur,
      styleTypes,
    } = this.props;

    const styleTypesClassName = styleTypes.reduce((acc, val) => `${acc} select__${val}`, '');

    const resultValueProps = {};
    if (value) {
      if (isMulti) {
        resultValueProps.value = options.filter(({ value: optVal }) => {
          return value.find((val) => val === optVal);
        });
      } else {
        resultValueProps.value = options.find(({ value: optVal }) => optVal === value);
      }
    }

    const inputId = `text-input-${name}`;

    return (
      <div className="select-container">
        <ReactSelect
          {...resultValueProps}
          id={inputId}
          className={`select ${styleTypesClassName}`}
          classNamePrefix="select"
          maxMenuHeight={200}
          options={options}
          noOptionsMessage={() => noOptionsMessage}
          onChange={this.onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          isMulti={isMulti}
          valueContainerIcon={valueContainerIcon}
          components={{
            IndicatorSeparator: () => null,
            ClearIndicator: () => null,
            ...(global.IS_BROWSER ? {
              DropdownIndicator: () => <ArrowDownIcon className="select__arrow" />,
            } : {}),
            ValueContainer,
          }}
        />
        { this.renderLabel(inputId) }
      </div>
    );
  }
}
