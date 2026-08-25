export function handleKeyDown(e, callback) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    callback();
  }
}

export function trapFocus(element) {
  if (!element) return;
  const focusableEls = element.querySelectorAll('a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])');
  if (focusableEls.length > 0) {
    focusableEls[0].focus();
  }
}
