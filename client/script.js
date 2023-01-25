import bot from './assets/bot.svg';
import user from './assets/user.svg';

const form = document.querySelector('form');
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

// This function generates a unique ID by combining a timestamp and a random number, 
// and converting the random number to a hexadecimal string. The resulting ID is returned as a string 
// in the format "id-{timestamp}-{hexadecimal string}".
function generateUniqueID(){
  const timeStamp = Date.now();
  const randomNumber = Math.random();
  const hexaDecimalString = randomNumber.toString(16);

  return `id-${timeStamp}-${hexaDecimalString}`;
}

function chatStripe (isAi, value, uniqueId) {
  return (
    `
    <div class="wrapper ${isAi && 'ai'}">
      <div class="chat">
        <div class="profile">
          <img src="${isAi ? bot : user}" alt="${isAi ? 'bot' : 'user'}">
        </div>
        <div class="message" id="${uniqueId}">
          ${value}
          </div>
      </div>
    </div>
    `
  )
}

const handleSubmit = async (e) => {
  e.preventDefault();

  const Data = new FormData(form);

  // users chat stripe
  chatContainer.innerHTML += chatStripe(false, Data.get('prompt'));

  // clear the input field
  form.reset();

  // bots chat stripe
  const uniqueId = generateUniqueID();
  chatContainer.innerHTML += chatStripe(true, '', uniqueId);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById(uniqueId);

  loader(messageDiv);
}

form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) => {
  if(e.keyCode === 13){
    handleSubmit(e);
  }
});