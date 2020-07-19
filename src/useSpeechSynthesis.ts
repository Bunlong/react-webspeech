import { useState, useEffect } from 'react';

interface Props {
  onEnd?: () => void;
}

interface SpeechSynthesis {
  isSupported: boolean;
  isSpeaking: boolean;
  voices: Array<SpeechSynthesisVoice>;
  cancel: () => void;
  speak: (params: SpeakParams) => void;
}

interface SpeakParams {
  text?: string;
  voice?: SpeechSynthesisVoice;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeechSynthesis({ ...props }: Props): SpeechSynthesis {
  const { onEnd = function () {} } = props;
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

  function getDefaultVoice() {
    if (typeof speechSynthesis === 'undefined') {
      return undefined;
    }
    return speechSynthesis.getVoices()[0];
  }

  function speak({
    text = '',
    voice = getDefaultVoice(),
    rate = 1,
    pitch = 1,
    volume = 1,
  }: SpeakParams) {
    if (!isSupported) {
      return;
    }
    setIsSpeaking(true);
    const utterThis = new window.SpeechSynthesisUtterance();
    utterThis.text = text as string;
    utterThis.voice = voice as SpeechSynthesisVoice;
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
    isSpeaking,
    voices,
    cancel,
    speak,
  };
}
