//import React, {useState, UseEffect} from 'react'
import React, {useState} from 'react'
import './ChatContainer.css';

const ChatContainer = () => {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  const sendMessage = () => {
    const message = userInput.trim();
    if (message) {
      setMessages([...messages, { sender: 'user', text: message }]);
      setUserInput('');
      // Simulate a delay before showing the bot's response
      setTimeout(() => {
        setMessages([
          ...messages,
          { sender: 'user', text: message },
          { sender: 'bot', text: 'This is a sample response from the bot.' },
        ]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
    <div className="chat-container">
      <div className="chat-messages"></div>
      {messages.map((message, index) => (
            <div key={index} className={`${message.sender} message`}>
              {message.text}
            </div>
          ))}
        </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." id="message-input" value={userInput} onChange={handleUserInput} onKeyDown={handleKeyPress}/>
        <button id="send-button" onClick={sendMessage}>Send</button>
        <button id="show-sources-button" className="show-sources-button">
          Show Sources
        </button>
        <div className="loading-indicator" id="loading-indicator">
          <div className="spinner"></div>
        </div>
      </div>
    </>
  );
};

export default ChatContainer;
