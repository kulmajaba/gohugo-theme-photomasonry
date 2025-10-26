let captionOpen = false;
let arrowDownPressed = false;

const urlBreakpoint = /\/?\?/;

const isPhotoStream = (searchUrl) => {
  const urlParams = new URLSearchParams(searchUrl);
  const source = urlParams.get('source');
  return source === 'photostream';
};

const replaceContent = (elementId, newValue, attribute) => {
  const element = document.getElementById(elementId);
  if (element) {
    if (attribute !== undefined) {
      if (newValue !== undefined) {
        element.setAttribute(attribute, newValue);
      } else {
        element.removeAttribute(attribute);
      }
    } else {
      element.innerHTML = newValue;
    }
  } else {
    console.warn('Could not set value for element', elementId);
  }
};

const setHref = (elementId, newValue) => {
  replaceContent(elementId, newValue !== '' ? newValue : undefined, 'href');
};

const updateButtonStates = () => {
  const close = document.getElementById('close');
  const prev = document.getElementById('previous');
  const next = document.getElementById('next');

  close.href ? close.classList.remove('is-disabled') : close.classList.add('is-disabled');
  prev.href ? prev.classList.remove('is-disabled') : prev.classList.add('is-disabled');
  next.href ? next.classList.remove('is-disabled') : next.classList.add('is-disabled');
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
      replaceContent('captionBody', newPage.content);

      if (isPhotoStream(urlParts[1] ?? urlParts[0])) {
        setHref('close', '/');
        setHref('previous', newPage.photoStreamPrev);
        setHref('next', newPage.photoStreamNext);
      } else {
        setHref('close', newPage.close);
        setHref('previous', newPage.pagesPrev);
        setHref('next', newPage.pagesNext);
      }

      updateButtonStates();

      history.pushState(undefined, '', url);
    } catch (e) {
      console.error(e);
      window.location.href = url;
    }
  } else {
    window.location.href = url;
  }
}

const scrollCaption = (open) => {
  if (open) {
    const caption = document.getElementById('captionContent');
    caption?.scrollIntoView({
      behavior: 'smooth',
    });
    caption && (captionOpen = true);
  } else {
    const container = document.getElementById('captionContainer');
    container?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    container && (captionOpen = false);
  }
};

const init = () => {
  if (isPhotoStream(window.location.search)) {
    setHref('close', document.getElementById('close')?.dataset.photoStreamHref)
    setHref('previous', document.getElementById('previous')?.dataset.photoStreamHref)
    setHref('next', document.getElementById('next')?.dataset.photoStreamHref)

    updateButtonStates();
  }

  document.getElementById('toggleCaption').addEventListener('click', () => {
    scrollCaption(!captionOpen);
  });

  const captionContainer = document.getElementById('captionContainer');
  captionContainer?.addEventListener("scrollend", () => {
    const scrollPos = captionContainer.scrollTop;
    if (scrollPos > 0) {
      !captionOpen && (captionOpen = true);
    } else {
      captionOpen && (captionOpen = false);
    }
  });

  document.getElementById('fullscreen')?.addEventListener('click', () => {
    document.querySelector('body')?.requestFullscreen();
  });

  window.addEventListener('keydown', (e) => {
    let url = undefined;

    const caption = document.getElementById('captionContent');
  
    switch (e.key) {
      case 'Escape':
        e.preventDefault();
        url = document.getElementById('close')?.getAttribute('href');
        break;
      case 'ArrowRight':
        url = document.getElementById('next')?.getAttribute('href');
        break;
      case 'ArrowLeft':
        url = document.getElementById('previous')?.getAttribute('href');
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!arrowDownPressed || (caption && caption.scrollHeight < document.documentElement.clientHeight)) {
          arrowDownPressed = true;
          scrollCaption(!captionOpen);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
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