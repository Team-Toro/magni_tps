import { useCallback, useState } from 'react';

export function useLoginHelp() {
  const [hasFailedOnce, setHasFailedOnce] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const onFailedLogin = useCallback(() => {
    if (!hasFailedOnce) {
      setHasFailedOnce(true);
      setIsOpen(true);
    }
  }, [hasFailedOnce]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return { isOpen, onFailedLogin, close };
}
