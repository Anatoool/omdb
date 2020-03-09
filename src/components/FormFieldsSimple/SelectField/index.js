/* @flow */
import React, { type Node } from 'react';
import ReactSelect, { components } from 'react-select';

import './select.sass';

const ValueContainer = (props): Node => {
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

type SelectProps = {
  options: Array<{ label: string, value: string }>,
  value: Array<string> | string | null,
  placeholder: string,
  noOptionsMessage: string,
  onBlur: (...args: Array<any>) => any,
  onChange: (string | Array<string>) => any,
  onFocus: (...args: Array<any>) => any,
  name: string,
  label: string,
  isMulti: boolean,
  styleTypes: Array<'small-gray'>,
  valueContainerIcon: Node,
};

export class Select extends React.PureComponent<SelectProps> {
  static defaultProps = {
    options: [],
    placeholder: '',
    noOptionsMessage: 'Not found options',
    onChange: () => {},
    onFocus: () => {},
    onBlur: () => {},
    value: null,
    name: '',
    isMulti: false,
    valueContainerIcon: null,
    label: '',
    styleTypes: [],
  };

  onChange = (
    changeValue: ?{ value: string } | ?Array<{ value: string }>,
  ): void => {
    const { onChange, isMulti } = this.props;

    if (!Array.isArray(changeValue)) {
      const { value } = changeValue || {};
      onChange(value);
    } else if (isMulti) {
      onChange(changeValue ? changeValue.map(({ value }) => value) : []);
    }
  };

  renderLabel = (inputId: string): Node => {
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
      if (isMulti && Array.isArray(value)) {
        resultValueProps.value = options.filter(({ value: optVal }) => value.find((val) => val === optVal));
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

            } : {}),
            DropdownIndicator: () => (
              <img
                alt="arrow"
                src="/assets/images/icons/arrow-down.svg"
                className="select__arrow"
              />
            ),
            ValueContainer,
          }}
        />
        { this.renderLabel(inputId) }
      </div>
    );
  }
}
