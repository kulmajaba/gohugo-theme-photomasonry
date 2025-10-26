let captionOpen = false;
let arrowDownPressed = false;

const urlBreakpoint = /\/?\?/;
const cornersOutPath =
  "M41.25 9V16.5C41.25 17.0967 41.0129 17.669 40.591 18.091C40.169 18.5129 39.5967 18.75 39 18.75C38.4033 18.75 37.831 18.5129 37.409 18.091C36.9871 17.669 36.75 17.0967 36.75 16.5V11.25H31.5C30.9033 11.25 30.331 11.0129 29.909 10.591C29.4871 10.169 29.25 9.59674 29.25 9C29.25 8.40326 29.4871 7.83097 29.909 7.40901C30.331 6.98705 30.9033 6.75 31.5 6.75H39C39.5967 6.75 40.169 6.98705 40.591 7.40901C41.0129 7.83097 41.25 8.40326 41.25 9ZM16.5 36.75H11.25V31.5C11.25 30.9033 11.0129 30.331 10.591 29.909C10.169 29.4871 9.59674 29.25 9 29.25C8.40326 29.25 7.83097 29.4871 7.40901 29.909C6.98705 30.331 6.75 30.9033 6.75 31.5V39C6.75 39.5967 6.98705 40.169 7.40901 40.591C7.83097 41.0129 8.40326 41.25 9 41.25H16.5C17.0967 41.25 17.669 41.0129 18.091 40.591C18.5129 40.169 18.75 39.5967 18.75 39C18.75 38.4033 18.5129 37.831 18.091 37.409C17.669 36.9871 17.0967 36.75 16.5 36.75ZM39 29.25C38.4033 29.25 37.831 29.4871 37.409 29.909C36.9871 30.331 36.75 30.9033 36.75 31.5V36.75H31.5C30.9033 36.75 30.331 36.9871 29.909 37.409C29.4871 37.831 29.25 38.4033 29.25 39C29.25 39.5967 29.4871 40.169 29.909 40.591C30.331 41.0129 30.9033 41.25 31.5 41.25H39C39.5967 41.25 40.169 41.0129 40.591 40.591C41.0129 40.169 41.25 39.5967 41.25 39V31.5C41.25 30.9033 41.0129 30.331 40.591 29.909C40.169 29.4871 39.5967 29.25 39 29.25ZM16.5 6.75H9C8.40326 6.75 7.83097 6.98705 7.40901 7.40901C6.98705 7.83097 6.75 8.40326 6.75 9V16.5C6.75 17.0967 6.98705 17.669 7.40901 18.091C7.83097 18.5129 8.40326 18.75 9 18.75C9.59674 18.75 10.169 18.5129 10.591 18.091C11.0129 17.669 11.25 17.0967 11.25 16.5V11.25H16.5C17.0967 11.25 17.669 11.0129 18.091 10.591C18.5129 10.169 18.75 9.59674 18.75 9C18.75 8.40326 18.5129 7.83097 18.091 7.40901C17.669 6.98705 17.0967 6.75 16.5 6.75Z";
const cornersInPath =
  "M27.75 18V9C27.75 8.40326 27.9871 7.83097 28.409 7.40901C28.831 6.98705 29.4033 6.75 30 6.75C30.5967 6.75 31.169 6.98705 31.591 7.40901C32.0129 7.83097 32.25 8.40326 32.25 9V15.75H39C39.5967 15.75 40.169 15.9871 40.591 16.409C41.0129 16.831 41.25 17.4033 41.25 18C41.25 18.5967 41.0129 19.169 40.591 19.591C40.169 20.0129 39.5967 20.25 39 20.25H30C29.4033 20.25 28.831 20.0129 28.409 19.591C27.9871 19.169 27.75 18.5967 27.75 18ZM18 27.75H9C8.40326 27.75 7.83097 27.9871 7.40901 28.409C6.98705 28.831 6.75 29.4033 6.75 30C6.75 30.5967 6.98705 31.169 7.40901 31.591C7.83097 32.0129 8.40326 32.25 9 32.25H15.75V39C15.75 39.5967 15.9871 40.169 16.409 40.591C16.831 41.0129 17.4033 41.25 18 41.25C18.5967 41.25 19.169 41.0129 19.591 40.591C20.0129 40.169 20.25 39.5967 20.25 39V30C20.25 29.4033 20.0129 28.831 19.591 28.409C19.169 27.9871 18.5967 27.75 18 27.75ZM39 27.75H30C29.4033 27.75 28.831 27.9871 28.409 28.409C27.9871 28.831 27.75 29.4033 27.75 30V39C27.75 39.5967 27.9871 40.169 28.409 40.591C28.831 41.0129 29.4033 41.25 30 41.25C30.5967 41.25 31.169 41.0129 31.591 40.591C32.0129 40.169 32.25 39.5967 32.25 39V32.25H39C39.5967 32.25 40.169 32.0129 40.591 31.591C41.0129 31.169 41.25 30.5967 41.25 30C41.25 29.4033 41.0129 28.831 40.591 28.409C40.169 27.9871 39.5967 27.75 39 27.75ZM18 6.75C17.4033 6.75 16.831 6.98705 16.409 7.40901C15.9871 7.83097 15.75 8.40326 15.75 9V15.75H9C8.40326 15.75 7.83097 15.9871 7.40901 16.409C6.98705 16.831 6.75 17.4033 6.75 18C6.75 18.5967 6.98705 19.169 7.40901 19.591C7.83097 20.0129 8.40326 20.25 9 20.25H18C18.5967 20.25 19.169 20.0129 19.591 19.591C20.0129 19.169 20.25 18.5967 20.25 18V9C20.25 8.40326 20.0129 7.83097 19.591 7.40901C19.169 6.98705 18.5967 6.75 18 6.75Z";

const isPhotoStream = (searchUrl) => {
  const urlParams = new URLSearchParams(searchUrl);
  const source = urlParams.get("source");
  return source === "photostream";
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
    console.warn("Could not set value for element", elementId);
  }
};

const setHref = (elementId, newValue) => {
  replaceContent(elementId, newValue !== "" ? newValue : undefined, "href");
};

const updateButtonStates = () => {
  const close = document.getElementById("close");
  const prev = document.getElementById("previous");
  const next = document.getElementById("next");

  close.href ? close.classList.remove("is-disabled") : close.classList.add("is-disabled");
  prev.href ? prev.classList.remove("is-disabled") : prev.classList.add("is-disabled");
  next.href ? next.classList.remove("is-disabled") : next.classList.add("is-disabled");
};

const navigateTo = async (url) => {
  if (document.fullscreenElement !== null) {
    try {
      const urlParts = url.split(urlBreakpoint);
      const response = await fetch(`/json${urlParts[0]}/index.json${urlParts[1] ? `/?${urlParts[1]}` : ""}`);
      const newPage = await response.json();

      replaceContent("image", newPage.style, "style");
      replaceContent("image", newPage.src, "src");
      replaceContent("image", newPage.alt, "alt");
      replaceContent("title", newPage.title);
      replaceContent("location", newPage.location);
      replaceContent("date", newPage.date);
      replaceContent("medium", newPage.medium);
      replaceContent("captionBody", newPage.content);

      if (isPhotoStream(urlParts[1] ?? urlParts[0])) {
        setHref("close", "/");
        setHref("previous", newPage.photoStreamPrev);
        setHref("next", newPage.photoStreamNext);
      } else {
        setHref("close", newPage.close);
        setHref("previous", newPage.pagesPrev);
        setHref("next", newPage.pagesNext);
      }

      updateButtonStates();

      history.pushState(undefined, "", url);
      document.title = newPage.siteTitle;
    } catch (e) {
      console.error(e);
      window.location.href = url;
    }
  } else {
    window.location.href = url;
  }
};

const scrollCaption = (open) => {
  if (open) {
    const caption = document.getElementById("captionContent");
    caption?.scrollIntoView({
      behavior: "smooth",
    });
    caption && (captionOpen = true);
  } else {
    const container = document.getElementById("captionContainer");
    container?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    container && (captionOpen = false);
  }
};

const init = () => {
  const close = document.getElementById("close");
  const prev = document.getElementById("previous");
  const next = document.getElementById("next");

  if (isPhotoStream(window.location.search)) {
    setHref("close", close?.dataset.photoStreamHref);
    setHref("previous", prev?.dataset.photoStreamHref);
    setHref("next", next?.dataset.photoStreamHref);

    updateButtonStates();
  }

  document.getElementById("toggleCaption").addEventListener("click", () => {
    scrollCaption(!captionOpen);
  });

  document.getElementById("fullscreen")?.addEventListener("click", async () => {
    if (document.fullscreenElement === null) {
      try {
        await document.querySelector("body")?.requestFullscreen();
        document.querySelector("#fullscreen > svg > path")?.setAttribute("d", cornersInPath);
      } catch (e) {
        console.warn(e);
      }
    } else {
      try {
        await document.exitFullscreen();
        document.querySelector("#fullscreen > svg > path")?.setAttribute("d", cornersOutPath);
      } catch (e) {
        console.warn(e);
      }
    }
  });

  prev.addEventListener("click", (e) => {
    if (document.fullscreenElement !== null) {
      e.preventDefault();
      navigateTo(prev?.getAttribute("href"));
    }
  });

  next.addEventListener("click", (e) => {
    if (document.fullscreenElement !== null) {
      e.preventDefault();
      navigateTo(next?.getAttribute("href"));
    }
  });

  const captionContainer = document.getElementById("captionContainer");
  captionContainer?.addEventListener("scrollend", () => {
    const scrollPos = captionContainer.scrollTop;
    if (scrollPos > 0) {
      !captionOpen && (captionOpen = true);
    } else {
      captionOpen && (captionOpen = false);
    }
  });

  window.addEventListener("keydown", (e) => {
    let url = undefined;

    const caption = document.getElementById("captionContent");

    switch (e.key) {
      case "Escape":
        e.preventDefault();
        url = close?.getAttribute("href");
        break;
      case "ArrowLeft":
        url = prev?.getAttribute("href");
        break;
      case "ArrowRight":
        url = next?.getAttribute("href");
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!arrowDownPressed || (caption && caption.scrollHeight < document.documentElement.clientHeight)) {
          arrowDownPressed = true;
          scrollCaption(!captionOpen);
        }
        break;
      case "ArrowUp":
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
};

if (document.readyState !== "loading") {
  init();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
}
