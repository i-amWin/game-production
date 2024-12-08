import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: React.ReactNode;
  container?: Element;
  className?: string;
  role?: 'dialog' | 'alertdialog' | 'tooltip' | 'popup';
  onMount?: () => void;
  onUnmount?: () => void;
  onClose?: () => void;
  preserveScrollBarGap?: boolean;
  lockScroll?: boolean;
}

export const Portal = ({
  children,
  container,
  className,
  role = 'dialog',
  onMount,
  onUnmount,
  onClose,
  preserveScrollBarGap = true,
  lockScroll = true,
}: PortalProps) => {
  const [mounted, setMounted] = useState(false);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Create element only once
  const el = useMemo(() => {
    if (typeof window === 'undefined') return null;

    const element = container || document.createElement('div');
    if (!container) {
      element.className = className || '';
      if (role) element.setAttribute('role', role);
      element.setAttribute('data-portal', '');
    }
    return element;
  }, [container, className, role]);

  // Handle scroll locking
  const lockBodyScroll = useCallback(() => {
    if (!lockScroll) return;

    const originalPadding =
      parseInt(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('padding-right'),
      ) || 0;

    const scrollBarWidth = preserveScrollBarGap
      ? window.innerWidth - document.documentElement.clientWidth
      : 0;

    document.body.style.overflow = 'hidden';

    if (preserveScrollBarGap) {
      document.body.style.paddingRight = `${originalPadding + scrollBarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      if (preserveScrollBarGap) {
        document.body.style.paddingRight = `${originalPadding}px`;
      }
    };
  }, [lockScroll, preserveScrollBarGap]);

  // Handle keyboard events (ESC key)
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!el || mounted) return;

    // Store current active element
    previousActiveElement.current = document.activeElement as HTMLElement;

    if (!container) document.body.appendChild(el);

    const unlockScroll = lockBodyScroll();
    setMounted(true);
    onMount?.();

    // Add ESC key handler
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (!container && document.body.contains(el)) {
        document.body.removeChild(el);
      }
      unlockScroll?.();
      onUnmount?.();

      // Remove ESC key handler
      document.removeEventListener('keydown', handleKeyDown);

      // Restore focus
      if (
        previousActiveElement.current &&
        document.body.contains(previousActiveElement.current)
      ) {
        previousActiveElement.current.focus();
      }
    };
  }, [
    el,
    container,
    mounted,
    lockBodyScroll,
    onMount,
    onUnmount,
    handleKeyDown,
  ]);

  // Handle focus trapping
  useEffect(() => {
    if (!mounted || !el) return;

    const focusableElements = el.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );

    const firstFocusable = (focusableElements[0] as HTMLElement) || el;
    const lastFocusable =
      (focusableElements[focusableElements.length - 1] as HTMLElement) || el;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    el.addEventListener('keydown', handleTabKey as EventListener);

    // Only focus if it's a modal-like role
    if (role === 'dialog' || role === 'alertdialog') {
      firstFocusable?.focus();
    }

    return () => {
      el.removeEventListener('keydown', handleTabKey as EventListener);
    };
  }, [mounted, el, role]);

  if (typeof window === 'undefined' || !el) return null;

  return createPortal(
    <div
      aria-modal={
        role === 'dialog' || role === 'alertdialog' ? true : undefined
      }
      data-portal-content=""
    >
      {children}
    </div>,
    el,
  );
};
