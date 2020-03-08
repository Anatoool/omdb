/* @flow */
import React from 'react';

type Props = {
  error: string,
};

export const ErrorPanel = (props: Props) => {
  const { error = 'Unknown error' } = props;
  return (
    <div className="text-center bold" style={{ padding: '5rem' }}>
      {error}
    </div>
  );
};

ErrorPanel.defaultProps = {
  error: 'Unknown error',
};
