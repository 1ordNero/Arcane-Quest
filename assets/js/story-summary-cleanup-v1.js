(() => {
  function cleanup() {
    document.querySelectorAll('[data-story-summary], .story-summary, .background-summary').forEach(el => el.remove());
  }
  cleanup();
  new MutationObserver(cleanup).observe(document.body, {childList:true, subtree:true});
})();
