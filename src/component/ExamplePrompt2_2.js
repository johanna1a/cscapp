import React from 'react';
import { Button } from '@cloudscape-design/components';

const ExamplePrompt2 = ({ handlePromptClick }) => (
  <Button
    variant="inline-link"
    onClick={() => handlePromptClick('Give me the GenAI developer productivity use case')}
  >
    Describe the Blueprint and what you are looking for
  </Button>
);

export default ExamplePrompt2;