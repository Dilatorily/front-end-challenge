import React from 'react';
import Radium from 'radium';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

import MultiSelect from './MultiSelect';
import TransactionDay from './TransactionDay';
import { toggleSort } from '../reducers/ui';
import { replaceAcronyms } from '../utils';

const mapStateToProps = state => ({
  accounts: state.accounts,
  categories: state.categories,
  filters: state.ui.filters,
  sort: state.ui.sort,
  transactions: Object.values(state.transactions),
});

const styles = {
  container: {
    height: 'calc(100vh - 300px)',
    '@media only screen and (max-height: 600px)': {
      height: 'calc(100vh - 200px)',
    },
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: '5px 10px',
    height: 40,
    boxSizing: 'border-box',
    backgroundColor: 'rgba(178, 195, 249, 0.5)',
  },
  buttonHeader: {
    fontSize: 12,
    fontWeight: 300,
    color: '#A3A3A3',
    '@media only screen and (max-width: 360px)': {
      fontSize: 10,
    },
  },
  buttonText: {
    fontSize: 14,
    color: '#303030',
    '@media only screen and (max-width: 360px)': {
      fontSize: 12,
    },
  },
  accounts: {
    marginRight: 20,
  },
  categories: {
    marginRight: 20,
  },
  date: {
    margin: 0,
    padding: 0,
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    background: 'none',
    color: '#303030',
    width: 60,
  },
  transactions: {
    position: 'relative',
    height: 'calc(100% - 40px)',
    overflow: 'auto',
  },
};

class TransactionHistory extends React.Component {
  handleDateClick = () => this.props.toggleSort()

  render() {
    const { accounts, categories, filters, sort, transactions } = this.props;
    const accountOptions = Object.values(accounts).map(account => ({
      value: account.accountId,
      text: replaceAcronyms(startCase(toLower(account.accountName))),
    })).sort((a, b) => {
      if (a.text > b.text) {
        return 1;
      } else if (a.text < b.text) {
        return -1;
      }

      return 0;
    });
    const categoryOptions = Object.entries(categories)
      .map(([value, text]) => ({ value, text }))
      .sort((a, b) => {
        if (a.text > b.text) {
          return 1;
        } else if (a.text < b.text) {
          return -1;
        }

        return 0;
      });
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <MultiSelect style={styles.accounts} value={filters.accounts} options={accountOptions}>
            <div style={styles.buttonHeader}>Showing Transactions</div>
            <div style={styles.buttonText}>All Accounts <span className="fa fa-caret-down" /></div>
          </MultiSelect>
          <MultiSelect
            style={styles.categories}
            listStyle={{ right: 0 }}
            value={filters.categories}
            options={categoryOptions}
          >
            <div style={styles.buttonHeader}>Filter By</div>
            <div style={styles.buttonText}>All Categories <span className="fa fa-caret-down" /></div>
          </MultiSelect>
          <button style={styles.date} onClick={this.handleDateClick}>
            <div style={styles.buttonHeader}>Sort By</div>
            {
              sort === 'asc' ?
                <div style={styles.buttonText}>Oldest <span className="fa fa-caret-up" /></div> :
                <div style={styles.buttonText}>Newest <span className="fa fa-caret-down" /></div>
            }
          </button>
        </div>
        <div style={styles.transactions}>
          {
            transactions
              .filter(transaction => filters.accounts.includes(transaction.accountId))
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
  accounts: React.PropTypes.objectOf(React.PropTypes.shape({
    accountId: React.PropTypes.string,
    institutionName: React.PropTypes.string,
    accountName: React.PropTypes.string,
    transitNumber: React.PropTypes.string,
    accountNumber: React.PropTypes.string,
    balance: React.PropTypes.number,
    balanceUpdated: React.PropTypes.string,
  })).isRequired,
  categories: React.PropTypes.objectOf(React.PropTypes.string).isRequired,
  filters: React.PropTypes.shape({
    accounts: React.PropTypes.arrayOf(React.PropTypes.string),
    categories: React.PropTypes.arrayOf(React.PropTypes.string),
  }).isRequired,
  sort: React.PropTypes.string.isRequired,
  toggleSort: React.PropTypes.func.isRequired,
  transactions: React.PropTypes.arrayOf(React.PropTypes.shape({
    transactionDate: React.PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, { toggleSort })(Radium(TransactionHistory));
