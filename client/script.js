import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.getquerySelector('form');
const chatContainer = document.querySelector('#chat_container');

// global variable to show the loader
let loadInterval;

// function to show the loader
function loader(element){
  element.textContent = '';

  // repeatedly execute the function after every 300ms
  // display a dot after every 300ms
  // acts like the bot is thinking
  loadInterval = setInterval(() => {
    // sets the text content as a dot and then adds a dot to it after every 300ms
    element.textContent += '.';

    // if the text content is 4 dots, then set it to empty
    // this is to make sure that the loader doesn't go on forever
    if(element.textContent === '....'){
      element.textContent = '';
    }
  }, 300);
}

// this function types out the text passed as an argument to it, one character at a time, 
// inside the specified element, with a delay of 20 milliseconds between each character.
function typeText(element, text){
  let index = 0;

  let interval = setInterval(() => {
    // if the index is less than the length of the text
    // then add the character at the index to the element
    if(index < text.length){
      element.innerHTML += text.charAt(index);
      index++;
    } else {
      // if the index is greater than the length of the text
      // then clear the interval
      clearInterval(interval);
    }
  }, 20);
}