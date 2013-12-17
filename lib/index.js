/*global BinaryClient*/
var client = new BinaryClient('ws://127.0.0.1:66600');

client.on('stream', function(stream) {
  stream.on('data', function (data) {
    console.log(data.byteLength);
  });
});
