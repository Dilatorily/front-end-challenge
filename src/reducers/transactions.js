import { updateAccounts } from './accounts';
import { updateCategories } from './categories';
import { setAccountFilter, setCategoryFilter } from './ui';

const UPDATE_TRANSACTIONS = 'front-end-challenge/transactions/GET_TRANSACTIONS';
const RESET_TRANSACTIONS = 'front-end-challenge/transactions/RESET_TRANSACTIONS';
const TRANSACTIONS_API = 'https://demo7235469.mockable.io/transactions';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_TRANSACTIONS:
      return {
        ...state,
        ...action.payload.reduce(
          (map, transaction) => ({ ...map, [transaction.transactionId]: transaction }),
          {},
        ),
      };
    case RESET_TRANSACTIONS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

const updateTransactions = payload => ({ type: UPDATE_TRANSACTIONS, payload });
export const fetchTransactions = (url = TRANSACTIONS_API) => async (dispatch, getState) => {
  const transactions = await fetch(url).then(response => response.json());

  await Promise.all([
    dispatch(updateTransactions(transactions.transactionData.transactions)),
    dispatch(updateAccounts(transactions)),
    dispatch(updateCategories(transactions)),
  ]);

  const accounts = Object.keys(getState().accounts);
  const categories = Object.keys(getState().categories);
  return Promise.all([
    dispatch(setAccountFilter(accounts)),
    dispatch(setCategoryFilter(categories)),
  ]);
};

export const resetTransactions = () => ({ type: RESET_TRANSACTIONS });
