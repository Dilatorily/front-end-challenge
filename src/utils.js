export const replaceAcronyms = (str) => {
  const acronyms = ['TFSA'];
  let results = str;

  acronyms.forEach((acronym) => {
    results = results.replace(new RegExp(acronym, 'gi'), acronym);
  });

  return results;
};

export default { replaceAcronyms };
