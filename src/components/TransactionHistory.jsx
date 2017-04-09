import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { connect } from 'react-redux';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

import MultiSelect from './MultiSelect';
import TransactionDay from './TransactionDay';
import { setAccountFilter, setCategoryFilter, toggleSort } from '../reducers/ui';
import { pluralize, replaceAcronyms } from '../utils';

const mapStateToProps = state => ({
  accounts: state.accounts,
  categories: state.categories,
  filters: state.ui.filters,
  sort: state.ui.sort,
  transactions: Object.values(state.transactions),
});

const mapDispatchToProps = dispatch => ({
  setAccountFilter: accounts => dispatch(setAccountFilter(accounts)),
  setCategoryFilter: categories => dispatch(setCategoryFilter(categories)),
  toggleSort: () => dispatch(toggleSort()),
});

const styles = {
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
  categoriesList: {
    right: 0,
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
  },
};

class TransactionHistory extends React.Component {
  handleAccountChange = (account) => {
    let accounts = [...this.props.filters.accounts];

    if (accounts.includes(account)) {
      accounts = accounts.filter(a => a !== account);
    } else {
      accounts.push(account);
    }

    this.props.setAccountFilter(accounts);
  }

  handleAccountReset = () => {
    const accounts = Object.keys(this.props.accounts);
    this.props.setAccountFilter(accounts);
  }

  handleCategoryChange = (category) => {
    let categories = [...this.props.filters.categories];

    if (categories.includes(category)) {
      categories = categories.filter(c => c !== category);
    } else {
      categories.push(category);
    }

    this.props.setCategoryFilter(categories);
  }

  handleCategoryReset = () => {
    const categories = Object.keys(this.props.categories);
    this.props.setCategoryFilter(categories);
  }

  handleDateClick = () => this.props.toggleSort()

  render() {
    // TODO: Add skeleton days and skeleton entries when there is no data
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
      <div>
        <div style={styles.header}>
          <MultiSelect
            style={styles.accounts}
            value={filters.accounts}
            options={accountOptions}
            onChange={this.handleAccountChange}
            onReset={this.handleAccountReset}
          >
            <div style={styles.buttonHeader}>Showing Transactions</div>
            <div style={styles.buttonText}>
              {
                filters.accounts.length === Object.keys(accounts).length ?
                'All' :
                filters.accounts.length
              } {pluralize('Account', filters.accounts.length)} <span className="fa fa-caret-down" />
            </div>
          </MultiSelect>
          <MultiSelect
            style={styles.categories}
            listStyle={styles.categoriesList}
            value={filters.categories}
            options={categoryOptions}
            onChange={this.handleCategoryChange}
            onReset={this.handleCategoryReset}
          >
            <div style={styles.buttonHeader}>Filter By</div>
            <div style={styles.buttonText}>
              {
                filters.categories.length === Object.keys(categories).length ?
                'All' :
                filters.categories.length
              } {pluralize('Category', filters.categories.length)} <span className="fa fa-caret-down" />
            </div>
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
              .filter(transaction =>
                filters.accounts.includes(transaction.accountId) &&
                filters.categories.includes(transaction.category || ''),
              )
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
  accounts: PropTypes.objectOf(PropTypes.shape({
    accountId: PropTypes.string,
    institutionName: PropTypes.string,
    accountName: PropTypes.string,
    transitNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    balance: PropTypes.number,
    balanceUpdated: PropTypes.string,
  })).isRequired,
  categories: PropTypes.objectOf(PropTypes.string).isRequired,
  filters: PropTypes.shape({
    accounts: PropTypes.arrayOf(PropTypes.string),
    categories: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  setAccountFilter: PropTypes.func.isRequired,
  setCategoryFilter: PropTypes.func.isRequired,
  sort: PropTypes.string.isRequired,
  toggleSort: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    transactionDate: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Radium(TransactionHistory));
