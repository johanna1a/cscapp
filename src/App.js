import ChatContainer from './ChatContainer';
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';


Amplify.configure(awsExports);


function App({signOut, user}) {
  return (
    <>
<button onClick={signOut}>Sign Out</button>

<ChatContainer />

    </>
  );
}

export default withAuthenticator(App);

