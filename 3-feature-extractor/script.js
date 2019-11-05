/*

addImage()
featureExtractor()
documented at
https://ml5js.org/docs/FeatureExtractor

*/

let classifier;
let label = document.createElement('p');

function setup() {
	noCanvas();
	let mobilenet = ml5.featureExtractor('MobileNet', function(){
		console.log('MobileNet ready');
	});
	let video = createCapture(VIDEO);
	classifier = mobilenet.classification(video, function(){
		console.log('video ready');
		document.body.appendChild(label);
	});
}

function gotResults(error, results) {
	if (error) {
		console.error(error);
	} else {
		console.log(results);
		let innerLabel = "";
		let maxConfidence = 0;
		for(let i=0; i<results.length; i++){
			if(results[i].confidence > maxConfidence){
				innerLabel = results[i].label;
			}
		}
		label.innerHTML = innerLabel;
		classifier.classify(gotResults);
	}
}

let count = {
	// it's bad style to have upperCase properties
	// but managing the case would add lines of code
	// so I'm leaving them like this
	Sad: 0,
	Happy: 0
};
function add(label, element){
	count[label]++;
	element.innerHTML = label + ' ' + count[label];
	classifier.addImage(label);
	console.log(classifier);
}

function train(element){
	classifier.train(function(loss){
		if (loss == null) {
			element.innerHTML = 'Trained'
			classifier.classify(gotResults);
		} else {
			element.innerHTML = 'Training: ' + loss;
		}
	});
}

