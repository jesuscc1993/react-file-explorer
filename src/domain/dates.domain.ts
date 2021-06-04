type DateObject = number | string | Date;

export const formatDate = (dateObject: DateObject) => {
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(dateObject));
};
