const UPDATE_CATEGORIES = 'front-end-challenge/categories/UPDATE_CATEGORIES';
const RESET_CATEGORIES = 'front-end-challenge/categories/RESET_CATEGORIES';

const INITIAL_STATE = { types: [] };

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case UPDATE_CATEGORIES:
      return {
        types: [...state.types, ...action.payload]
          .filter((category, index, categories) => categories.indexOf(category) === index)
          .sort(),
      };
    case RESET_CATEGORIES:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const updateCategories = payload => ({ type: UPDATE_CATEGORIES, payload });
export const resetCATEGORIES = () => ({ type: RESET_CATEGORIES });
