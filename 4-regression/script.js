/*

addImage()
featureExtractor()
predict()
documented at
https://ml5js.org/docs/FeatureExtractor

*/

// we're no longer using a classifier but a
// regressor.
let regressor;
let label = document.createElement('p');
let rectangle = document.getElementById('rectangle');

let count = 0;

function setup() {
	noCanvas();
	let mobilenet = ml5.featureExtractor('MobileNet', function(){
		console.log('MobileNet ready');
	});
	let video = createCapture(VIDEO);
	regressor = mobilenet.regression(video, function(){
		console.log('video ready');
		document.body.appendChild(label);
	});
}

function gotResults(error, result) {
	if (error) {
		console.error(error);
	} else {
		console.log(result);
		rectangle.style.left = (result.value * 100) + '%';
		// notice now we're using predict...
		regressor.predict(gotResults);
	}
}

function add(element){
	let sliderValue = document.getElementById('slider').value;
	count++;
	console.log(sliderValue, count);
	element.innerHTML = 'Add ' + count;
	console.log(sliderValue / 100);
	regressor.addImage(sliderValue / 100);
}

function train(element){
	regressor.train(function(loss){
		if (loss == null) {
			element.innerHTML = 'Trained';
			// this is just vanilla js to override
			// the display: none; property originally
			// set in css
			rectangle.style.display = 'block';
			regressor.predict(gotResults);
		} else {
			element.innerHTML = 'Training: ' + loss;
		}
	});
}

