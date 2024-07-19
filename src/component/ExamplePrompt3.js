import React from 'react';

const ExamplePrompt3 = ({ handlePromptClick }) => (
  <div className="example-prompt" onClick={() => handlePromptClick('BLUEPRINT:  , USE CASE:  , ASSET:  , QUESTION:  ')}>
    <pre>
{`Blueprint: Generative AI
Use Case: Knowledge Workers Productivity
Asset Type: Immersion Day
Question: What topics are covered in the Amazon Q for Business Immersion Day, and how long does it typically last?`}
    </pre>
  </div>
);

export default ExamplePrompt3;