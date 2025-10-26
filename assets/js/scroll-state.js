const SCROLL_STATE_KEY = 'scrollState';

let sleep = false;

const saveScrollState = () => {
  const stateString = sessionStorage.getItem(SCROLL_STATE_KEY);
  let state = {};
  if (stateString) {
    state = JSON.parse(stateString);
  }
  state[window.location.pathname] = window.scrollY;
  sessionStorage.setItem(SCROLL_STATE_KEY, JSON.stringify(state));
};

const handleScroll = () => {
  if (!sleep) {
    saveScrollState();
    sleep = true;
    setTimeout(() => (sleep = false), 300);
  }
};

const restoreScrollState = () => {
  const stateString = sessionStorage.getItem(SCROLL_STATE_KEY);
  if (stateString) {
    const state = JSON.parse(stateString);
    const pageScrollState = state[window.location.pathname];
    if (pageScrollState) {
      window.scrollTo({
        top: pageScrollState,
      });
    }
  }
};

const init = () => {
  restoreScrollState();

  document.addEventListener('scroll', handleScroll);
  document.addEventListener('scrollend', saveScrollState);
};

if (document.readyState !== 'loading') {
  init();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    init();
  });
}
