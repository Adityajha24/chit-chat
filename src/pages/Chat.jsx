import React, { useEffect, useState } from 'react';
import chatStyle from '../css/Chat.module.css';
import axios from 'axios';

function Chat(props) {
  const [users, setUsers] = useState([]);
  const [friend, setFriend] = useState('');
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const sender = props.useremail;

  // Animate image on mount
  useEffect(() => {
    document.body.classList.add('loaded');
    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  // Load users (excluding current user)
  useEffect(() => {
    axios.get('http://localhost:8080/all-users')
      .then((res) => {
        const filtered = res.data.filter((user) => user.name !== props.username);
        setUsers(filtered);
      });
  }, [props.username]);

  // Fetch messages (polling every 2 seconds)
  useEffect(() => {
    let interval;

    if (receiver) {
      fetchMessages(); // initial fetch
      interval = setInterval(fetchMessages, 2000);
    }

    return () => clearInterval(interval);
  }, [receiver]);

  // Fetch messages between sender and receiver
  const fetchMessages = () => {
    if (!sender || !receiver) return;

    axios.post(`http://localhost:8080/check-msg?sender=${sender}&receiver=${receiver}`)
      .then((res) => {
        setMessages(res.data);
      });
  };

  // Send message
  const sendMessage = () => {
    if (message.trim() === '' || !receiver) return;

    const time = `${new Date().getHours()} : ${new Date().getMinutes()}`;

    axios.post(`http://localhost:8080/send-msg?sender=${sender}&receiver=${receiver}&msg=${message}&time=${time}`)
      .then(() => {
        setMessage('');
        fetchMessages(); // update messages immediately after sending
      });
  };

  return (
    <div id={chatStyle.main}>

      {/* Sidebar with image and user list */}
      <div id={chatStyle.users}>
        <img
          src="/CHIT_CHAT.png"
          alt="Logo"
          className="slide-image"
        />

        <div id={chatStyle.userss}>
          <ul className={chatStyle.userList}>
            {users.map((user, index) => (
              <li
                key={index}
                className={chatStyle.user}
                onClick={() => {
                  setFriend(user.name);
                  setReceiver(user.email);
                }}
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Chat Window */}
      <div id={chatStyle.card}>
        <div id={chatStyle.chat}>

          {/* Friend Name */}
          <div id={chatStyle.friend}>
            {friend && <><strong>{friend}</strong><hr /></>}
          </div>

          {/* Messages */}
          <div id={chatStyle.msgs}>
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justifyContent: msg.sender === sender ? 'flex-end' : 'flex-start'
                }}
              >
                <p className={msg.sender === sender ? chatStyle.senderMsg : chatStyle.receiverMsg}>
                  {msg.msg}
                </p>
              </div>
            ))}
          </div>


          {/* Input */}
          <div id={chatStyle.sender}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              className={chatStyle.inputField}
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default Chat;
