var env = new maximEx.env();

var angle = 0;
var startStop = false;

var isLeft = false;
var isRight = true; // spins clockwise to begin with

var speed = 1.0;
var showSpeed = false;

var spin = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);

    env.sampleRate = 60;
}

function draw() {
    background(255);
    translate(width / 2, height / 2);

    speed = constrain(speed, 0, 100);

    spin = env.damp(0.1, 0.5);

    if (isLeft) {
        angle -= spin * speed;
    } else if (isRight) {
        angle += spin * speed;
    }

    if (startStop) {
        env.trigger();
    } else if (!startStop) {
        env.release();
    }

    var radius = width * 0.25;

    push();
        rotate(radians(angle));

        for (var i = 0; i < 12; i++) {
            if (i % 2 == 0) {
                fill(0);
                arc(0, 0, radius * 2, radius * 2, radians(0 + i * 30), radians(30 + i * 30), PIE);
            } else if(i % 2 == 1) {
                fill(255);
                arc(0, 0, radius * 2, radius * 2, radians(0 + i * 30), radians(30 + i * 30), PIE);

                push();
                    strokeCap(SQUARE);
                    strokeWeight(15);
                    noFill();
                    stroke(0);
                    arc(0, 0, radius + radius / 2, radius + radius / 2, radians(0 + i * 30), radians(15 + i * 30));
                    arc(0, 0, radius, radius, radians(15 + i * 30), radians(30 + i * 30));
                pop();
            }
        }
    pop();

    if (showSpeed) {
        translate(- width / 2, - height / 2);
        text("Rotation Speed: " + speed, 20, 20); 
    }
}

function keyPressed() {
    if (key === ' ') {
        startStop = !startStop;
    }

    if (keyCode === LEFT_ARROW) {
        isLeft = true;
        isRight = false;
    } else if (keyCode === RIGHT_ARROW) {
        isLeft = false;
        isRight = true;
    }

    if (keyCode === UP_ARROW) {
        speed += 0.5;
        //speed += 0.1;
        //speed += 0.05;
    } else if (keyCode === DOWN_ARROW) {
        //speed -= 0.01;
        speed -= 0.5;
    }

    // little pop up menu showing speed of rotation
    if (keyCode === 83) {
        showSpeed = !showSpeed;
        console.log("Rotation Speed");
    }
}
