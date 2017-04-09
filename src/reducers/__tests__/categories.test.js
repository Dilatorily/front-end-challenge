import * as Categories from '../categories';

describe('reducer', () => {
  let reducer;
  beforeAll(() => {
    reducer = Categories.default;
  });

  it('should have a default action', () => {
    const state = { example: 'Example' };
    const newState = reducer(state);
    expect(newState).toEqual(state);
  });

  it('should have a default initial state', () => {
    const newState = reducer();
    expect(newState).toEqual({ '': 'Uncategorized' });
  });

  it('should update the list of categories on an UPDATE_CATEGORIES action', () => {
    const state = {};
    const action = {
      type: 'front-end-challenge/categories/UPDATE_CATEGORIES',
      payload: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TEST_CATEGORY_1: 'Test Category 1',
      TEST_CATEGORY_2: 'Test Category 2',
      TEST_CATEGORY_3: 'Test Category 3',
    });
  });

  it('should keep existing categories on an UPDATE_CATEGORIES action', () => {
    const state = { TEST_CATEGORY_0: 'Test Category 0' };
    const action = {
      type: 'front-end-challenge/categories/UPDATE_CATEGORIES',
      payload: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TEST_CATEGORY_0: 'Test Category 0',
      TEST_CATEGORY_1: 'Test Category 1',
      TEST_CATEGORY_2: 'Test Category 2',
      TEST_CATEGORY_3: 'Test Category 3',
    });
  });

  it('should overwrite old categories with the new categories on an UPDATE_CATEGORIES action', () => {
    const state = { TEST_CATEGORY_1: 'Some Old Test Category 1' };
    const action = {
      type: 'front-end-challenge/categories/UPDATE_CATEGORIES',
      payload: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TEST_CATEGORY_1: 'Test Category 1',
      TEST_CATEGORY_2: 'Test Category 2',
      TEST_CATEGORY_3: 'Test Category 3',
    });
  });

  it('should revert to the initial state on an RESET_CATEGORIES action', () => {
    const state = {
      TEST_CATEGORY_1: 'Test Category 1',
      TEST_CATEGORY_2: 'Test Category 2',
      TEST_CATEGORY_3: 'Test Category 3',
    };
    const action = { type: 'front-end-challenge/categories/RESET_CATEGORIES' };
    const newState = reducer(state, action);
    expect(newState).toEqual({ '': 'Uncategorized' });
  });

  it('should do nothing on any other actions', () => {
    const state = { TEST_CATEGORY_0: 'Test Category 0' };
    const action = { type: 'front-end-challenge/categories/TEST_CATEGORIES' };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TEST_CATEGORY_0: 'Test Category 0',
    });
  });
});

describe('updateCategories', () => {
  it('should return an UPDATE_CATEGORIES action', () => {
    const transactions = {
      categories: [],
      transactionData: {
        transactions: [],
      },
    };
    const action = Categories.updateCategories(transactions);
    expect(action.type).toBe('front-end-challenge/categories/UPDATE_CATEGORIES');
  });

  it('should return the list of categories', () => {
    const transactions = {
      categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
      transactionData: {
        transactions: [],
      },
    };
    const action = Categories.updateCategories(transactions);
    expect(action.payload).toEqual(['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3']);
  });

  it('should return the categories associated from the transactions', () => {
    const transactions = {
      categories: [],
      transactionData: {
        transactions: [
          { category: 'TEST_CATEGORY_1', amount: 1 },
          { category: 'TEST_CATEGORY_2', amount: 2 },
          { category: 'TEST_CATEGORY_3', amount: 3 },
        ],
      },
    };
    const action = Categories.updateCategories(transactions);
    expect(action.payload).toEqual(['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3']);
  });

  it('should return unique categories', () => {
    const transactions = {
      categories: [],
      transactionData: {
        transactions: [
          { category: 'TEST_CATEGORY_1', amount: 1 },
          { category: 'TEST_CATEGORY_1', amount: 2 },
          { category: 'TEST_CATEGORY_1', amount: 3 },
        ],
      },
    };
    const action = Categories.updateCategories(transactions);
    expect(action.payload).toEqual(['TEST_CATEGORY_1']);
  });

  it('should merge the categories', () => {
    const transactions = {
      categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
      transactionData: {
        transactions: [
          { category: 'TEST_CATEGORY_0', amount: 1 },
          { category: 'TEST_CATEGORY_4', amount: 2 },
          { category: 'TEST_CATEGORY_1', amount: 3 },
        ],
      },
    };
    const action = Categories.updateCategories(transactions);
    expect(action.payload).toEqual([
      'TEST_CATEGORY_1',
      'TEST_CATEGORY_2',
      'TEST_CATEGORY_3',
      'TEST_CATEGORY_0',
      'TEST_CATEGORY_4',
    ]);
  });
});

describe('resetCategories', () => {
  it('should return a RESET_CATEGORIES action', () => {
    const action = Categories.resetCategories();
    expect(action).toEqual({ type: 'front-end-challenge/categories/RESET_CATEGORIES' });
  });
});
