import React from 'react';
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
  accounts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  categories: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  date: React.PropTypes.string.isRequired,
  transactions: React.PropTypes.arrayOf(React.PropTypes.shape({
    accountId: React.PropTypes.string,
    transactionDate: React.PropTypes.string,
    description: React.PropTypes.string,
    amount: React.PropTypes.number,
    withdrawal: React.PropTypes.number,
    runningBalance: React.PropTypes.number,
    category: React.PropTypes.string,
    transactionId: React.PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(TransactionDay);
