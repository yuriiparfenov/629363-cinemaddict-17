import { getRandomArrayItem, getRandomNumber } from '../utils';
import { FILMS_COUNT } from '../const';

const authors = ['Ilya O\'Reilly', 'Tom', 'Brandon Lee', 'Arny'];
const commentsText = ['a film that changed my life', 'a true masterpiece', 'post-credit scene was just amazing omg'];
const emotions = ['smile', 'sleeping', 'puke', 'angry'];

const generateComment = () => ({
  id: getRandomNumber(FILMS_COUNT, 0),
  author: getRandomArrayItem(authors),
  comment: getRandomArrayItem(commentsText),
  date: '2019-05-11T16:12:32.554Z',
  emotion: `./images/emoji/${getRandomArrayItem(emotions)}.png`,
});

export const generateComments = (count) => Array.from({ length: count }).map(() => generateComment());
