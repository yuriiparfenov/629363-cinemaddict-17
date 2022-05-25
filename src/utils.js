const getRandomNumber = (max, min = 0) => Math.floor((Math.random() * (max - min) + min));

const getRandomArrayItem = (array, min) => array[getRandomNumber(array.length, min)];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const updateFilm = (films, update) => {
  const index = films.findIndex((film) => film.id === update.id);

  if(index === -1) {
    return films;
  }

  return [
    ...films.slice(0, index),
    update,
    ...films.slice(index + 1),
  ];
};


export { getRandomNumber, getRandomArrayItem, months, updateFilm };
