import React from 'react';
import { connect } from 'react-redux';

import TransactionDay from './TransactionDay';
import { toggleSort } from '../reducers/ui';

const mapStateToProps = state => ({
  accounts: state.ui.filters.accounts,
  sort: state.ui.sort,
  transactions: Object.values(state.transactions),
});

const styles = {
  container: {
    height: 'calc(100vh - 400px)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5px 10px',
    height: 40,
    boxSizing: 'border-box',
  },
  sort: {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    color: '#303030',
    textAlign: 'right',
  },
  sortText: {
    fontSize: 12,
    fontWeight: 300,
    color: '#A3A3A3',
  },
  transactions: {
    position: 'relative',
    height: 'calc(100% - 40px)',
    overflow: 'auto',
  },
};

class TransactionHistory extends React.Component {
  handleSortClick = () => this.props.toggleSort()

  render() {
    const { accounts, sort, transactions } = this.props;
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <div>Showing All Transactions</div>
          <button style={styles.sort} onClick={this.handleSortClick}>
            <div style={styles.sortText}>Sort By</div>
            {
              sort === 'asc' ?
                <div>Oldest <span className="fa fa-caret-up" /></div> :
                <div>Newest <span className="fa fa-caret-down" /></div>
            }
          </button>
        </div>
        <div style={styles.transactions}>
          {
            transactions
              .filter(transaction => accounts.includes(transaction.accountId))
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
  }
}

TransactionHistory.propTypes = {
  accounts: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  sort: React.PropTypes.string.isRequired,
  toggleSort: React.PropTypes.func.isRequired,
  transactions: React.PropTypes.arrayOf(React.PropTypes.shape({
    transactionDate: React.PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, { toggleSort })(TransactionHistory);
