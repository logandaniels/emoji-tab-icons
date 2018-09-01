# :pray: Emoji tab icons for Safari :pray:

![Screenshot](https://github.com/logandaniels/emoji-tab-icons/raw/master/screenshot.png)

# 2018 Update
We got [sherlocked](https://www.urbandictionary.com/define.php?term=sherlocked)! New in macOS Mojave, Safari 12 [now has built-in tab favicon support](https://www.macworld.com/article/3284407/os-x/macos-mojave-how-to-turn-on-favicons-in-safari-12-tabs.html). Thanks for all your support.

---

After switching from Chrome to Safari, one feature was hard for me to live without: tab icons. Chrome adds a website's favicon as an icon for all tabs you have open for that website. Safari doesn't do this, which makes it hard to tell at a glance what site each of your tabs is on.

This extension lets you add emoji icons to your tabs on a site-by-site basis, to simulate Chrome's tab favicons.

## Installation
Download and open [emoji-tab-icons.safariextz](https://github.com/logandaniels/emoji-tab-icons/raw/v1.0.2/emoji-tab-icons.safariextz).

Unfortunately, installing untrusted extensions is buggy in Safari. When you open the ``.safariextz`` file, Safari will ask you to confirm that you really want to install it. If you're lucky, clicking "Trust" will install the extension. Often, though, nothing will happen and you'll have to try opening the file multiple times or restart Safari before it installs. If you still can't get it to install, [this StackExchange answer](http://apple.stackexchange.com/questions/214760/force-installing-untrusted-safari-extensions/233701#233701) provides a (clunky) workaround.

## Configuration
You can manage the extension's settings via the Extensions tab in the regular Safari preferences window.

On the settings page you can set different emoji icons for websites on a per-domain level. You can click "Show Suggested Sites" to choose from an included list of suggested domain-emoji pairings, or add as many of your own entries as you want.

Any text box that has a smiley face in it, like this:

![Emoji text entry](https://github.com/logandaniels/emoji-tab-icons/raw/master/emoji-text-entry.png)

allows emoji input. You can directly type or copy-and-paste an emoji in, or you can **click on the smiley face** to open an emoji picker dialogue.

## Changelog

### 1.0.2 - Dec 17, 2016

- Feature: Allow specifying URL patterns beyond the domain name (e.g., separate rules for 'reddit.com/r/apple' and 'reddit.com/r/technology').
- Feature: Allow using asterisk wildcards to match subdomains (e.g., '*.google.com')

### 1.0.1 - Oct 9, 2016

- Bugfix: Safari (and even the whole computer?!) would become unresponsive when disabling default tab icons (thanks, /u/iskiran on Reddit!)
- Bugfix: Preloaded webpages didn't always display an emoji

### 1.0 - May 16, 2016

- Initial release
