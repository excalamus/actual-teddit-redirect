function redirectHandler(request) {

    const initialTargetUrl = request.url;

    let redirectUrl = "https://teddit.net";

    // browser.storage is accessed asynchronously and returns a
    // promise for the value
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage
    let storage_promise = browser.storage.local.get("user_teddit_preference");

    // when the promise returns, do the following:
    // 1. check for a user defined Teddit instance (from within addon preferences)
    // 2. assign a default instance if none
    // 3. ensure text protocol
    // 4. replace Reddit with Teddit in request string
    // 5. assign replaced
    return storage_promise.then((storage) => {

        let redirectUrl = storage.user_teddit_preference;

        if (!redirectUrl) {
            redirectUrl = "https://teddit.net"
        }

        if (redirectUrl.substring(0, 4) != "http") {
            redirectUrl = "https://" + redirectUrl;
        }

        const redirectedTargetUrl = initialTargetUrl.replace(
            /^http(?:s)?:\/\/(?:(?:www|old).)?reddit\.com(?:\/)?(.*)/,
            redirectUrl.replace(/(\/+)$/, "") + "/$1"
        );

        // The listener for onBeforeRequest must return a blockingResponse object.
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
        blockingResponse = {};

        // to redirect the request, include a property redirectUrl with
        // the value set to the URL to which you want to redirect.
        //
        // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
        blockingResponse.redirectUrl = redirectedTargetUrl;
        return blockingResponse;
    });
}

// filter
//
//   webRequest.RequestFilter. A filter that restricts the events that will be sent to this listener.
//
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#parameters
//
// urls
//
//   array of string. An array of match patterns. The listener will
//   only be called for requests whose targets match any of the given
//   patterns. Only requests made using HTTP or HTTPS will trigger
//   events, other protocols (such as data: and file:) supported by
//   pattern matching do not trigger events.  view-source: requests
//   may be matched based on its inner URL.
//
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/RequestFilter#type
webRequestFilter = {
    urls: [
        "*://reddit.com/*",
        "*://www.reddit.com/*",
        "*://old.reddit.com/*"
    ]
}

// This event is triggered when a request is about to be made, and
// before headers are available. This is a good place to listen if you
// want to cancel or redirect the request.
//
// To cancel or redirect the request, first include "blocking" in the
// extraInfoSpec array argument to addListener().
//
//     browser.webRequest.onBeforeRequest.addListener(
//       listener,             // function
//       filter,               //  object
//       extraInfoSpec         //  optional array of strings
//     )
//
// If you use "blocking", you must have the "webRequestBlocking" API
// permission in your manifest.json.
//
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest
// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest
browser.webRequest.onBeforeRequest.addListener(
    redirectHandler, webRequestFilter, ["blocking"]);
