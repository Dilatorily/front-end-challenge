export const replaceAcronyms = (str) => {
  const acronyms = ['TFSA'];
  let results = str;

  acronyms.forEach((acronym) => {
    results = results.replace(new RegExp(acronym, 'gi'), acronym);
  });

  return results;
};

export const pluralize = (word, quantity = 1) => {
  if (quantity === 1) {
    return word;
  }

  const exceptions = {
    Category: 'Categories',
  };

  if (exceptions[word]) {
    return exceptions[word];
  }

  return `${word}s`;
};
