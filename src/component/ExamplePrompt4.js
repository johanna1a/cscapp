import React from 'react';

const ExamplePrompt4 = ({ handlePromptClick }) => (
  <div className="example-prompt" onClick={() => handlePromptClick('BLUEPRINT:  , USE CASE:  , QUESTION:  ')}>
    <pre>
{`Blueprint: Generative AI
Use Case: Knowledge Workers Productivity
Question: Which AWS partners offer solutions that integrate with Amazon Q for enhancing knowledge worker productivity?`}
    </pre>
  </div>
);

export default ExamplePrompt4;