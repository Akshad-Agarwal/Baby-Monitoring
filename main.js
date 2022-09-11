video = "";
status2 = "";
objects = [];

function preload() {
    song = loadSound("bell.wav");
}

function setup() {
    canvas = createCanvas(600, 450);
    canvas.position(480, 240);
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelReady);
    document.getElementById("status").innerHTML = "status detecting objects: ";
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }

    else {
        console.log(results);
        objects = results;
    }
}


function modelReady() {
    console.log("modelReady");
    status2 = true;
}

function draw() {
    image(video, 0, 0, 600, 500);
    if (status2 != "") {
        objectDetector.detect(video,gotresults);
        for (var i = 0; i < objects.length; i++) {
            stroke("purple");
            text(objects[i].label + " " + Math.floor(objects[i].confidence * 100) + " % ", objects[i].x + 10, objects[i].y + 10);
            noFill();
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("status").innerHTML = "Status: Baby Found";
                song.stop();
            }
            else {
                document.getElementById("status").innerHTML = "Status: Baby not Found";
                song.play();
            }
        }
    }
}

