import { useEffect, useRef, useCallback } from 'react';

/**
 *
 * https://reactjs.org/docs/hooks-faq.html#how-to-read-an-often-changing-value-from-usecallback
 *
 */

export function useEventCallback<T extends (...args: any[]) => unknown>(
  fn: T,
  deps: ReadonlyArray<unknown>,
) {
  const ref = useRef<T>(fn);
  useEffect(() => {
    ref.current = fn;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fn, ...deps]);
  return useCallback(() => {
    const fn = ref.current;
    return fn();
  }, [ref]);
}
