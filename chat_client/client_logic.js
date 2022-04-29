var socket = io('http://localhost:3000', { transports: ['websocket'] });

var messages = document.getElementById('messages');
var form = document.getElementById('form');
var input = document.getElementById('input');
var userNameInput =  document.getElementById('user-name-input');


form.addEventListener('submit', function(e) {
  e.preventDefault();
  console.log('message sent')
  if (input.value && userNameInput.value) {
    socket.emit('event', { message: input.value, user: userNameInput.value});
    input.value = '';
  }
});

socket.on('event', function(data) {
  var item = document.createElement('li');
  item.innerHTML = `
  <strong>${data.user} </strong> says: ${data.message} 
  `
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});