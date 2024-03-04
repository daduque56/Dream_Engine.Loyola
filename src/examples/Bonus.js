//Here we are setting that the whenever the game starts the snake will have 10 segments, which
//each of them is going to be drawn and edite whenever the draw function is called.

let numSegments = 10;
let direction = 'right'; // This is the starting orientation of the snake when the game starts

const xStart = 0; //starting x coordinate for snake
const yStart = 250; //starting y coordinate for snake
const diff = 10;

//Here we created some arrays for the snakes Y and X coordinates thru the game in order to be 
// called when necessary

let xCor = [];
let yCor = [];

// Here we created the variables that will hold off the values for the snakes fruit and how this
//affects the user score, creting it to later providing it with a value

let xFruit = 0;
let yFruit = 0;
let scoreElem;

// Here we created the starting set up for our Snake game, assigning to our variable scoreElem
// the visaul represetation stating score is equal to 0, creating the ID for the score element to work
// and giving the Div some color to be differentiate from the background

function setup() {
  scoreElem = createDiv('Score = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');

// Here we are telling our setup function to create the canvas where our user is going to play
// and to let a later function to work on the canvas as the game updates frame by frame, like the
// fruit coordinates updateing when the user already picked one.

  createCanvas(500, 500);
  frameRate(15);
  stroke(255);
  strokeWeight(10);
  updateFruitCoordinates();

// And here we are telling our setup function to update the numSegments value that we setted before for 
// our sanke, making it to sum up 1 new whenever the user eats a fruit from the canvas

  for (let i = 0; i < numSegments; i++) {
    xCor.push(xStart + i * diff);
    yCor.push(yStart);
  }
}

// Here we are basically creating a function that will draw all the visuals to our game, but linking them 
// with the logic functions we make before as the number of segments depending if the user moves, eats a fruit
// and other functions that we are later going to create such as updateSnakeCoordinates, checkGameStatus and 
//checkForFruit

function draw() {
  background(0);
  for (let i = 0; i < numSegments - 1; i++) {
    line(xCor[i], yCor[i], xCor[i + 1], yCor[i + 1]);
  }
  updateSnakeCoordinates();
  checkGameStatus();
  checkForFruit();
}

// Here we created a function that will update the number of segmebts of the snake depending on its Y and X 
// axis orientation, meaning that depending the orientation left->right and right->left the segments number 
// updates as if it was left->Right and segmnets are 1, 2 and 3 each, the user eats a fruit, so now the 
// the new segment order should be 2 is 1, 3 is 2, 3 is 3 and the new segment 4 is 4, and this logic works, on
// orientation form up, to down, to left and to right

function updateSnakeCoordinates() {
  for (let i = 0; i < numSegments - 1; i++) {
    xCor[i] = xCor[i + 1];
    yCor[i] = yCor[i + 1];
  }
  switch (direction) {
    case 'right':
      xCor[numSegments - 1] = xCor[numSegments - 2] + diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'up':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] - diff;
      break;
    case 'left':
      xCor[numSegments - 1] = xCor[numSegments - 2] - diff;
      yCor[numSegments - 1] = yCor[numSegments - 2];
      break;
    case 'down':
      xCor[numSegments - 1] = xCor[numSegments - 2];
      yCor[numSegments - 1] = yCor[numSegments - 2] + diff;
      break;
  }
}

// Here we created a function thath constantly checks the X and Y coordinates of the snake and its segment lenght,
// this is in order to constatly check if the user picked up a fruit and it score went up +1, or if the player 
// collisioned with its own body of the snake and loses, to then print the Game ended! Your score was message

function checkGameStatus() {
  if (
    xCor[xCor.length - 1] > width ||
    xCor[xCor.length - 1] < 0 ||
    yCor[yCor.length - 1] > height ||
    yCor[yCor.length - 1] < 0 ||
    checkSnakeCollision()
  ) {
    noLoop();
    const scoreVal = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Game ended! Your score was : ' + scoreVal);
  }
}

/*
 If the snake hits itself, that means the snake head's (x,y) coordinate
 has to be the same as one of its own segment's (x,y) coordinate.
*/
function checkSnakeCollision() {
  const snakeHeadX = xCor[xCor.length - 1];
  const snakeHeadY = yCor[yCor.length - 1];
  for (let i = 0; i < xCor.length - 1; i++) {
    if (xCor[i] === snakeHeadX && yCor[i] === snakeHeadY) {
      return true;
    }
  }
}

/*
 Wheneverr the snake consumes a fruit, I increment the number of segments,
 and just insert the tails segment again at the start of the array (basically
 I add the last segment again at the tail, therby extending the tail)
*/
function checkForFruit() {
  point(xFruit, yFruit);
  if (xCor[xCor.length - 1] === xFruit && yCor[yCor.length - 1] === yFruit) {
    const prevScore = parseInt(scoreElem.html().substring(8));
    scoreElem.html('Score = ' + (prevScore + 1));
    xCor.unshift(xCor[0]);
    yCor.unshift(yCor[0]);
    numSegments++;
    updateFruitCoordinates();
  }
}

function updateFruitCoordinates() {
  /*
    The complex math logic is because I wanted the point to lie
    in between 100 and width-100, and be rounded off to the nearest
    number divisible by 10, since I move the snake in multiples of 10.
  */

  xFruit = floor(random(10, (width - 100) / 10)) * 10;
  yFruit = floor(random(10, (height - 100) / 10)) * 10;
}

function keyPressed() {
  switch (keyCode) {
    case 74:
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 76:
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 73:
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 75:
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}