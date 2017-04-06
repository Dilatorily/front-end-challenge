const TOGGLE_SORT = 'front-end-challenge/ui/TOGGLE_SORT';
const SET_ACCOUNT_FILTER = 'front-end-challenge/ui/SET_ACCOUNT_FILTER';
const RESET_UI = 'front-end-challenge/ui/RESET_UI';

const INITIAL_STATE = {
  sort: 'desc',
  filters: {
    categories: [],
    accounts: [],
  },
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return {
        ...state,
        sort: state.sort === 'asc' ? 'desc' : 'asc',
      };
    case SET_ACCOUNT_FILTER:
      return {
        ...state,
        filters: {
          ...state.filters,
          accounts: action.payload,
        },
      };
    case RESET_UI:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const toggleSort = () => ({ type: TOGGLE_SORT });
export const setAccountFilter = payload => ({ type: SET_ACCOUNT_FILTER, payload });
