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

// The content script needs to know which video will have its playback rate
// increased, it will send a request that we need to respond to (no need to keep
// track of more than one per tab, since the data is only needed once).
var playbackInfoByTabId = {};
chrome.extension.onRequest.addListener(
  function(request, sender, sendResponse) {
    sendResponse(playbackInfoByTabId[sender.tab.id]);
  });

function setPlaybackRate(playbackRate, info, tab) {
  playbackInfoByTabId[tab.id] = {
    playbackRate: playbackRate,
    srcUrl: info.srcUrl,
    mediaType: info.mediaType
  };

  chrome.tabs.executeScript(tab.id, {file: 'playback-rate.js'});
}

PLAYBACK_RATES.forEach(function(playbackRate) {
  chrome.contextMenus.create({
        title: playbackRate + 'x',
        contexts: ['video', 'audio'],
        onclick: setPlaybackRate.bind(this, playbackRate)
      });
});
