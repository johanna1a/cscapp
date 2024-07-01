import React, {useState} from 'react'
import './ChatContainer.css';
import { Amplify} from 'aws-amplify';
import config from './aws-exports';


Amplify.configure(config);




const ChatContainer = () => {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');

  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };






  const sendMessage = async () => {
    const message = userInput.trim();
    if (message) {
      setMessages([...messages, { sender: 'user',text: message }]);
      setUserInput('');
  }};





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
