
let time = 0;
let score = 0;
let highScore = parseInt(localStorage.getItem('highScore')) || 0;
let objectCount = 0;
let bombValue = 0;
const maxObjects = 12;
let isGameOver = false;

const loopSound = new Audio('./game.mp3'); 
loopSound.volume = 0.5; // Adjust volume as needed
loopSound.loop = true;

const autoGeneSound = new Audio('./pillow-hit.mp3'); 
autoGeneSound.volume = 1;

// Create image objects
const yellowDinoImage = new Image();
const greenDinoImage = new Image();
const blueDinoImage = new Image();
const redDinoImage = new Image();
const bombImage = new Image();
const avocadoImage = new Image();
const bombAVImageA = new Image();
const bombAVImageB = new Image();
const bombAVImageC = new Image();
const bombAVImageD = new Image();
const bombAVImageE = new Image();

yellowDinoImage.src = './DinoSprites - tard.png';
greenDinoImage.src = './DinoSprites - vita.png';
blueDinoImage.src = './DinoSprites - doux.png';
redDinoImage.src = './DinoSprites - mort.png';
bombImage.src = './Bomb.png';
avocadoImage.src = './Avocado.png';
bombAVImageA.src = './StatusBarA.png';
bombAVImageB.src = './StatusBarB.png';
bombAVImageC.src = './StatusBarC.png';
bombAVImageD.src = './StatusBarD.png';
bombAVImageE.src = './StatusBarE.png';

yellowDinoImage.onload = function() {
  console.log('Yellow Dino Image loaded');
};

greenDinoImage.onload = function() {
  console.log('Green Dino Image loaded');
};

blueDinoImage.onload = function() {
  console.log('Blue Dino Image loaded');
};

redDinoImage.onload = function() {
  console.log('Red Dino Image loaded');
};

bombImage.onload = function() {
  console.log('Bomb Image loaded');
};

avocadoImage.onload = function() {
  console.log('Avocado Image loaded');
};

bombAVImageA.onload = function() {
  console.log('Bomb Status Bar Image loaded');
};

bombAVImageB.onload = function() {
  console.log('Bomb Status Bar Image loaded');
};

bombAVImageC.onload = function() {
  console.log('Bomb Status Bar Image loaded');
};

bombAVImageD.onload = function() {
  console.log('Bomb Status Bar Image loaded');
};

bombAVImageE.onload = function() {
  console.log('Bomb Status Bar Image loaded');
};

const backgroundImage = new Image();
backgroundImage.src = './backgr2.png';
const backgroundImage2 = new Image();
backgroundImage2.src = './backgr3.png';
const backgroundImage3 = new Image();
backgroundImage3.src = './backgr.jpg';
let currentBackgroundImage = backgroundImage; 
backgroundImage.onload = function() {
resetGame();
};


const dinoImages = {
    'dinoT': yellowDinoImage,  
    'dinoV': greenDinoImage,   
    'dinoD': blueDinoImage,    
    'dinoM': redDinoImage,  
    'avocado': avocadoImage,   
    'bomb': bombImage
};

let currentFrame = 0;
const frameWidth = 24; 
const frameHeight = 24; 
const totalFrames = 24; 

const frameWidthAvocado = 16; 
const frameHeightAvocado = 16; 
const totalAvocadoFrames = 1;

let animationSpeed = 100; 
let lastUpdateTime = 0;

function gameLoop(timeStamp) {
    loopSound.play();
    if (isGameOver) return;

    let secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    clearCanvas();

    // Background based on score
    if (score >= 1000) {
        currentBackgroundImage = backgroundImage3;
        startAutoGenerate();
    } else if (score >= 500) {
        currentBackgroundImage = backgroundImage2;
        startAutoGenerateBone();
    }

    context.drawImage(currentBackgroundImage, 0, 0, canvas.width, canvas.height);
    detectCollisions();
    // Update and draw all game objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(secondsPassed);
        gameObjects[i].draw(context);
    }

    context.fillStyle = 'black';
    context.font = '20px Comic Sans MS';
    context.fillText('Score: ' + score, 10, 30);
    context.fillText('Dino left: ' + (maxObjects - objectCount), 10, 60);
    context.fillText(text, 310,25);
    if (bombValue>=4){
        context.font = '10px Comic Sans MS';
        context.fillText('Press > to use Bomb', 152, 55);
    }
    
    if (time > 30 ) {
        context.fillStyle = 'red';
        context.font = '22px Comic Sans MS';
        context.fillText('Time Left: ' + (40 - time), 10, 80);
    } else if (time <= 30 ) {
        context.fillStyle = 'black';
        context.font = '20px Comic Sans MS';
        context.fillText('Time Left: ' + (40 - time), 10, 80);
    }

    // Draw the bombAVImage
    if (bombValue == 0) { 
    context.drawImage(bombAVImageA, 150, 20, 100, 20);
    } else if (bombValue == 1) { 
    context.drawImage(bombAVImageB, 150, 20, 100, 20);
    } else if (bombValue == 2) { 
    context.drawImage(bombAVImageC, 150, 20, 100, 20);
    } else if (bombValue == 3) { 
    context.drawImage(bombAVImageD, 150, 20, 100, 20);
    } else if (bombValue >= 4) {
    context.drawImage(bombAVImageE, 150, 20, 100, 20);
    } 

    // Draw the current dino type animation
    if (selectedObjectType && dinoImages[selectedObjectType]) {
        
        if (selectedObjectType === 'avocado')
        {
        let dinoImg = dinoImages[selectedObjectType];
        // Update frame if enough time has passed
        if (timeStamp - lastUpdateTime > animationSpeed) {
            currentFrame = (currentFrame + 1) % totalAvocadoFrames; // Loop the frame index
            lastUpdateTime = timeStamp;
        }

        // Calculate the x position of the current frame in the spritesheet
        let frameX = currentFrame * frameWidthAvocado;

        // Draw the current frame from the spritesheet
        context.drawImage(dinoImg, frameX, 0, frameWidthAvocado, frameHeightAvocado, 330, 30, 32, 32);
   
        } else {
        let dinoImg = dinoImages[selectedObjectType];
        // Update frame if enough time has passed
        if (timeStamp - lastUpdateTime > animationSpeed) {
            currentFrame = (currentFrame + 1) % totalFrames; // Loop the frame index
            lastUpdateTime = timeStamp;
        }

        // Calculate the x position of the current frame in the spritesheet
        let frameX = currentFrame * frameWidth;

        // Draw the current frame from the spritesheet
        context.drawImage(dinoImg, frameX, 0, frameWidth, frameHeight, 300, 20, 65, 65);
    }
    }

    // Game-over conditions
    if (objectCount > maxObjects || time > 40) {
        gameOver();
        return;
    }

    // Regenerate the world if all objects are gone
    if (objectCount <= 1  && !isGameOver) {
        resetAvailableXPositions();
        createWorld();
    }

    window.requestAnimationFrame(gameLoop);
}


let timerIntervalId = null; // Variable to store the interval ID

function startTimer() {
    // Clear any existing interval
    if (timerIntervalId !== null) {
        clearInterval(timerIntervalId);
        timerIntervalId = null; // Ensure the interval ID is reset
    }

    // Determine the interval time based on the score
    let intervalTime;
    if (score > 1000) {
        intervalTime = 500; // 500 milliseconds if score > 2000
    } else if (score > 500) {
        intervalTime = 1000; // 750 milliseconds if score > 1000
    } else {
        intervalTime = 1500; // 1500 milliseconds if score <= 1000
    }
    
    console.log(`Score: ${score}, Setting timer interval to ${intervalTime} milliseconds.`);

    // Start a new interval
    timerIntervalId = setInterval(() => {
        if (!isGameOver) {
            time++;
            console.log(`Time updated: ${time}`);
        }
    }, intervalTime); // Update based on score
}

// Function to create objects in the world, with a customizable number of objects
function createWorld(numToGenerate = 6) {
    autoGeneSound.play();

    // Ensure we do not try to generate more objects than available x-positions
    const numObjectsToAdd = Math.min(numToGenerate, availableXPositions.length);

    for (let i = 0; i < numObjectsToAdd; i++) {
        addRandomObject();
    }

    // Log a message if fewer objects were created due to limited x-positions
    if (numObjectsToAdd < numToGenerate) {
        console.log(`Only ${numObjectsToAdd} objects were added because x-positions ran out.`);
    }
}


// Function to add a random object, ensuring the game doesn't exceed the max number of objects

function addBone() {
    if (objectCount >= maxObjects) {
        gameOver();
        return;
    }

    const objectSize = 40; // Fixed size of each object
    const xPositions = [
        60, 120, 180, 240, 300, 360
    ]; // Predefined x positions

    const vx = 0; // Horizontal velocity
    const vy = 100; // Vertical velocity

    // Random x-position from the predefined set
    const randomIndex = Math.floor(Math.random() * xPositions.length);
    const x = xPositions[randomIndex];
    const y = 40; // Fixed y-position (starting point)

    // Add a new Bone object to the gameObjects array
    const bone = new Bone(x, y, vx, vy, restitution, objectSize);

    // Push the object to the gameObjects array and increment the count
    gameObjects.push(bone);
    objectCount++;
}


// List of available x positions (global or outside the function)
let availableXPositions = [50, 100, 150, 200, 250, 300, 350];

function resetAvailableXPositions() {
    availableXPositions = [50, 100, 150, 200, 250, 300, 350];
}



function addRandomObject() {
    if (objectCount >= maxObjects) {
        gameOver();
        return;
    }

    if (availableXPositions.length === 0) {
        console.log('No more x-positions available!');
        return;
    }

    const objectSize = 40; // Fixed size for all objects
    const y = 40; // Fixed y-position (starting point)

    const vx = 0; // Horizontal speed (velocity)
    const vy = 100; // Fixed vertical speed

    // Select a random x position from the available list
    const randomXIndex = Math.floor(Math.random() * availableXPositions.length);
    const x = availableXPositions[randomXIndex];

    // Define the sprite constructors
    const sprites = [
        () => new SpriteT(x, y, vx, vy, restitution, objectSize),
        () => new SpriteV(x, y, vx, vy, restitution, objectSize),
        () => new SpriteD(x, y, vx, vy, restitution, objectSize),
        () => new SpriteM(x, y, vx, vy, restitution, objectSize)
    ];

    // Pick a random sprite constructor
    const randomSpriteIndex = Math.floor(Math.random() * sprites.length);
    const newObject = sprites[randomSpriteIndex]();

    // Add the new object to the gameObjects array
    gameObjects.push(newObject);

    // Remove the used x-position from the available list
    availableXPositions.splice(randomXIndex, 1);

    // Increment the object count
    objectCount++;
}



let isAutoGenerating = false;  // Add this flag globally
let autoGenerateIntervalId = null;
function startAutoGenerate() {
    if (isAutoGenerating) return;  // Prevent multiple calls

    isAutoGenerating = true;  // Set the flag to true when auto-generation starts

    if (autoGenerateIntervalId !== null) {
        clearInterval(autoGenerateIntervalId);
        autoGenerateIntervalId = null;
    }

    console.log("Starting auto-generation...");
    autoGenerateIntervalId = setInterval(() => {
        if (score >= 1000 && !isGameOver && objectCount < maxObjects) {
            console.log("Auto-generating random object.");
            addRandomObject();
        }
    }, 3000);
}

let isAutoGeneratingBone = false;  // Add this flag globally
let autoGenerateIntervalBoneId = null;

function startAutoGenerateBone() {
    if (isAutoGeneratingBone) return;  // Prevent multiple calls

    isAutoGeneratingBone = true;  // Set the flag to true when auto-generation starts

    if (autoGenerateIntervalBoneId !== null) {
        clearInterval(autoGenerateIntervalBoneId);
        autoGenerateIntervalBoneId = null;
    }

    console.log("Starting auto-generation bone...");
    autoGenerateIntervalBoneId = setInterval(() => {
        if (score >= 500 && !isGameOver && objectCount < maxObjects) {
            console.log("Auto-generating bone.");
            addBone();
        }
    }, 10000);
}
