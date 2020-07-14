import React from 'react';
import { useSpeechRecognition } from 'react-webspeech';

function App() {
  const { transcript } = useSpeechRecognition();

  return transcript;
};

export default App;
