import escapeSpecialCharacters from './escapeSpecialCharacters';

const isSubstring = (str: string, substr: string) => {
  const escapedSubstr = escapeSpecialCharacters(substr);
  const search = new RegExp(escapedSubstr, 'i');

  return search.test(str);
};

export default isSubstring;
