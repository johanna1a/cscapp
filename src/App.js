import ChatContainer from './component/ChatContainer';
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import {withAuthenticator} from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css';
import React from 'react';


Amplify.configure(awsExports);


function App({signOut, user}) {
  return (
    <>

<ChatContainer signOut={signOut}/>

    </>
  );
}

export default withAuthenticator(App);

