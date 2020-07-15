const escapeSpecialCharacters = (string: string) => {
  const matchOperatorsRegex = /[|\\{}()[\]^$+*?.-]/g;
  return string.replace(matchOperatorsRegex, '\\$&');
};

export default escapeSpecialCharacters;
