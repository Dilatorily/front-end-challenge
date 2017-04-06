import startCase from 'lodash/startCase';
import toLower from 'lodash/toLower';

const UPDATE_CATEGORIES = 'front-end-challenge/categories/UPDATE_CATEGORIES';
const RESET_CATEGORIES = 'front-end-challenge/categories/RESET_CATEGORIES';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        ...state.types,
        ...action.payload.reduce((categories, category) => ({
          ...categories,
          [category]: startCase(toLower(category)),
        }), {}),
      };
    case RESET_CATEGORIES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const updateCategories = payload => ({ type: UPDATE_CATEGORIES, payload });
export const resetCATEGORIES = () => ({ type: RESET_CATEGORIES });
