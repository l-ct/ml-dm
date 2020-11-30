/*

addImage()
featureExtractor()
predict()
documented at
https://ml5js.org/docs/FeatureExtractor

*/

// we're no longer using a classifier but a
// regressor.
let regressor,
    addButton,
    trainButton,
    slider,
    rectangle,
    count = 0;

function setup() {
    // p5 function selects the rectangle <div> by its id
    rectangle = select('#rectangle');
    // as well as add and train <button> also by their id
    addButton = select('#add');
    trainButton = select('#train');
    // here select() is grabbing the <input> of type range
    slider = select('#slider');

    // no need for canvas here either
    noCanvas();

    // once more, we're using feature extractor with MobileNet
    let mobilenet = ml5.featureExtractor('MobileNet', () => {
        console.log('MobileNet ready');
    });

    // p5 video feed
    let video = createCapture(VIDEO);

    // here we're not categorizing but setting a linear regression
    regressor = mobilenet.regression(video, () => {
        console.log('video ready');
    });

    // when the add button is clicked
    // invoke the grabSliderValues function
    addButton.mousePressed(grabSliderValues);
    trainButton.mousePressed(train);
}

function grabSliderValues(){
    // grabs slider's current value
    let sliderValue = slider.value();

    // adds 1 to count
    count++;

    // modify the addButton's text to include the count
    addButton.html('Add ' + count);

    // you can inspect the value of the count, and the slider
    // by opening the browser's JavaScript console
    console.log(sliderValue / 100, count);

    // adds the current video image and assigns it a number
    regressor.addImage(sliderValue / 100);
}

function train(){
    regressor.train(loss => {
        if (loss == null) {
            trainButton.html('Trained');
            // changes the CSS display property from "none"
            // as it's manually set in the CSS file 
            // and sets it now to "block" which has the effect
            // of displaying the element 
            rectangle.style('display', 'block');
            // now launch the results animation
            regressor.predict(gotResults);
        } else {
            // if loss is NOT null, then continue
            // updating the training button's text
            trainButton.html('Training: ' + loss);
        }
    });
}

// recursive animation that calls itself
function gotResults(error, result) {
    if (error) {
        console.error(error);
    } else {
        console.log(result);
        // here we're setting the position to a percentage value
        // which will move the black rectangle from the left side of the 
        // screen (0%) to the right (100%)+
        // This is works because our rectangle is positioned "absolutely"
        // in our css
        const percent = (result.value * 100) + '%';
        rectangle.style('left', percent);

        // notice now we're using predict
        regressor.predict(gotResults);
    }
}

