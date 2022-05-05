import { getRandomArrayItem, getRandomNumber, months } from '../utils';
import { FILMS_COUNT } from '../const';

const authors = ['Ilya O\'Reilly', 'Tom', 'Brandon Lee', 'Arny'];
const commentsText = ['a film that changed my life', 'a true masterpiece', 'post-credit scene was just amazing omg'];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const generateComment = () => ({
  id: getRandomNumber(FILMS_COUNT, 0),
  author: getRandomArrayItem(authors),
  comment: getRandomArrayItem(commentsText),
  date: `${getRandomNumber(30, 1)} ${getRandomArrayItem(months)} ${getRandomNumber(2022, 2020)}`,
  emotion: `./images/emoji/${getRandomArrayItem(emotions)}.png`,
});

export const generateComments = (count) => Array.from({ length: count }).map(() => generateComment());
