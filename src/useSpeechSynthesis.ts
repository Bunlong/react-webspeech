import { useState, useEffect } from 'react';

interface SpeechSynthesis {
  isSupported: boolean;
  onSpeak: (params: OnSpeakParams) => void;
  onCancel: () => void;
  isSpeaking: boolean;
  voices: any;
}

interface Props {
  onEnd?: () => void;
}

interface OnSpeakParams {
  voice?: null;
  text?: '';
  rate?: 1;
  pitch?: 1;
  volume?: 1;
}

export function useSpeechSynthesis({ ...props }: Props): SpeechSynthesis {
  const { onEnd } = props;
  const [voices, setVoices] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  function processVoices(voiceOptions: any) {
    setVoices(voiceOptions);
  }

  function getVoices() {
    let voiceOptions = window.speechSynthesis.getVoices();
    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      voiceOptions = (event.target as any).getVoices();
      processVoices(voiceOptions);
    };
  }

  function handleOnEnd() {
    setIsSpeaking(false);
    if (onEnd) {
      onEnd();
    }
  }

  function onSpeak(params: OnSpeakParams) {
    const { voice, text, rate, pitch, volume } = params;

    if (!isSupported) {
      return;
    }

    setIsSpeaking(true);

    const utterance = new window.SpeechSynthesisUtterance();
    utterance.text = text as string;
    utterance.voice = voice as any;
    utterance.rate = rate as number;
    utterance.pitch = pitch as number;
    utterance.volume = volume as number;
    utterance.onend = handleOnEnd;
    window.speechSynthesis.speak(utterance);
  }

  function onCancel() {
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
    onSpeak,
    onCancel,
    isSpeaking,
    voices,
  };
}
