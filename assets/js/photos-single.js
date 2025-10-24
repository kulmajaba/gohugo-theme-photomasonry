let captionOpen = false;
let arrowDownPressed = false;

const urlBreakpoint = /\/?\?/;

const isPhotoStream = (url) => {
  const urlParams = new URLSearchParams(url);
  const source = urlParams.get('source');
  return source === 'photostream';
}

const replaceContent = (elementId, newValue, attribute) => {
  const element = document.getElementById(elementId);
  if (element) {
    if (attribute !== undefined) {
      element.setAttribute(attribute, newValue);
    } else {
      element.innerHTML = newValue;
    }
  } else {
    console.warn('Could not set value for element', elementId);
  }
}

const navigateTo = async (url) => {
  if (document.fullscreenElement !== null) {
    try {
      const urlParts = url.split(urlBreakpoint);
      const response = await fetch(`/json${urlParts[0]}/index.json${urlParts[1] ? `/?${urlParts[1]}` : ''}`);
      const newPage = await response.json();
      console.log(newPage);

      replaceContent('image', newPage.src, 'src');
      replaceContent('image', newPage.alt, 'alt');
      replaceContent('title', newPage.title);
      replaceContent('location', newPage.location);
      replaceContent('date', newPage.date);
      replaceContent('medium', newPage.medium);

      if (isPhotoStream(url)) {
        replaceContent('close', '/', 'href');
        replaceContent('previous', newPage.photoStreamPrev, 'href');
        replaceContent('next', newPage.photoStreamNext, 'href');
      } else {
        replaceContent('close', newPage.close, 'href');
        replaceContent('previous', newPage.pagesPrev, 'href');
        replaceContent('next', newPage.pagesNext, 'href');
      }

      // TODO: replace caption content
    } catch (e) {
      console.error(e);
      // window.location.href = url;
    }
  } else {
    window.location.href = url;
  }
}

const scrollCaption = (open) => {
  if (open) {
    const caption = document.querySelector('#captionContent');
    caption?.scrollIntoView({
      behavior: 'smooth',
    });
    caption && (captionOpen = true);
  } else {
    const container = document.querySelector('#captionContainer');
    container?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    container && (captionOpen = false);
  }
};

const init = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const source = urlParams.get('source');

  if (source === 'photostream') {
    const close = document.querySelector('#close');
    const prev = document.querySelector('#previous');
    const next = document.querySelector('#next');

    if (close) {
      close.setAttribute('href', close.dataset.photoStreamHref ?? '');
      close.dataset.photoStreamHref ? close.classList.remove('is-disabled') : close.classList.add('is-disabled');
    }

    if (prev) {
      prev.setAttribute('href', prev.dataset.photoStreamHref ?? '');
      prev.dataset.photoStreamHref ? prev.classList.remove('is-disabled') : prev.classList.add('is-disabled');
    }

    if (next) {
      next.setAttribute('href', next.dataset.photoStreamHref ?? '');
      next.dataset.photoStreamHref ? next.classList.remove('is-disabled') : next.classList.add('is-disabled');
    }
  }

  const captionButton = document.querySelector('#toggleCaption');

  if (captionButton) {
    captionButton.addEventListener('click', () => {
      scrollCaption(!captionOpen);
    });
  }

  document.querySelector('#captionContainer')?.addEventListener("scrollend", () => {
    const container = document.querySelector('#captionContainer');
    const scrollPos = container.scrollTop;
    if (scrollPos > 0) {
      !captionOpen && (captionOpen = true);
    } else {
      captionOpen && (captionOpen = false);
    }
  });

  document.querySelector('#fullscreen')?.addEventListener('click', () => {
    document.querySelector('body')?.requestFullscreen();
  });

  window.addEventListener('keydown', (e) => {
    let url = undefined;

    const caption = document.querySelector('#captionContent');
  
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        url = document.querySelector('#close')?.getAttribute('href');
        break;
      case 'ArrowRight':
        url = document.querySelector('#next')?.getAttribute('href');
        break;
      case 'ArrowLeft':
        url = document.querySelector('#previous')?.getAttribute('href');
        break;
      case 'ArrowDown':
        if (!arrowDownPressed || (caption && caption.scrollHeight < document.documentElement.clientHeight)) {
          arrowDownPressed = true;
          scrollCaption(!captionOpen);
        }
        break;
      case 'ArrowUp':
        if (caption && caption.scrollHeight < document.documentElement.clientHeight) {
          scrollCaption(false);
        }
        break;
    }
    
    if (url) {
      navigateTo(url);
    }
  });
}

if (document.readyState !== 'loading') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', () => {
      init();
  });
}