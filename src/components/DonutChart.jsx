import React from 'react';
import Radium from 'radium';

const styles = {
  container: {
    height: 300,
    '@media only screen and (max-height: 600px)': {
      height: 200,
    },
  },
};

const DonutChart = () => <div style={styles.container}>Donut Chart</div>;

export default Radium(DonutChart);
