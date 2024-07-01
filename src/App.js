//import './App.css';
import ChatContainer from './ChatContainer';
//import { Amplify, API } from 'aws-amplify';
//import config from './aws-exports';
import { withAuthenticator} from '@aws-amplify/ui-react';



//Amplify.configure(config);




function App() {
  return (
    <>
      <ChatContainer/>
    </>
  );
}

export default withAuthenticator(App);

