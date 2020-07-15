import escapeSpecialCharacters from './escapeSpecialCharacters';

const markSubstring = (str: string, substr: string, openMark = '*', closeMark = '*') => {
  const escapedSubstr = escapeSpecialCharacters(substr);
  const search = new RegExp(escapedSubstr, 'i');

  return str.replace(search, (match) => `${openMark}${match}${closeMark}`);
};

export default markSubstring;
