/*
 *
 * the methods addImage() and featureExtractor() are documented at
 * https://learn.ml5js.org/#/reference/feature-extractor
 *
 */

// global variables
let classifier, result;

function setup() {

    // p5 method that grabs the buttons in the HTML page
    let buttons = selectAll('button');

    // adding custom label and count attribute
    // to each button's HTML tag
    // where we'll store how many times
    // we've clicked a particular label
    buttons.forEach(button => {
        button.attribute('label', button.html());
        button.attribute('count', 0);
    });

    // no need for the <canvas> element on this project
    noCanvas();

    // this function extracts MobileNet's image detection model
    // from the data it was trained on, so we can train new data with it
    // https://ml5js.org/reference/api-FeatureExtractor/
    const mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log('MobileNet ready');
    });

    // p5 method that grabs a video feed from the user's device
    const video = createCapture(VIDEO);

    // these options allow us to add however many buttons we want
    const options = { numLabels: buttons.length };

    // this method runs 
    classifier = mobilenet.classification(video,  options, () => {
        console.log('video ready');


        buttons.forEach(button => {
            button.mouseClicked(() => {
                // find out what category was just clicked
                const label = button.attribute('label')
                // get previous count;        
                let count = button.attribute('count');

                // increment count
                count++;

                // add this image with it's corresponding label
                classifier.addImage(label);

                // show the updated count for the user
                button.html(label + ' ' + count);

                // store incremented count in its attribute for later
                button.attribute('count', count);
            });
        });

        // creating an html <button> to train...
        const trainButton = createButton('Train');
        // place inside the nav element
        trainButton.parent(select('nav'))


        // when the trainButton is clicked,
        // the training function will begin
        trainButton.mouseClicked(() => {
            classifier.train(loss => {
                if (loss == null) {
                    trainButton.html('Trained');
                    classifier.classify(gotResults);
                } else {
                    trainButton.html('Training: ' + loss);
                }
            });
        })


        // <p> tag will be added at end of page below video
        result = createP();

    });
}

// callback function that gets invoked when the data has finished training
// notice that this method calls passes itself when it reaches the end,
// that will have the effect that it'll continue to run all the time
function gotResults(error, results) {
    if (error) {
        // sends a message to the browser's JavaScript console
        console.error(error);
    } else {
        // sends a message to the browser's JavaScript console
        console.log(results);
        result.html(getMaxLabel(results));
        // this is a recursive function
        // meaning when it reaches this point
        // it calls itself
        classifier.classify(gotResults);
    }
}

// this is just a little helper function
// to sift through the complex "results" array
function getMaxLabel(results){
    let maxConfidence = 0;
    let maxLabel = '';
    for(let i=0; i<results.length; i++){
        if(maxLabel < results[i].confidence){
            maxLabel = results[i].label;
        }
    }
    return maxLabel;
}
