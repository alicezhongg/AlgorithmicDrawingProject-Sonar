let PTSans
let sonarSize = 125;

function preload() {
  PTSans = loadFont('PTSans-Regular.ttf');
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  colorMode(HSB);
  
  rectMode(CENTER);
  ellipseMode(CENTER);
}


function draw() {
  //variables for drawing
  let halfWidth = width/2;
  let halfHeight = height/2;
  let diameter = halfHeight;
  let radius = diameter/2;

  let fifth = diameter/5;

  let halfOpacity = 0.5;

  //variables for grid
  let roof = halfHeight - radius;
  let bottom = halfHeight + radius;
  let right = halfWidth - radius;
  let left = halfWidth + radius;

  let smallDiameter = diameter/50;

  //variables for "Sonar"  
  let hoverCenter = height*0.423 - radius;
  let hoverTop = hoverCenter - 50;
  let hoverBottom = hoverCenter + 50;
  let hoverRight = halfWidth - radius;
  let hoverLeft = halfWidth + radius;
  let sonarCenter = height*0.4 - radius;

  //variables for small circle
  let dx = mouseX - halfWidth;
  let dy = mouseY - halfHeight;
  let distance = sqrt(dx * dx + dy * dy);

  let angle = atan2(dy, dx);
  let x2 = halfWidth + cos(angle) * radius;
  let y2 = halfHeight + sin(angle) * radius;

  let x1 = map(mouseX, 0, width, halfWidth - radius, halfWidth + radius);
  let y1 = map(mouseY, 0, height, halfHeight - radius, halfHeight + radius);
  
  //background
  let startColor = color(215, 70, 18); //green
  let endColor = color(116, 70, 5);  //dark blue
  for (let x = 0; x < height; x++) {
    let gradientPosition = map(x, 0, width, 0, 1);
    let lerpedColor = lerpColor(startColor, endColor, gradientPosition);
    stroke(lerpedColor);
    line(0, x, width, x);
  }

  stroke(109, 50, 45, halfOpacity/20);
  strokeWeight(1);
  noFill();
  rect(halfWidth, halfHeight, diameter);
  // drawing the grid
  for (let x = right; x < left; x += diameter / 40) {
    for (let y = roof; y < bottom; y += diameter / 40) {
      line(x, roof, x, bottom);
      line(right, y, left, y);
    }
  }

  //draws the big circle
  strokeWeight(2);

  noFill();
  stroke(134, 54, 96);
  circle(halfWidth,halfHeight,diameter);
  line(halfWidth, roof, halfWidth, bottom);
  line(right, halfHeight, left, halfHeight);

  //draws the inner circles
  stroke(134, 54, 96, halfOpacity);
  circle(halfWidth, halfHeight, fifth);
  circle(halfWidth, halfHeight, fifth*2);
  circle(halfWidth, halfHeight, fifth*3);
  circle(halfWidth, halfHeight, fifth*4);

  //writes the numbers inside
  noStroke();
  fill(134, 54, 96, halfOpacity);
  textSize(sonarSize/7);
  text("10", halfWidth - radius/3.65, height*0.48)
  text("20", halfWidth - radius/2.1, height*0.48)
  text("30", halfWidth - radius/1.475, height*0.48)
  text("40", halfWidth - radius/1.14, height*0.48)

  //drawing the large text
  textAlign(CENTER,CENTER);
  textSize(sonarSize);
  textFont(PTSans);

  fill(195, 75, 45, halfOpacity*1.4);
  text("SONAR", halfWidth, sonarCenter);
    // rect(halfWidth, hoverCenter, diameter, 100);
  if (mouseX >= hoverRight && mouseX <= hoverLeft && mouseY >= hoverTop && mouseY <= hoverBottom){
    textSize(sonarSize/2);
    fill(195, 75, 45);
    stroke(134, 54, 96, halfOpacity*1.4);
    strokeWeight(2.5);
    text("SONAR", halfWidth, height*0.33);
  }

  //variables for line animation
  let millisec = millis()/1000;
  let x = halfWidth + radius * cos(millisec);
  let y = halfHeight + radius * sin(millisec);

  //line animation
  stroke(134, 54, 96);
  strokeWeight(4);
  line(halfWidth,halfHeight,x,y);

  stroke(134, 5, 255);
  strokeWeight(1);
  line(halfWidth,halfHeight,x,y);

  // Calculate the distance from the mouse cursor to the center of the larger circle
  fill(134, 54, 96);
  noStroke();

  // Limit the distance so the smaller ellipse stays within the larger circle's boundary
  if (distance > diameter) {
    circle(x2, y2, smallDiameter)
  } else {
    circle(x1, y1, smallDiameter);
  }
}