const getRandomNumber = (max, min = 0) => Math.floor((Math.random() * (max - min) + min));

const getRandomArrayItem = (array, min) => array[getRandomNumber(array.length, min)];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export { getRandomNumber, getRandomArrayItem, months };
