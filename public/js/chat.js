const socket = io('http://localhost:3000');
const messageElement = document.getElementById('message');
const send = document.getElementById('createMessageForm');
const messages = document.getElementById('messages');

const getProfile = () =>
  fetch('/auth/profile')
    .then((res) => res.json())
    .catch(console.error);

let profile;

const createMessage = async (text) => ({
  text,
  email: await profile.email,
  type: await profile.role,
});

const createMessageElement = ({ email, text }) => {
  const li = document.createElement('li');
  li.innerText = `${email}: ${text}`;
  return li;
};

window.addEventListener('load', async () => {
  profile = await getProfile();
  socket.emit('findAllMessages', (msgs) => {
    msgs.forEach((message) => {
      const li = createMessageElement(message);
      messages.appendChild(li);
    });
  });
});

send.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = await createMessage(messageElement.value);
  socket.emit('createMessage', message);
  const li = createMessageElement(message);
  messages.appendChild(li);
  message.value = '';
});

socket.on('messageCreated', (message) => {
  const li = createMessageElement(message);
  messages.appendChild(li);
});
