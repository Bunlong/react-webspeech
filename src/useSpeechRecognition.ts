import { useState, useEffect, useRef } from 'react';
import { useEventCallback } from './utils';

interface Props {
  onResult?: (event: any) => void;
  onEnd?: () => void;
  onError?: (event: any) => void;
}

interface SpeechRecognition {
  isSupported?: boolean;
  isListening?: boolean;
  stopListening?: () => void;
  startListening?: () => void;
}

interface StartListeningParams {
  lang?: string;
  interimResults?: boolean;
  continuous?: boolean;
  maxAlternatives?: number;
  grammars?: Array<SpeechGrammarList>;
}

export function useSpeechRecognition({ ...props }: Props): SpeechRecognition {
  const {
    onResult = function () {},
    onEnd = function () {},
    onError = function () {},
  } = props;
  const recognition = useRef<any>(null);
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  function handleOnResult(event: any) {
    const transcript: string = Array.from(event.results)
      .map((result: any) => result[0])
      .map((result: any) => result.transcript)
      .join('');
    onResult(transcript);
  }

  function handleOnError(event: any) {
    if (event.error === 'not-allowed') {
      recognition.current.onend = () => {};
      setIsListening(false);
    }
    onError(event);
  }

  const startListening = useEventCallback(
    ({
      lang = '',
      interimResults = true,
      continuous = false,
      maxAlternatives = 1,
      grammars,
    }: StartListeningParams) => {
      if (isListening || !isSupported) {
        return;
      }
      setIsListening(true);
      recognition.current.lang = lang;
      recognition.current.interimResults = interimResults;
      recognition.current.continuous = continuous;
      recognition.current.maxAlternatives = maxAlternatives;
      if (grammars) {
        recognition.current.grammars = grammars;
      }
      recognition.current.onresult = handleOnResult;
      recognition.current.onerror = handleOnError;
      recognition.current.onend = () => recognition.current.start();
      recognition.current.start();
    },
    [isListening, isSupported, recognition],
  );

  const stopListening = useEventCallback(() => {
    if (!isListening || !isSupported) {
      return;
    }
    recognition.current.onresult = function () {};
    recognition.current.onend = function () {};
    recognition.current.onerror = function () {};
    setIsListening(false);
    recognition.current.stop();
    onEnd();
  }, [isListening, isSupported, recognition, onEnd]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window.SpeechRecognition) {
      setIsSupported(true);
      recognition.current = new window.SpeechRecognition();
    }
  }, []);

  return {
    isSupported,
    isListening,
    stopListening,
    startListening,
  };
}
