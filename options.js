// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/user_interface/Options_pages#examples
function saveOptions(e) {
  e.preventDefault();
  browser.storage.local.set({
    user_teddit_preference: document.querySelector("#user_teddit_preference").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#user_teddit_preference").value = result.user_teddit_preference || "https://teddit.net";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.local.get("user_teddit_preference");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
