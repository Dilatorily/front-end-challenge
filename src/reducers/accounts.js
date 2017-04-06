const UPDATE_ACCOUNTS = 'front-end-challenge/accounts/UPDATE_ACCOUNTS';
const RESET_ACCOUNTS = 'front-end-challenge/accounts/RESET_ACCOUNTS';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_ACCOUNTS:
      return {
        ...state,
        ...action.payload.reduce(
          (map, account) => ({ ...map, [account.accountId]: account }),
          {},
        ),
      };
    case RESET_ACCOUNTS:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const updateAccounts = transactions => ({
  type: UPDATE_ACCOUNTS,
  payload: [
    ...transactions.accounts,
    ...transactions.transactionData.transactions
      .map(transaction => ({ accountId: transaction.accountId })),
  ].filter((account, index, accounts) =>
    accounts.findIndex(a => a.accountId === account.accountId) === index,
  ),
});
export const resetAccounts = () => ({ type: RESET_ACCOUNTS });
