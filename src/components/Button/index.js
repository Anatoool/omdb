/* @flow */
import React, { type Node } from 'react';
import './button.sass';

type Props = {
  type: 'button' | 'submit' | 'reset',
  children?: Node,
  disabled?: boolean,
  className: string,
  style?: {},
  clickAreaSize: number,
  onClick?: (...args: Array<any>) => any,
  onFocus?: (...args: Array<any>) => any,
  onKeyPress?: (...args: Array<any>) => any,
};

type State = {
  mousePressed: boolean,
  x: number,
  y: number,
};

export class Button extends React.PureComponent<Props, State> {
  button: { current: null | HTMLButtonElement } = React.createRef();

  static defaultProps = {
    type: 'button',
    children: null,
    disabled: false,
    className: '',
    style: {},
    clickAreaSize: 60,
    // onClick: Function.prototype,
    // onFocus: Function.prototype,
    // onKeyPress: Function.prototype,
  };

  state = {
    mousePressed: false,
    x: 0,
    y: 0,
  };

  setClickedState = (event: MouseEvent) => {
    if (!this.button.current) return;
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
      onClick,
      onFocus,
      onKeyPress,
    } = this.props;

    const { mousePressed, x, y } = this.state;
    const pressedClassName = mousePressed ? '_pressed' : '';
    const left = x - clickAreaSize / 2;
    const top = y - clickAreaSize / 2;

    return (
      /* eslint-disable-next-line react/button-has-type */
      <button
        disabled={disabled}
        onClick={onClick}
        onFocus={onFocus}
        onKeyPress={onKeyPress}
        className={`btn ${className} ${pressedClassName}`}
        type={type || 'button'}
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
