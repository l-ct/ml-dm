let video,
    poseNet,
    poses = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    video = createCapture(VIDEO);
    video.size(width, height);

    // Create a new poseNet method with a single detection
    poseNet = ml5.poseNet(video, () => {
        console.log('poseNet ready');
    });

    // This sets up an event that fills the global variable "poses"
    // with an array every time new poses are detected
    poseNet.on('pose', results => {
        // take a look at the console to see how the results
        // object looks like
        console.log(results);
        poses = results;
    });

    // Hide the video element, and just show the canvas
    video.hide();

}

function draw() {
    // unfortunately, the video feed is often flipped horizontally
    // in the previous example we modified that in CSS,
    // but here we have to do it in JS
    translate(video.width, 0);
    scale(-1, 1);

    // + + + + + edit  below + + + + +
    // + + + + + + + + + + + + + + + +
    // + + + + + + + + + + + + + + + +
    // comment background and set different colors or opacities
    background('rgba(255, 255, 255, 1)');
    // + + + + + + + + + + + + + + + +
    // + + + + + + + + + + + + + + + +
    // uncomment below if you want to see the video feed
    // image(video, 0, 0, width, height);
    // + + + + + + + + + + + + + + + +
    // + + + + + + + + + + + + + + + +
    // + + + + + edit  above + + + + +

    // We can call both functions to draw all keypoints and the skeletons
    drawKeypoints();
    drawSkeleton();
}


// + + + + + + + + + + + + + + + +
// + + + + + + + + + + + + + + + +
// the "results" aka "poses" structure informs how must code
// our two Keypoints and Skeleton functions
// try and inspect it in the console to see why the loops are 
// where they are and why the word keypoints and position are used here
// + + + + + + + + + + + + + + + +
// + + + + + + + + + + + + + + + +
// keypoints and skeletons don't all have to be drawn
// try omitting some in the following two functions!
// + + + + + + + + + + + + + + + +
// + + + + + + + + + + + + + + + +



// A function to draw ellipses over the detected keypoints
function drawKeypoints()  {
    // Loop through all the poses detected
    for (let i = 0; i < poses.length; i++) {
        // For each pose detected, loop through all the keypoints
        let pose = poses[i].pose;
        for (let j = 0; j < pose.keypoints.length; j++) {
            // A keypoint is an object describing a body part (like rightArm or leftShoulder)
            let keypoint = pose.keypoints[j];
            // Only draw an ellipse is the pose probability is bigger than 0.2
            if (keypoint.score > 0.2) {

                // + + + + + edit  below + + + + +
                // + + + + + + + + + + + + + + + +
                // + + + + + + + + + + + + + + + +
                // change shape, color or opacity
                fill('rgba(0, 0, 0, 1)');
                noStroke();
                circle(keypoint.position.x, keypoint.position.y, 10);
                // + + + + + + + + + + + + + + + +
                // + + + + + + + + + + + + + + + +
                // + + + + + edit  above + + + + +

            }
        }
    }
}

// A function to draw the skeletons
function drawSkeleton() {
    // Loop through all the skeletons detected
    for (let i = 0; i < poses.length; i++) {
        const skeleton = poses[i].skeleton;
        // For every skeleton, loop through all body connections
        for (let j = 0; j < skeleton.length; j++) {
            const partA = skeleton[j][0];
            const partB = skeleton[j][1];

            // + + + + + edit  below + + + + +
            // + + + + + + + + + + + + + + + +
            // + + + + + + + + + + + + + + + +
            // change shape, color or opacity
            stroke('rgba(0, 0, 0, 1)');
            strokeWeight(2);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
            // + + + + + + + + + + + + + + + +
            // + + + + + + + + + + + + + + + +
            // + + + + + edit  above + + + + +

        }
    }
}