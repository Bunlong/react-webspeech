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
    <>
      <textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button onClick={() => speak({ text })}>Speak</button>
    </>
  );
}

export default App;
```

#### useSpeechSynthesis APIs

<table>
  <thead>
    <tr>
      <th>APIs</th>
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
      <td>cancel</td>
      <td>() => void</td>
      <td>Is called to stop reading.</td>
    </tr>
    <tr>
      <td>voices</td>
      <td><code>[<a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a>]</code></td>
      <td>Is used to get an array of <a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a> that is passed to the speak function.</td>
    </tr>
    <tr>
      <td>speak</td>
      <td>([SpeakParams](#speakparams)) => void</td>
      <td>Is called to read some text.</td>
    </tr>
  </tbody>
</table>

#### SpeakParams

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
      <td>The text that will be synthesised when the utterance is spoken.</td>
    </tr>
    <tr>
      <td>voice</td>
      <td><a href="https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice">SpeechSynthesisVoice</a></td>
      <td><code>{ default: true, lang: 'de-DE', localService: false, name: 'Google Deutsch', voiceURI: 'Google Deutsch' }</code></td>
      <td>❌</td>
      <td>The voice that will be used to speak the utterance.</td>
    </tr>
    <tr>
      <td>rate</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The speed at which the utterance will be spoken at.</td>
    </tr>
    <tr>
      <td>pitch</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The pitch at which the utterance will be spoken at.</td>
    </tr>
    <tr>
      <td>volume</td>
      <td>number</td>
      <td><code>1</code></td>
      <td>❌</td>
      <td>The volume that the utterance will be spoken at.</td>
    </tr>
  </tbody>
</table>

## useSpeechRecognition

`useSpeechRecognition` is a speech-to-text react hook.

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