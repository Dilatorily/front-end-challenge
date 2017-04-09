import * as UI from '../ui';

describe('reducer', () => {
  let reducer;
  beforeAll(() => {
    reducer = UI.default;
  });

  it('should have a default action', () => {
    const state = {
      sort: 'asc',
      filters: {
        categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2', 'TEST_CATEGORY_3'],
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2', 'TEST_ACCOUNT_3'],
      },
    };
    const newState = reducer(state);
    expect(newState).toEqual(state);
  });

  it('should have a default initial state', () => {
    const newState = reducer();
    expect(newState).toEqual({
      sort: 'desc',
      filters: {
        categories: [],
        accounts: [],
      },
    });
  });

  it('should toggle the sort from ascending to descending on a TOGGLE_SORT action', () => {
    const state = { sort: 'asc' };
    const action = { type: 'front-end-challenge/ui/TOGGLE_SORT' };
    const newState = reducer(state, action);
    expect(newState).toEqual({ sort: 'desc' });
  });

  it('should toggle the sort from descending to ascending on a TOGGLE_SORT action', () => {
    const state = { sort: 'desc' };
    const action = { type: 'front-end-challenge/ui/TOGGLE_SORT' };
    const newState = reducer(state, action);
    expect(newState).toEqual({ sort: 'asc' });
  });

  it('should not touch the rest of the state on a TOGGLE_SORT action', () => {
    const state = {
      sort: 'desc',
      filters: {
        categories: ['TEST_CATEGORY_2'],
        accounts: ['TEST_ACCOUNT_3'],
      },
    };
    const action = { type: 'front-end-challenge/ui/TOGGLE_SORT' };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      sort: 'asc',
      filters: {
        categories: ['TEST_CATEGORY_2'],
        accounts: ['TEST_ACCOUNT_3'],
      },
    });
  });

  it('should update the accounts filter on a SET_ACCOUNT_FILTER action', () => {
    const state = {
      filters: {
        accounts: ['TEST_ACCOUNT_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_ACCOUNT_FILTER',
      payload: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      filters: {
        accounts: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
      },
    });
  });

  it('should not touch the rest of the filters on a SET_ACCOUNT_FILTER action', () => {
    const state = {
      filters: {
        accounts: ['TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_ACCOUNT_FILTER',
      payload: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      filters: {
        accounts: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
        categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2'],
      },
    });
  });

  it('should not touch the rest of the state on a SET_ACCOUNT_FILTER action', () => {
    const state = {
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_ACCOUNT_FILTER',
      payload: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_3', 'TEST_ACCOUNT_1'],
        categories: ['TEST_CATEGORY_1', 'TEST_CATEGORY_2'],
      },
    });
  });

  it('should update the categories filter on a SET_CATEGORY_FILTER action', () => {
    const state = {
      filters: {
        categories: ['TEST_CATEGORY_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_CATEGORY_FILTER',
      payload: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      filters: {
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    });
  });

  it('should not touch the rest of the filters on a SET_CATEGORY_FILTER action', () => {
    const state = {
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_CATEGORY_FILTER',
      payload: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    });
  });

  it('should not touch the rest of the state on a SET_CATEGORY_FILTER action', () => {
    const state = {
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_2'],
      },
    };
    const action = {
      type: 'front-end-challenge/ui/SET_CATEGORY_FILTER',
      payload: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    });
  });

  it('should revert to the initial state on an RESET_UI action', () => {
    const state = {
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    };
    const action = { type: 'front-end-challenge/ui/RESET_UI' };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      sort: 'desc',
      filters: {
        categories: [],
        accounts: [],
      },
    });
  });

  it('should do nothing on any other actions', () => {
    const state = {
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    };
    const action = { type: 'front-end-challenge/ui/TEST_UI' };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      sort: 'asc',
      filters: {
        accounts: ['TEST_ACCOUNT_1', 'TEST_ACCOUNT_2'],
        categories: ['TEST_CATEGORY_3', 'TEST_CATEGORY_1'],
      },
    });
  });
});

describe('toggleSort', () => {
  it('should return a TOGGLE_SORT action', () => {
    const action = UI.toggleSort();
    expect(action).toEqual({ type: 'front-end-challenge/ui/TOGGLE_SORT' });
  });
});

describe('setAccountFilter', () => {
  it('should return a SET_ACCOUNT_FILTER action', () => {
    const action = UI.setAccountFilter();
    expect(action.type).toBe('front-end-challenge/ui/SET_ACCOUNT_FILTER');
  });

  it('should pass the payload in the action', () => {
    const action = UI.setAccountFilter('Test Payload');
    expect(action.payload).toBe('Test Payload');
  });
});

describe('setCategoryFilter', () => {
  it('should return a SET_CATEGORY_FILTER action', () => {
    const action = UI.setCategoryFilter();
    expect(action.type).toBe('front-end-challenge/ui/SET_CATEGORY_FILTER');
  });

  it('should pass the payload in the action', () => {
    const action = UI.setCategoryFilter('Test Payload');
    expect(action.payload).toBe('Test Payload');
  });
});
