export const addFavoriteToList = (list: string[], favorite: string) => {
  return list.includes(favorite) ? list : [...list, favorite];
};

export const removeFavoriteFromList = (list: string[], favorite: string) => {
  return list.filter((item) => item !== favorite);
};
