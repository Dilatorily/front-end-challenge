import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  categories: state.categories,
});

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: 50,
    padding: '5px 20px',
    borderBottom: '1px solid #E5E5E5',
    transition: '0.25s ease-in-out',
    ':hover': {
      backgroundColor: '#F7F7F7',
    },
  },
  leftContainer: {
    maxWidth: 'calc(100% - 100px)',
  },
  description: {
    margin: 0,
    color: '#303030',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  category: {
    margin: 0,
    fontWeight: 300,
    fontSize: 14,
    color: '#A3A3A3',
  },
  amount: {
    verticalAlign: 'middle',
    color: '#39C596',
    fontSize: 20,
    fontWeight: 300,
  },
  negative: {
    color: '#F990A4',
  },
};

const TransactionEntry = ({ categories, transaction }) => (
  <li style={styles.container}>
    <div style={styles.leftContainer}>
      <p style={styles.description} title={transaction.description}>
        {transaction.description}
      </p>
      <p style={styles.category} title={categories[transaction.category]}>
        {categories[transaction.category]}
      </p>
    </div>
    <div style={[styles.amount, transaction.amount < 0 && styles.negative]}>
      ${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
    </div>
  </li>
);

TransactionEntry.propTypes = {
  categories: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  transaction: React.PropTypes.shape({
    accountId: React.PropTypes.string,
    transactionDate: React.PropTypes.string,
    description: React.PropTypes.string,
    amount: React.PropTypes.number,
    withdrawal: React.PropTypes.number,
    runningBalance: React.PropTypes.number,
    category: React.PropTypes.string,
    transactionId: React.PropTypes.string,
  }).isRequired,
};

export default connect(mapStateToProps)(Radium(TransactionEntry));
