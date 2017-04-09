import * as Accounts from '../accounts';

describe('reducer', () => {
  let reducer;
  beforeAll(() => {
    reducer = Accounts.default;
  });

  it('should have a default action', () => {
    const state = { TestAccount0: { accountId: 'TestAccount0', name: 'Jim' } };
    const newState = reducer(state);
    expect(newState).toEqual(state);
  });

  it('should have a default initial state', () => {
    const newState = reducer();
    expect(newState).toEqual({});
  });

  it('should update the list of accounts on an UPDATE_ACCOUNTS action', () => {
    const state = {};
    const action = {
      type: 'front-end-challenge/accounts/UPDATE_ACCOUNTS',
      payload: [
        { accountId: 'TestAccount1', name: 'John' },
        { accountId: 'TestAccount2', name: 'James' },
        { accountId: 'TestAccount3', name: 'Jeremy' },
      ],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TestAccount1: { accountId: 'TestAccount1', name: 'John' },
      TestAccount2: { accountId: 'TestAccount2', name: 'James' },
      TestAccount3: { accountId: 'TestAccount3', name: 'Jeremy' },
    });
  });

  it('should keep existing accounts on an UPDATE_ACCOUNTS action', () => {
    const state = { TestAccount0: { accountId: 'TestAccount0', name: 'Jim' } };
    const action = {
      type: 'front-end-challenge/accounts/UPDATE_ACCOUNTS',
      payload: [
        { accountId: 'TestAccount1', name: 'John' },
        { accountId: 'TestAccount2', name: 'James' },
        { accountId: 'TestAccount3', name: 'Jeremy' },
      ],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TestAccount0: { accountId: 'TestAccount0', name: 'Jim' },
      TestAccount1: { accountId: 'TestAccount1', name: 'John' },
      TestAccount2: { accountId: 'TestAccount2', name: 'James' },
      TestAccount3: { accountId: 'TestAccount3', name: 'Jeremy' },
    });
  });

  it('should overwrite old accounts with the new information on an UPDATE_ACCOUNTS action', () => {
    const state = { TestAccount1: { accountId: 'TestAccount1', name: 'Jim' } };
    const action = {
      type: 'front-end-challenge/accounts/UPDATE_ACCOUNTS',
      payload: [
        { accountId: 'TestAccount1', name: 'John' },
        { accountId: 'TestAccount2', name: 'James' },
        { accountId: 'TestAccount3', name: 'Jeremy' },
      ],
    };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TestAccount1: { accountId: 'TestAccount1', name: 'John' },
      TestAccount2: { accountId: 'TestAccount2', name: 'James' },
      TestAccount3: { accountId: 'TestAccount3', name: 'Jeremy' },
    });
  });

  it('should revert to the initial state on an RESET_ACCOUNTS action', () => {
    const state = { TestAccount0: { accountId: 'TestAccount0', name: 'Jim' } };
    const action = { type: 'front-end-challenge/accounts/RESET_ACCOUNTS' };
    const newState = reducer(state, action);
    expect(newState).toEqual({});
  });

  it('should do nothing on any other actions', () => {
    const state = { TestAccount0: { accountId: 'TestAccount0', name: 'Jim' } };
    const action = { type: 'front-end-challenge/accounts/TEST_ACCOUNTS' };
    const newState = reducer(state, action);
    expect(newState).toEqual({
      TestAccount0: { accountId: 'TestAccount0', name: 'Jim' },
    });
  });
});

describe('updateAccounts', () => {
  it('should return an UPDATE_ACCOUNTS action', () => {
    const transactions = {
      accounts: [],
      transactionData: {
        transactions: [],
      },
    };
    const action = Accounts.updateAccounts(transactions);
    expect(action.type).toBe('front-end-challenge/accounts/UPDATE_ACCOUNTS');
  });

  it('should return the list of accounts', () => {
    const transactions = {
      accounts: [
        { accountId: 'TestAccount1', name: 'John' },
        { accountId: 'TestAccount2', name: 'James' },
        { accountId: 'TestAccount3', name: 'Jeremy' },
      ],
      transactionData: {
        transactions: [],
      },
    };
    const action = Accounts.updateAccounts(transactions);
    expect(action.payload).toEqual([
      { accountId: 'TestAccount1', name: 'John' },
      { accountId: 'TestAccount2', name: 'James' },
      { accountId: 'TestAccount3', name: 'Jeremy' },
    ]);
  });

  it('should return the accounts associated from the transactions', () => {
    const transactions = {
      accounts: [],
      transactionData: {
        transactions: [
          { accountId: 'TestAccount1', name: 'John', amount: 1 },
          { accountId: 'TestAccount2', name: 'James', amount: 2 },
          { accountId: 'TestAccount3', name: 'Jeremy', amount: 3 },
        ],
      },
    };
    const action = Accounts.updateAccounts(transactions);
    expect(action.payload).toEqual([
      { accountId: 'TestAccount1' },
      { accountId: 'TestAccount2' },
      { accountId: 'TestAccount3' },
    ]);
  });

  it('should return unique accounts', () => {
    const transactions = {
      accounts: [],
      transactionData: {
        transactions: [
          { accountId: 'TestAccount1', name: 'John', amount: 1 },
          { accountId: 'TestAccount1', name: 'John', amount: 2 },
          { accountId: 'TestAccount1', name: 'John', amount: 3 },
        ],
      },
    };
    const action = Accounts.updateAccounts(transactions);
    expect(action.payload).toEqual([{ accountId: 'TestAccount1' }]);
  });

  it('should merge the accounts prioritizing the ones from the list of accounts', () => {
    const transactions = {
      accounts: [
        { accountId: 'TestAccount1', name: 'John' },
        { accountId: 'TestAccount2', name: 'James' },
        { accountId: 'TestAccount3', name: 'Jeremy' },
      ],
      transactionData: {
        transactions: [
          { accountId: 'TestAccount1', name: 'Mary', amount: 1 },
          { accountId: 'TestAccount2', name: 'Margaret', amount: 2 },
          { accountId: 'TestAccount3', name: 'Melanie', amount: 3 },
        ],
      },
    };
    const action = Accounts.updateAccounts(transactions);
    expect(action.payload).toEqual([
      { accountId: 'TestAccount1', name: 'John' },
      { accountId: 'TestAccount2', name: 'James' },
      { accountId: 'TestAccount3', name: 'Jeremy' },
    ]);
  });
});

describe('resetAccounts', () => {
  it('should return a RESET_ACCOUNTS action', () => {
    const action = Accounts.resetAccounts();
    expect(action).toEqual({ type: 'front-end-challenge/accounts/RESET_ACCOUNTS' });
  });
});
