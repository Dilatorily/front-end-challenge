import * as Utils from '../utils';

describe('replaceAcronyms', () => {
  it('should replace acronyms by their correct format', () => {
    const results = Utils.replaceAcronyms('This is an example tfsa.');
    expect(results).toBe('This is an example TFSA.');
  });

  it('should be case insensitive', () => {
    const results = Utils.replaceAcronyms('This is an example TfSa.');
    expect(results).toBe('This is an example TFSA.');
  });

  it('should not replace words that are not acronyms', () => {
    const results = Utils.replaceAcronyms('This is an example mutual funds.');
    expect(results).toBe('This is an example mutual funds.');
  });
});

describe('pluralize', () => {
  it('should not pluralize the word if the quantity is 1', () => {
    const results = Utils.pluralize('example', 1);
    expect(results).toBe('example');
  });

  it('should have a default quantity of 1', () => {
    const results = Utils.pluralize('example');
    expect(results).toBe('example');
  });

  it('should be able to pluralize exceptions', () => {
    const results = Utils.pluralize('Category', 2);
    expect(results).toBe('Categories');
  });

  it('should be able to pluralize words', () => {
    const results = Utils.pluralize('example', 3);
    expect(results).toBe('examples');
  });
});
