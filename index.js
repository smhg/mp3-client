;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])
;