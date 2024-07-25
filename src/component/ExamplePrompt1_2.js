import React from 'react';
import { Button } from '@cloudscape-design/components';

const ExamplePrompt1 = ({ handlePromptClick }) => (
  <Button
    variant="inline-link"
    onClick={() => handlePromptClick('I have a customer that wants to automate some tasks in their company. They want to be able to automatically produce content with just a short description. Help me with this')}
  >
    Describe use case and get help
  </Button>
);

export default ExamplePrompt1;