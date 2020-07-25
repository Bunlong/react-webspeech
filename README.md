<p align="center">
  ⭐️ If you like react-webspeech, give it a star! ⭐️
</p>

<br />

<p align="center">
  <img src="https://github.com/Bunlong/react-webspeech/blob/master/static/images/react-webspeech.png" width="80%" height="80%" alt="react-webspeech" />
</p>

# react-webspeech

react-webspeech – Official WebSpeech for React.

[![NPM](https://img.shields.io/npm/v/react-webspeech.svg)](https://www.npmjs.com/package/react-webspeech) [![downloads](https://img.shields.io/npm/dm/react-webspeech.svg?style=flat-square)](https://www.npmjs.com/package/react-webspeech) ![npm bundle size](https://img.shields.io/bundlephobia/min/react-webspeech) [![Build Status](https://api.travis-ci.com/Bunlong/react-webspeech.svg?branch=master)](https://travis-ci.com/Bunlong/react-webspeech) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Features

* Compatible with both JavaScript and TypeScript
* <a href="#usespeechsynthesis">useSpeechSynthesis (text-to-speech)</a> – [Demo](https://fbv4x.csb.app/).
* useSpeechRecognition (speech-to-text) – Coming in next version.

## Install

react-webspeech is available on npm:

```js
npm install react-webspeech --save
```

react-webspeech is available on yarn as well:

```js
yarn add react-webspeech
```

## useSpeechSynthesis

`useSpeechSynthesis` is a text-to-speech react hook.

### Usage

```jsx
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
}

export default App;
```

#### Prop

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Require</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>onEnd</td>
      <td>() => void</td>
      <td>❌</td>
      <td>Called when SpeechSynthesis has finished being spoken.</td>
    </tr>
  </tbody>
</table>

#### Return

<table>
  <thead>
    <tr>
      <th>Return</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>isSupported</td>
      <td>boolean</td>
      <td><code>true</code> if the browsers supports SpeechSynthesis otherwise <code>false</code>.</td>
    </tr>
    <tr>
      <td>isSpeaking</td>
      <td>boolean</td>
      <td><code>true</code> if SpeechSynthesis is speaking otherwise <code>false</code>.</td>
    </tr>
    <tr>
      <td>voices</td>
      <td><code><a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a>[]</code></td>
      <td>Use to get an array of <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a> that is passed to the speak function.</td>
    </tr>
    <tr>
      <td>cancel</td>
      <td>(): void</td>
      <td>Called to stop reading.</td>
    </tr>
    <tr>
      <td>speak</td>
      <td>(<a href="#speak-params">speak Params</a>): void</td>
      <td>Called to make SpeechSynthesis read the text.</td>
    </tr>
  </tbody>
</table>

#### speak Params

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Require</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>text</td>
      <td>string</td>
      <td><code>""</code></td>
      <td>❌</td>
      <td>The text that will be read by SpeechSynthesis.</td>
    </tr>
    <tr>
      <td>voice</td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a></td>
      <td><code>speechSynthesis.getVoices()[0]</code></td>
      <td>❌</td>
      <td>The voice that will be used to speak.</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The speed at which SpeechSynthesis will be spoken at.</td>
    </tr>
    <tr>
      <td>pitch</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The pitch at which SpeechSynthesis will be spoken at.</td>
    </tr>
    <tr>
      <td>volume</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The volume that SpeechSynthesis will be spoken at.</td>
    </tr>
  </tbody>
</table>

<!-- ## useSpeechRecognition

`useSpeechRecognition` is a speech-to-text react hook.

### Usage

```jsx
import React, { useState } from 'react';
import { useSpeechRecognition } from 'react-speech-kit';

function App() {
  const [text, setText] = useState('');
  const { isListening, startListening, stopListening } = useSpeechRecognition({
    onResult: (transcript) => {
      setText(transcript);
    },
  });

  return (
    <>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {isListening && <p>I'm listening</p>}
      <button
        onMouseDown={startListening}
        onMouseUp={stopListening}
      >
        Start Listening
      </button>
    </>
  );
}

export default App;
```

#### Prop

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Require</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>onResult</td>
      <td>(transcript): string</td>
      <td>❌</td>
      <td>Called to get the transcript.</td>
    </tr>
    <tr>
      <td>onEnd</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>onError</td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table>

#### Return

<table>
  <thead>
    <tr>
      <th>Return</th>
      <th>Type</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>isSupported</td>
      <td>boolean</td>
      <td><code>true</code> if the browsers supports SpeechRecognition otherwise <code>false</code>.</td>
    </tr>
    <tr>
      <td>isListening</td>
      <td><code>true</code> if SpeechRecognition is listening otherwise <code>false</code>.</td>
      <td></td>
    </tr>
    <tr>
      <td>stopListening</td>
      <td></td>
      <td>Called to make SpeechRecognition stop listening the input.</td>
    </tr>
    <tr>
      <td>startListening</td>
      <td></td>
      <td>Called to make SpeechRecognition start listening the input.</td>
    </tr>
  </tbody>
</table>

#### startListening Params

<table>
  <thead>
    <tr>
      <th>Prop</th>
      <th>Type</th>
      <th>Default</th>
      <th>Require</th>
      <th>Description</th>
    </tr>
  <thead>
  <tbody>
    <tr>
      <td>lang</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>interimResults</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>continuous</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>maxAlternatives</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>grammars</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
  </tbody>
</table> -->

## 💖 Wrap Up

If you think any of the `react-webspeech` can be improved, please do open a PR with any updates and submit any issues. Also, I will continue to improve this, so you might want to watch/star this repository to revisit.

## 🌟 Contribution

We'd love to have your helping hand on contributions to `react-webspeech` by forking and sending a pull request!

Your contributions are heartily ♡ welcome, recognized and appreciated. (✿◠‿◠)

How to contribute:

- Open pull request with improvements
- Discuss ideas in issues
- Spread the word
- Reach out with any feedback

## ⚖️ License

The MIT License [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

<!-- https://github.com/mdn/web-speech-api/tree/master/speak-easy-synthesis -->
<!-- https://mdn.github.io/web-speech-api/speak-easy-synthesis/ -->