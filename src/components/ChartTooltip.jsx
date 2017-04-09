import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  container: {
    backgroundColor: 'white',
    border: '1px solid #E5E5E5',
    borderRadius: 2,
    padding: 5,
    textAlign: 'center',
    color: '#303030',
  },
  description: {
    fontSize: 10,
    fontWeight: 300,
    margin: 0,
  },
  value: {
    margin: 0,
  },
};

const ChartTooltip = ({ active, payload }) => {
  if (!active) {
    return null;
  }

  return (
    <div style={styles.container}>
      <p style={styles.description}>{payload[0].name}</p>
      <p style={styles.description}>{payload[0].institutionName}</p>
      <p style={styles.description}>{payload[0].transitNumber} {payload[0].accountNumber}</p>
      <p style={styles.value}>${payload[0].value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
    </div>
  );
};

ChartTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

ChartTooltip.defaultProps = {
  active: false,
  payload: [],
};

export default ChartTooltip;
