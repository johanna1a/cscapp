import ChatContainer from './ChatContainer';
import { withAuthenticator} from '@aws-amplify/ui-react';



function App() {
  return (
    <>
      <ChatContainer/>
    </>
  );
}

export default withAuthenticator(App);

