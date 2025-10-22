import React, { useEffect, useState } from 'react';
import chatStyle from '../css/Chat.module.css';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Chat(props) {
  const [users, setUsers] = useState([]);
  const [friend, setFriend] = useState('');
  const [receiver, setReceiver] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [hoverIndex, setHoverIndex] = useState(null);

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
      fetchMessages();
      interval = setInterval(fetchMessages, 2000);
    }
    return () => clearInterval(interval);
  }, [receiver]);

  const fetchMessages = () => {
    if (!sender || !receiver) return;
    axios.post(`http://localhost:8080/check-msg?sender=${sender}&receiver=${receiver}`)
      .then((res) => {
        setMessages(res.data);
      });
  };

  const sendMessage = () => {
    if (message.trim() === '' || !receiver) return;

    const time = `${new Date().getHours()} : ${new Date().getMinutes()}`;
    axios.post(`http://localhost:8080/send-msg?sender=${sender}&receiver=${receiver}&msg=${message}&time=${time}`)
      .then(() => {
        setMessage('');
        fetchMessages();
      });
  };

   // ✅ DELETE MESSAGE HANDLER (LOCAL)
  const onDelete = (indexToDelete) => {
    axios.post(`http://localhost:8080/deletemessage?id=${indexToDelete}`)

    // console.log(indexToDelete);
  };

  return (
    <div id={chatStyle.main}>
      {/* Sidebar with logo and users */}
      <div id={chatStyle.users}>
        <img src="/CHIT_CHAT.png" alt="Logo" className="slide-image" />
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
            {friend && (
              <>
                <strong>{friend}</strong>
                <hr />
              </>
            )}
          </div>

          {/* Messages */}
          <div id={chatStyle.msgs}>
            {messages.map((msg, index) => {
              const isSender = msg.sender === sender;
              const isHovered = hoverIndex === index;

              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                  style={{
                    display: 'flex',
                    justifyContent: isSender ? 'flex-end' : 'flex-start',
                    padding: '0.5rem',
                  }}
                >
                  <div className={chatStyle.msgWrapper}>
                    {/* Message Bubble */}
                    <p
                      className={`${isSender ? chatStyle.senderMsg : chatStyle.receiverMsg} ${
                        isSender && isHovered ? chatStyle.hovered : ''
                      }`}
                    >
                      {msg.msg}
                    </p>

                    {/* Delete Icon (only for sender and on hover) */}
                    {isSender && isHovered && (
                      <i
                        className={`bi bi-trash ${chatStyle.deleteIcon}`}
                        onClick={() => onDelete(msg.id)}
                        title="Delete message"
                      ></i>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input */}
          <div id={chatStyle.sender}>
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage();
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
