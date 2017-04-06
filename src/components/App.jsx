import React from 'react';
import { connect } from 'react-redux';

import { fetchTransactions } from '../reducers/transactions';

class App extends React.Component {
  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    return <h1>Hello World!</h1>;
  }
}

App.propTypes = {
  fetchTransactions: React.PropTypes.func.isRequired,
};

export default connect(null, { fetchTransactions })(App);
