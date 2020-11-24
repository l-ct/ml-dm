


/*

addImage()
featureExtractor()
documented at
https://ml5js.org/docs/FeatureExtractor

*/

let classifier, label;

function setup() {

    let buttons = selectAll('button');

    // adding an attribute so we can keep track of how many times
    // we've clicked a given number
    buttons.forEach(button => {
        button.attribute('label', button.html());
        button.attribute('count', 0);
    });

    noCanvas();

    const mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log('MobileNet ready');
    });

    // creating a button to train...
    // added before video is creatted.
    const trainButton = createButton('Train');

    const video = createCapture(VIDEO);

    const options = { numLabels: buttons.length };
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


        // <p> tag will be added at end of page below video
        result = createP();


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

    });
}

function gotResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        result.html(getMaxLabel(results));
        classifier.classify(gotResults);
    }
}


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
