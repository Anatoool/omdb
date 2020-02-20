import React from 'react';
import PropTypes from 'prop-types';

import './button.sass';

export class Button extends React.PureComponent {
  button = React.createRef();

  static propTypes = {
    type: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    clickAreaSize: PropTypes.number,
    action: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyPress: PropTypes.func,
  };

  static defaultProps = {
    type: '',
    children: null,
    disabled: false,
    className: '',
    style: {},
    clickAreaSize: 60,
    action: Function.prototype,
    onFocus: Function.prototype,
    onKeyPress: Function.prototype,
  };

  state = {
    mousePressed: false,
    x: '0',
    y: '0',
  };

  setClickedState = (event) => {
    const rect = this.button.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    this.setState({
      mousePressed: true,
      x,
      y,
    });
  };

  unsetClickedState = () => {
    this.setState({ mousePressed: false });
  };

  render() {
    const {
      children,
      type,
      disabled,
      className,
      style,
      clickAreaSize,
      onFocus,
      onKeyPress,
      action,
    } = this.props;

    const { mousePressed, x, y } = this.state;
    const pressedClassName = mousePressed ? '_pressed' : '';
    const left = x - clickAreaSize / 2;
    const top = y - clickAreaSize / 2;

    return (
      <button
        disabled={disabled}
        onClick={action}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        className={`btn ${className} ${pressedClassName}`}
        type={type}
        ref={this.button}
        style={{ ...style }}
        onMouseDown={this.setClickedState}
        onMouseUp={this.unsetClickedState}
        onMouseLeave={this.unsetClickedState}
      >
        <div
          className="btn__click-area"
          style={{
            left,
            top,
            width: `${clickAreaSize}px`,
            height: `${clickAreaSize}px`,
          }}
        />
        <div className="btn__children">{children}</div>
      </button>
    );
  }
}
