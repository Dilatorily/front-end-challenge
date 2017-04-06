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

export const updateAccounts = payload => ({ type: UPDATE_ACCOUNTS, payload });
export const resetAccounts = () => ({ type: RESET_ACCOUNTS });
