import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import format from 'date-fns/format';

import TransactionEntry from './TransactionEntry';

const mapStateToProps = (state, props) => ({
  accounts: state.ui.filters.accounts,
  categories: state.ui.filters.categories,
  transactions: Object.values(state.transactions)
    .filter(transaction => transaction.transactionDate === props.date),
});

const styles = {
  list: {
    margin: 0,
    padding: 0,
    listStyleType: 'none',
  },
  date: {
    color: '#303030',
    backgroundColor: '#E5E5E5',
    padding: '5px 10px',
    fontSize: 14,
    fontWeigth: 300,
  },
};

const TransactionDay = ({ accounts, categories, date, transactions }) => (
  <ul style={styles.list}>
    <li style={styles.date} title={format(date, 'MMMM Do, YYYY')}>
      {format(date, 'MMMM Do, YYYY')}
    </li>
    {
      transactions
        .filter(transaction =>
          accounts.includes(transaction.accountId) &&
          categories.includes(transaction.category || ''),
        )
        .map((transaction, index) => {
          const key = `${date}-${index}`;
          return <TransactionEntry key={key} transaction={transaction} />;
        })
    }
  </ul>
);

TransactionDay.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.string).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  date: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    accountId: PropTypes.string,
    transactionDate: PropTypes.string,
    description: PropTypes.string,
    amount: PropTypes.number,
    withdrawal: PropTypes.number,
    runningBalance: PropTypes.number,
    category: PropTypes.string,
    transactionId: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(TransactionDay);
