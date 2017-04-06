import React from 'react';
import { connect } from 'react-redux';

import DonutChart from './DonutChart';
import TransactionHistory from './TransactionHistory';
import { fetchTransactions } from '../reducers/transactions';

const styles = {
  container: {
    height: '100vh',
    overflow: 'hidden',
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
  fetchTransactions: React.PropTypes.func.isRequired,
};

export default connect(null, { fetchTransactions })(App);
