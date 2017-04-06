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

export const updateCategories = transactions => ({
  type: UPDATE_CATEGORIES,
  payload: [
    ...transactions.categories,
    ...transactions.transactionData.transactions.map(transaction => transaction.category),
  ].filter((category, index, categories) => category && categories.indexOf(category) === index),
});
export const resetCATEGORIES = () => ({ type: RESET_CATEGORIES });
