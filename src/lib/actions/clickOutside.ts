import { isDialogOpen } from '$str';

export function globalClickOutside(element: HTMLElement, callback: () => void) {
  function handleClick(event: MouseEvent) {
    if (!element.contains(event.target as Node)) {
      callback();
    }
  }

  document.addEventListener('mousedown', handleClick);

  return {
    destroy() {
      document.removeEventListener('mousedown', handleClick);
    }
  };
}
