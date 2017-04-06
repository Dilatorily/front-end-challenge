import React from 'react';
import { connect } from 'react-redux';

import TransactionEntry from './TransactionEntry';

const mapStateToProps = (state, props) => ({
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
    borderBottom: '1px solid black',
  },
};

const TransactionDay = ({ date, transactions }) => (
  <ul style={styles.list}>
    <li style={styles.date}>{date}</li>
    {
      transactions.map((transaction, index) => {
        const key = `${date}-${index}`;
        return <TransactionEntry key={key} transaction={transaction} />;
      })
    }
  </ul>
);

TransactionDay.propTypes = {
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
