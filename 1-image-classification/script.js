/*
Files need to be loaded...
https://github.com/ml5js/ml5-library/issues/217
*/

// Create the classifier with MobileNet
const classifier = ml5.imageClassifier('MobileNet', function(){
	console.log('MobileNet ready');
});

function loaded(element){
	// Make a prediction
	classifier.predict(element, function(err, results){
		console.log(results);
		document.getElementById('result').innerHTML = results[0].className;
	});
}

