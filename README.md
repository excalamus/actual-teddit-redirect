# Actual Reddit to Teddit
This simple Firefox addon actually redirects your web browser from
reddit.com and old.reddit.com to teddit.net.

```
*NOTE*

This plugin was designed for and works on Android! However, Mozilla no
longer appears to allow users to practically install plugins on
mobile.

https://discourse.mozilla.org/t/add-on-support-in-new-firefox-for-android/53488/175
```

The Actual Teddit Redirect add-on is based on the [Teddit
Redirect](https://addons.mozilla.org/en-US/firefox/addon/reddit-to-teddit-redirect/),
addon which would only redirect to Teddit *after* first going to
Reddit.  This add-on does the text replacement *before* the request is
made so that Reddit is never contacted by you directly.  (You can
verify this by going to `Web Developer > Network` (Ctrl + Shift + E)
and watching the network traffic when a request is sent.)

# Why teddit?
> Teddit is a free and open source alternative Reddit front-end
> focused on privacy. Teddit doesn't require you to have JavaScript
> enabled in your browser. The source is available on Codeberg at
> https://codeberg.org/teddit/teddit.

# How to use the Actual Teddit Redirect
Install the Actual Teddit Redirect add-on in order to redirect to the
official teddit.net any requests of the form:

```
*://reddit.com/*
*://www.reddit.com/*
*://old.reddit.com/*
```

## Use a custom Teddit instance
Teddit can be self-hosted and several people in the community run
their own servers.  You can use a custom Teddit instance by giving the
URL in the addon preferences.

# Requirements
The Actual Teddit Redirect add-on runs in the background. Anytime a
request matches one of the forms, it replaces the "reddit" portion
with "teddit". In order to do this, it needs to filter web
addresses. Hence, the permissions to "Access your data for reddit.com"
etc.  The requested URL is the only data accessed.

The add-on is set up to work with private tabs.  No extra data or
permissions are required.  This is handled through the `"incognito":
"spanning"` setting in the `manifest.json`.  See
[MDN:incognito](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json/incognito)
for a description of how that option works.

Otherwise, the URL to redirect to is stored locally and defaults to
"https://teddit.net".

# Thanks
Thank you to the author and contributors of the original Teddit
Redirect! Without your programming, documentation, and choice to
release the source code under a free license, I wouldn't have been
able to extend the addon. I'm grateful for what I learned in the
process.  Thanks for enabling me to bring your work closer to my
ideal.
