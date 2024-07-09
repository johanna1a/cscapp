import React, {useState} from 'react'
import './ChatContainer.css';
import { fetchAuthSession, } from '@aws-amplify/auth';

const apiGatewayEndpoint = 'https://6mm48fcg14.execute-api.us-east-1.amazonaws.com/dev';


const ChatContainer = ({signOut}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDocumentSources, setShowDocumentSources] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');


  const toggleDocumentSources = () => {
    setShowDocumentSources((prevState) => !prevState);
  };
  
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };

  
  const getAccessToken = async () => {
    try {
      const session = await fetchAuthSession();

      //console.log("access token", session.tokens.idToken)
      return session.tokens.idToken;
    } catch (error) {
      console.log('Error getting access token:', error);
      return null;
    }
  };

  



  async function fetchChatbotResponse(message, accessToken) {
    const response = await fetch(`${apiGatewayEndpoint}?prompt=${encodeURIComponent(message)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
    }

    const data = await response.json();
    const responseBody = JSON.parse(data.body);
    const desiredResponse = responseBody.generated_text.text;
    const usedDocuments = responseBody.object_uris || [];

    return { response: desiredResponse, documents: usedDocuments};
  }


  const sendMessage = async () => {

    const message = userInput.trim();
    if (message) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'user', text: message }
      ]);

      setUserInput('');
      setIsLoading(true);
      try {
        const accessToken = await getAccessToken();
        if (accessToken) {
          const { response, documents} = await fetchChatbotResponse(message, accessToken);
          console.log(documents);
    
          setMessages((prevMessages) => [
            ...prevMessages,
            { sender: 'bot', text: response },
          ]);
        } else {
          console.log('Access token not available');
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
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
      <div className="chat-header">
        <button onClick={signOut}>Sign Out</button>
      </div>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`${message.sender} message`}>
            {message.text}
          </div>
        ))}
           {isLoading && (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        )}

        </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." id="message-input" value={userInput} onChange={handleUserInput} onKeyDown={handleKeyPress}/>
        <button id="send-button" onClick={sendMessage}>Send</button>
      </div>
      </div>

    </>
  );
};

export default ChatContainer;
