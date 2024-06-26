import React, {useState, UseEffect} from 'react'
import './ChatContainer.css';

const ChatContainer = () => {
  return (
    <>
    <div className="chat-container">
      <div className="chat-messages"></div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." id="message-input" />
        <button id="send-button">Send</button>
        <button id="show-sources-button" className="show-sources-button">
          Show Sources
        </button>
        <div className="loading-indicator" id="loading-indicator">
          <div className="spinner"></div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ChatContainer;
