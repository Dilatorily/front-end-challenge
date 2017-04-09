import { combineReducers } from 'redux';


describe('reducers', () => {
  it('should combine the reducers', async () => {
    expect(combineReducers).not.toHaveBeenCalled();
    await import('../');
    expect(combineReducers).toHaveBeenCalled();
  });
});
