import React from 'react';
import PropTypes from 'prop-types';
import Radium from 'radium';
import { connect } from 'react-redux';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

import ChartTooltip from './ChartTooltip';
import { replaceAcronyms } from '../utils';

const mapStateToProps = state => ({
  accounts: state.accounts,
});

const styles = {
  container: {
    height: 200,
    width: 200,
    margin: '0 auto',
    position: 'relative',
  },
  total: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    margin: 0,
    fontSize: 24,
    color: '#303030',
    zIndex: -1,
  },
};

const DonutChart = ({ accounts }) => {
  // TODO: Add skeleton chart when there is no data
  // TODO: Add callback to filter on accounts on click
  const colors = ['#7383FD', '#7FA5FB', '#B2C3F9', '#39C596'];
  const data = Object.values(accounts).map(account => ({
    name: replaceAcronyms(startCase(toLower(account.accountName))),
    value: account.balance,
    institutionName: account.institutionName,
    transitNumber: account.transitNumber,
    accountNumber: account.accountNumber,
  })).sort((a, b) => b.value - a.value);

  return (
    <div style={styles.container}>
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          cx={100}
          cy={100}
          innerRadius={75}
          outerRadius={95}
          startAngle={90}
          endAngle={450}
        >
          {
            data.map((datum, index) =>
              <Cell key={datum.name} fill={colors[index % colors.length]} />,
            )
          }
        </Pie>
        <Tooltip content={<ChartTooltip />} />
      </PieChart>
      <p style={styles.total}>
        ${data
          .map(datum => datum.value)
          .reduce((total, balance) => total + balance, 0)
          .toLocaleString('en-US', { minimumFractionDigits: 2 })
        }
      </p>
    </div>
  );
};

DonutChart.propTypes = {
  accounts: PropTypes.objectOf(PropTypes.shape({
    accountId: PropTypes.string,
    institutionName: PropTypes.string,
    accountName: PropTypes.string,
    transitNumber: PropTypes.string,
    accountNumber: PropTypes.string,
    balance: PropTypes.number,
    balanceUpdated: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps)(Radium(DonutChart));
