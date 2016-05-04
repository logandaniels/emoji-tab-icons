// Suppress running within iFrames, so that we only
// have one instance of the script per tab
if (window.top === window) {

var emoji = null;
var shouldWatch = false;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function updateTitle() {
    // Hack: If multiple tabs in Safari share the same prefix,
    // Safari hides that prefix from all of the tab titles.
    // To prevent our tab icons from being hidden, we prefix
    // the tab title with a random number of zero-width characters.
    var spacer = "\u200B".repeat(getRandomInt(1,500));
    document.title = spacer + emoji + " " + document.title;   
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
      case "getSiteSettings":
        emoji = event.message.emoji;
        updateTitle();
        break;
    }
}, false);

safari.self.tab.dispatchMessage("getSiteSettings", getHostname());

if (shouldWatch) {
    addTitleWatcher();
}

}
