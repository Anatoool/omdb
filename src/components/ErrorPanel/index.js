import React from 'react';
import PropTypes from 'prop-types';

export const ErrorPanel = (props) => {
  const { error } = props;
  return (
    <div className="text-center bold" style={{ padding: '5rem' }}>
      {error}
    </div>
  );
};

ErrorPanel.propTypes = {
  error: PropTypes.string,
};

ErrorPanel.defaultProps = {
  error: 'Unknown error',
};
