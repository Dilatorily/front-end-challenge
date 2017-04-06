const TOGGLE_SORT = 'front-end-challenge/ui/TOGGLE_SORT';
const RESET_UI = 'front-end-challenge/ui/RESET_UI';

const INITIAL_STATE = {
  sort: 'desc',
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case TOGGLE_SORT:
      return {
        ...state,
        sort: state.sort === 'asc' ? 'desc' : 'asc',
      };
    case RESET_UI:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const toggleSort = () => ({ type: TOGGLE_SORT });
