import { useEffect } from 'react';

type ShortcutOptions = {
  key: string;
  code?: string;
  ctrlOrMeta?: boolean;
  shift?: boolean;
  alt?: boolean;
  preventDefault?: boolean;
  allowInInput?: boolean;
  enabled?: boolean;
};

export function useKeyboardShortcut(
  {
    key,
    code,
    ctrlOrMeta = false,
    shift = false,
    alt = false,
    preventDefault = false,
    allowInInput = true,
    enabled = true,
  }: ShortcutOptions,
  handler: () => void,
) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const normalizedKey = key.toLowerCase();

    const handleKeyDown = (event: KeyboardEvent) => {
      const matchesKey = code
        ? event.code === code
        : event.key.toLowerCase() === normalizedKey;
      const matchesModifier = ctrlOrMeta ? (event.ctrlKey || event.metaKey) : true;
      const matchesShift = shift ? event.shiftKey : true;
      const matchesAlt = alt ? event.altKey : true;

      if (!matchesKey || !matchesModifier || !matchesShift || !matchesAlt) {
        return;
      }

      if (!allowInInput) {
        const activeElement = document.activeElement as HTMLElement | null;
        const isTypingTarget = !!activeElement && (
          activeElement.tagName === 'INPUT'
          || activeElement.tagName === 'TEXTAREA'
          || activeElement.isContentEditable
        );

        if (isTypingTarget) {
          return;
        }
      }

      if (preventDefault) {
        event.preventDefault();
      }

      handler();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allowInInput, alt, code, ctrlOrMeta, enabled, handler, key, preventDefault, shift]);
}
