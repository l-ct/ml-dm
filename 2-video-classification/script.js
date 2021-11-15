

// classifier and p are initialized up top as
// global variables so they can be used inside
// multiple function scopes...
let classifier, p;

// setup is a core function in p5.js
function setup(){
    // createP() is p5.js function that creates a p element
    // and inserts it at end of html
    p = createP();

    // more p5 code to remove the canvas element
    // that it otherwise would create and insert by default
    noCanvas();

    // createCapture() is a p5 function that accesses the user's camera or microphone
    // https://p5js.org/examples/dom-video-capture.html
    let video = createCapture(VIDEO);

    // Initialize the Image Classifier method
    // with MobileNet and the video as the second argument
    classifier = ml5.imageClassifier('MobileNet', video, function(){
        console.log('MobileNet ready');

        // when MobileNet is loaded, now call the function gotResults
        classifier.predict(gotResults);
    });
}

function gotResults(err, results){
    console.log(results);

    // adds content inside the <p> element created up top
    p.html(results[0].label);

    // gotResults passed as an argument recursively
    classifier.predict(gotResults);
}

