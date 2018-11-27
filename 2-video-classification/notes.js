// what CreateCapture is doing behind the scenes

p5.prototype.createCapture = function() {
    p5._validateParameters('createCapture', arguments);
    var useVideo = true;
    var useAudio = true;
    var constraints;
    var cb;
    for (var i = 0; i < arguments.length; i++) {
      if (arguments[i] === p5.prototype.VIDEO) {
        useAudio = false;
      } else if (arguments[i] === p5.prototype.AUDIO) {
        useVideo = false;
      } else if (typeof arguments[i] === 'object') {
        constraints = arguments[i];
      } else if (typeof arguments[i] === 'function') {
        cb = arguments[i];
      }
    }
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      var elt = document.createElement('video');
      // required to work in iOS 11 & up:
      elt.setAttribute('playsinline', '');

      if (!constraints) {
        constraints = { video: useVideo, audio: useAudio };
      }

      navigator.mediaDevices.getUserMedia(constraints).then(
        function(stream) {
          try {
            if ('srcObject' in elt) {
              elt.srcObject = stream;
            } else {
              elt.src = window.URL.createObjectURL(stream);
            }
          } catch (err) {
            elt.src = stream;
          }
          if (cb) {
            cb(stream);
          }
        },
        function(e) {
          console.log(e);
        }
      );
    } else {
      throw 'getUserMedia not supported in this browser';
    }
    var c = addElement(elt, this, true);
    c.loadedmetadata = false;
    // set width and height onload metadata
    elt.addEventListener('loadedmetadata', function() {
      elt.play();
      if (elt.width) {
        c.width = elt.videoWidth = elt.width;
        c.height = elt.videoHeight = elt.height;
      } else {
        c.width = c.elt.width = elt.videoWidth;
        c.height = c.elt.height = elt.videoHeight;
      }
      c.loadedmetadata = true;
    });
    return c;
  };