import { combineReducers } from 'redux';

import accounts from './accounts';
import categories from './categories';
import transactions from './transactions';

export default combineReducers({
  accounts,
  categories,
  transactions,
});
