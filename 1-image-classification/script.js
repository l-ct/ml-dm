

// verify ml5 has loaded correctly
console.log('ml5 version:', ml5.version);

// setup is a p5.js function
function setup(){
    // the following three lines initialize variables
    // that reference elements on our html page
    let img = select('img');
    let result = select('#result');
    let probability = select('#probability');

    // when loading from another server uncomment this line
    img.elt.crossOrigin = 'Anonymous';

    // the ml5 variable is declared in the ml5.js library
    // Create the classifier with MobileNet
    const classifier = ml5.imageClassifier('MobileNet', () => {
        console.log('MobileNet ready');
    });

    classifier.predict(img, (err, results) => {
        // this function get's called each time there's a prediction
        console.log(results);
        result.html(results[0].label);
        probability.html(results[0].confidence);
    });
}



