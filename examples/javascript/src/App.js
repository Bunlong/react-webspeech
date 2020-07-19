import React, { useState } from 'react';
import { useSpeechSynthesis } from 'react-webspeech';

function App() {
  const [text, setText] = useState('I love React');
  const { speak } = useSpeechSynthesis();

  return (
    <div>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => speak({ text })}>Speak</button>
    </div>
  );
};

export default App;
