// Suppress running within iFrames, so that we only
// have one instance of the script per tab
if (window.top === window) {

var emoji = null;
var observer = null;
var settings = null;
var siteSettings = null;
var rawTitle = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateTitle() {
    // Hack: If multiple tabs in Safari share the same prefix,
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

function getSiteSettings(hostname) {
  for (var i = 0; i < settings.sites.length; i++) {
    if (settings.sites[i].hostname == hostname) {
      return settings.sites[i];
    }
  }
  return null;
}
function getHostname() {
    var hostname = window.location.hostname;
    hostname = hostname.replace("www.", "");
    return hostname;
}

function addTitleWatcher() {
  var target = document.querySelector('head > title');
  observer = new window.WebKitMutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      var newTitle = mutation.target.textContent;
      /* If the new title includes our emoji, then either
         a) this event was triggered by the extension itself, or
         b) the site we're on preserved the emoji we added before
         changing the title. In either case, we should ignore the event.
      */
      if (newTitle.indexOf(emoji) === -1) {
        rawTitle = newTitle;
        updateTitle();
      }
    });
  });
  observer.observe(target, { subtree: true, characterData: true, childList: true });
}

safari.self.addEventListener("message", function(event) {
    switch (event.name) {
      case "getSettings":
        settings = event.message;
        siteSettings = getSiteSettings(getHostname());
        emoji = getEmoji();
        safari.self.tab.dispatchMessage("getTabIconSpacer", emoji);
        break;
      case "getTabIconSpacer":
        spacer = event.message;
        updateTitle();
        addTitleWatcher();
        break;
    }
}, false);

rawTitle = document.title;

safari.self.tab.dispatchMessage("getSettings");

}
