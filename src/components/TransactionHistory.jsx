import React from 'react';
import { connect } from 'react-redux';

import TransactionDay from './TransactionDay';

const mapStateToProps = state => ({
  sort: state.ui.sort,
  transactions: Object.values(state.transactions),
});

const TransactionHistory = ({ sort, transactions }) => (
  <div>
    <div>
      <div>Transactions</div>
      <div>Show All</div>
      <div>Sort By</div>
    </div>
    <div>
      {
        transactions
          .map(transaction => transaction.transactionDate)
          .filter((date, index, dates) => dates.indexOf(date) === index)
          .sort((a, b) => {
            if (a > b) {
              return sort === 'asc' ? 1 : -1;
            } else if (a < b) {
              return sort === 'asc' ? -1 : 1;
            }
            return 0;
          })
          .map(date => <TransactionDay key={date} date={date} />)
      }
    </div>
  </div>
);

TransactionHistory.propTypes = {
  sort: React.PropTypes.string.isRequired,
  transactions: React.PropTypes.arrayOf(React.PropTypes.shape({
    transactionDate: React.PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(TransactionHistory);
