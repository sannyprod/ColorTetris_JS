import { getRandomInt } from './service.js';


export let Figure_type = {
  circle: 'red',
  rect: '#0953e5',
  diamond: 'green',
  star: 'yellow',
}

export let GameOverFigure = '#161616';
export let DestroyingFigure = 'SlateBlue';

export function getRandomType() {
  let len = typesOfFigureslength();
  let randomNumber = getRandomInt(len);

  let count = 0;
  for(let key in Figure_type) {
    if (count === randomNumber) {
      return key;
    }
    count++;
  }
}

function typesOfFigureslength() {
  let count = 0;

  for(let key in Figure_type) {
    count++;
  }

  return count;
}