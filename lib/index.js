/*global BinaryClient,webkitAudioContext*/

var client = new BinaryClient('ws://127.0.0.1:66600'),
  context = new webkitAudioContext(),
  nextStartTime = 0;

function playAudio (buffer) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(nextStartTime);

  if (nextStartTime === 0) {
    nextStartTime = context.currentTime;
  } else {
    nextStartTime = nextStartTime + buffer.duration;
  }
}

function handleData (data) {
  console.log(data.byteLength);

  context.decodeAudioData(data, playAudio, function () {
    console.log('Decoding failed');
  });
}

function startListening (stream) {
  stream.on('data', handleData);
}

client.on('stream', startListening);
