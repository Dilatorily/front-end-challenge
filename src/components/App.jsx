import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import DonutChart from './DonutChart';
import TransactionHistory from './TransactionHistory';
import { fetchTransactions } from '../reducers/transactions';

const styles = {
  container: {
    maxWidth: 800,
    margin: '0 auto',
  },
};

class App extends React.Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    return (
      <div style={styles.container}>
        <DonutChart />
        <TransactionHistory />
      </div>
    );
  }
}

App.propTypes = {
  fetchTransactions: PropTypes.func.isRequired,
};

export default connect(null, { fetchTransactions })(App);
