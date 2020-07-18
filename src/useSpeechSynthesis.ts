import { useState, useEffect } from 'react';

interface SpeechSynthesis {
  isSupported: boolean;
  speak: (params: SpeakParams) => void;
  cancel: () => void;
  isSpeaking: boolean;
  voices: Array<SpeechSynthesisVoice>;
}

interface Props {
  onEnd?: () => void;
}

interface SpeakParams {
  text?: '';
  voice?: SpeechSynthesisVoice;
  rate?: 1;
  pitch?: 1;
  volume?: 1;
}

interface SpeechSynthesisVoice {
  default: true;
  lang: 'de-DE';
  localService: false;
  name: 'Google Deutsch';
  voiceURI: 'Google Deutsch';
}

export function useSpeechSynthesis({ ...props }: Props): SpeechSynthesis {
  const { onEnd } = props;
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  function getVoices() {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      setVoices(voiceOptions as any);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = (event.target as any).getVoices();
      setVoices(voiceOptions as any);
    };
  }

  function handleOnEnd() {
    setIsSpeaking(false);
    if (onEnd) {
      onEnd();
    }
  }

  function speak(params: SpeakParams) {
    const { voice, text, rate, pitch, volume } = params;

    if (!isSupported) {
      return;
    }

    setIsSpeaking(true);

    const utterThis = new window.SpeechSynthesisUtterance();
    utterThis.text = text as string;
    utterThis.voice = voice as any;
    utterThis.rate = rate as number;
    utterThis.pitch = pitch as number;
    utterThis.volume = volume as number;
    utterThis.onend = handleOnEnd;
    window.speechSynthesis.speak(utterThis);
  }

  function cancel() {
    if (!isSupported) {
      return;
    }

    setIsSpeaking(false);

    window.speechSynthesis.cancel();
  }

  useEffect(function () {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setIsSupported(true);
      getVoices();
    }
  }, []);

  return {
    isSupported,
    speak,
    cancel,
    isSpeaking,
    voices,
  };
}
