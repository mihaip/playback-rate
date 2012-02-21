chrome.extension.sendRequest({}, function(playbackInfo) {
  if (!playbackInfo) {
    console.log('missing playbackInfo');
    return;
  }

  var nodes = document.getElementsByTagName(playbackInfo.mediaType);
  var targetNode;
  for (var i = 0, node; node = nodes[i]; i++) {
    if (node.src == playbackInfo.srcUrl) {
      targetNode = node;
      break;
    }
    var sourceNodes = node.getElementsByTagName('source');
    for (var j = 0, sourceNode; sourceNode = sourceNodes[j]; j++) {
      if (sourceNode.src == playbackInfo.srcUrl) {
        targetNode = node;
        break;
      }
    }

    if (targetNode) {
      break;
    }
  }

  if (!targetNode) {
    console.log(
        'Could not find target node for ' + JSON.stringify(playbackInfo));
    return;
  }

  targetNode.playbackRate = playbackInfo.playbackRate;
});