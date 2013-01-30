var PLAYBACK_RATES = [
  0.5,
  0.75,
  1.0,
  1.25,
  1.5,
  1.75,
  2.0,
  2.5,
  3.0
];

function setPlaybackRate(playbackRate, info, tab) {
  var playbackInfo = {
    playbackRate: playbackRate,
    srcUrl: info.srcUrl,
    mediaType: info.mediaType
  };

  // First inject the script with the definition of the function.
  chrome.tabs.executeScript(
    tab.id,
    {file: 'playback-rate.js'},
    function() {
      // Then call it with the current parameters.
      chrome.tabs.executeScript(
        tab.id,
        {code: 'setPlaybackRate(' + JSON.stringify(playbackInfo) + ');'});
    });
}

chrome.runtime.onInstalled.addListener(function() {
  PLAYBACK_RATES.forEach(function(playbackRate) {
    chrome.contextMenus.create({
          title: playbackRate + 'x',
          contexts: ['video', 'audio'],
          id: String(playbackRate)
        });
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  setPlaybackRate(parseFloat(info.menuItemId), info, tab);
});
