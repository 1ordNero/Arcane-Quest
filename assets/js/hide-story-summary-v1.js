(() => {
  const hideDuplicateStorySummary = () => {
    const root = document.querySelector('#editorRoot, .editor-root, main') || document.body;
    const candidates = [...root.querySelectorAll('div,section,article')];

    for (const el of candidates) {
      const text = (el.textContent || '').trim();
      const hasCreateButton = el.querySelector('button') || /Held erschaffen/.test(text);
      if (hasCreateButton) continue;

      // The duplicate detail card directly below the hero preview contains only
      // the selected personal-story title and its bonus.
      if (/^(Tavernen-Stammgast|Gefallener Adeliger|Runenschmied-Lehrling|Schatten-Ausreißer)\s*[+]/.test(text.replace(/\s+/g, ' '))) {
        el.style.display = 'none';
      }
    }
  };

  hideDuplicateStorySummary();
  new MutationObserver(hideDuplicateStorySummary).observe(document.documentElement, {
    childList: true,
    subtree: true
  });
})();
