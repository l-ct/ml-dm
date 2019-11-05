/*
*/

// classifier and p are initialized up top as
// global variables so they can be used inside
// multiple function scopes...
let classifier;
let p = document.createElement('p');

// setup is a core function in p5.js
function setup(){
	// more p5 code to remove the canvas element
	// that it tries to add by default:
	noCanvas();

	// createCapture is a p5.dom.js function
	// in the notes.js file you can see what's
	// happening behing the scenes
	// https://p5js.org/examples/dom-video-capture.html
	let video = createCapture(VIDEO);

	// Initialize the Image Classifier method
	// with MobileNet and the video as the second argument
	classifier = ml5.imageClassifier('MobileNet', video, function(){
		console.log('MobileNet ready');
		classifier.predict(gotResults);

		// this is only to place the p element
		// after the video tag
		document.body.appendChild(p);
	});
}

function gotResults(err, results){
	console.log(results);
	// vanilla js code to place results in the
	// <p> element which was created at the top
	p.innerHTML = results[0].label;
	// gotResults passed as an argument recursively...
	classifier.predict(gotResults);
}

