// Suppress running within iFrames, so that we only
// have one instance of the script per tab
if (window.top === window) {

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateTitle() {
    // HACK: If multiple tabs in Safari share the same prefix,
    // Safari hides that prefix from all of the tab titles.
    // To prevent our tab icons from being hidden, we prefix
    // each tab title with a unique number of zero-width characters.
    if (emoji) {
      document.title = spacer + emoji + " " + rawTitle;   
    } else {
      document.title = rawTitle;
    }
}

function getEmoji() {
  if (siteSettings) {
    return siteSettings.emoji;
  } else if (settings.showDefaultTabIcon) {
    return settings.defaultTabIcon;
  } else {
    return null;
  }
}

function getCurrentSiteSettings() {
  // format windowLocation, e.g., 
  // from 'https://www.google.com/other/path?=true'
  // to   'google.com/other/path?=true'
  var windowLocation = window.location.href;
  windowLocation = windowLocation.replace(/.*?:\/\//g, "")
  windowLocation = windowLocation.replace("www.", "");

  var currentSiteSettings = null;

  // Sort site settings so that less specific rules will match first;
  // i.e., we want a rule for 'reddit.com/r/apple' to override
  // a rule for 'reddit.com'
  settings.sites.sort();

  for (var i = 0; i < settings.sites.length; i++) {
    // Escape the user-entered pattern so we can use it as a regular expression.
    // Replacement pattern found at http://stackoverflow.com/a/4371855
    var pattern = settings.sites[i].hostname.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Then UNescape any asterisks, because the user wanted those to be wildcards.
    // But instead of a full wildcard, accept any characters except for a forward slash,
    // so that we only match in the actual domain. This way we allow subdomain matching
    // but avoid having the pattern "google.com" match on "yahoo.com/?query=google.com"
    pattern = pattern.split('\\*').join('[^/]*');
    var match = windowLocation.match(pattern);
    
    // If it matched at an index other than 0, it's not a prefix, so ignore it
    if (match !== null && match.index == 0) {
      currentSiteSettings = settings.sites[i];
    }
  }
  return currentSiteSettings;
}

function addTitleWatcher() {
  var target = document.querySelector('head > title');
  observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var newTitle = mutation.target.textContent;
      /* If the new title already includes our emoji, then either
         a) this event was triggered by the extension itself, or
         b) the site we're on preserved the emoji we added before
         changing the title. In either case, we should ignore the event.
      */
      if (emoji && newTitle.indexOf(emoji) === -1) {
        rawTitle = newTitle;
        updateTitle();
      }
    });
  });
  observer.observe(target, { subtree: true, characterData: true, childList: true });
}

function visibilityListener(e) {
  /* When you type a URL into the address bar, Safari starts
   to preload the page even before you hit enter. If the global
   extension page sends a getSettings response before you hit enter,
   the content script won't actually receive the message, so it won't
   know the extension settings. To fix this issue, we use an event
   listener so that when the preloaded page becomes visible we send
   another getSettings message to the global extension page.
  */
  if (!document.hidden) {
    if (!settings) {
      safari.self.tab.dispatchMessage("getSettings");
    }
    document.removeEventListener("visibilitychange", visibilityListener);
  }
}

function extensionEventHandler(event) {
  switch (event.name) {
    case "getSettings":
      settings = event.message;
      siteSettings = getCurrentSiteSettings();
      emoji = getEmoji();
      safari.self.tab.dispatchMessage("getTabIconSpacer", emoji);
      break;
    case "getTabIconSpacer":
      spacer = event.message;
      updateTitle();
      addTitleWatcher();
      break;
  }
}

var emoji = null;
var observer = null;
var settings = null;
var siteSettings = null;
var rawTitle = document.title;

safari.self.addEventListener("message", extensionEventHandler, false);

safari.self.tab.dispatchMessage("getSettings");
document.addEventListener("visibilitychange", visibilityListener);

}
