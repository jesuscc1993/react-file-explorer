export const countInstancesInString = (text: string, lookup: string) => {
  return (text.match(new RegExp(lookup, 'g')) || []).length;
};
