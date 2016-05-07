// Suppress running within iFrames, so that we only
// have one instance of the script per tab
if (window.top === window) {

var settings = null;
var siteSettings = null;
var shouldWatch = false;
var rawTitle = null;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateTitle() {
    // Hack: If multiple tabs in Safari share the same prefix,
    // Safari hides that prefix from all of the tab titles.
    // To prevent our tab icons from being hidden, we prefix
    // the tab title with a random number of zero-width characters.
    var emoji = getEmoji();
    if (emoji) {
      var spacer = "\u200B".repeat(getRandomInt(1,500));
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
    console.log("Not yet implemented.");
}

safari.self.addEventListener("message", function(event) {
    switch (event.name) {
      case "getSettings":
        settings = event.message;
        siteSettings = getSiteSettings(getHostname());
        updateTitle();
        break;
    }
}, false);

rawTitle = document.title;

safari.self.tab.dispatchMessage("getSettings");

if (shouldWatch) {
    addTitleWatcher();
}

}
