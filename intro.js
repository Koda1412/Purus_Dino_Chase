
let isIntro = true;   // Flag to track if the intro is being displayed
let isMenu = false;   // Flag for the menu screen
let gameStarted = false;

const themeSound = new Audio('./theme.mp3'); 
themeSound.volume = 0.5; // Adjust volume as needed
themeSound.loop = true;

function startGame() {

    resetGame();
    requestAnimationFrame(gameLoop);
}

function showIntro() {
    
    clearCanvas();
    const introImage = new Image();
    introImage.src = './modern-white-background.jpg'; // Add your intro image

    introImage.onload = function() {
        context.drawImage(introImage, 0, 0, canvas.width, canvas.height);
        };

    canvas.addEventListener('click', handleIntroClick);
}


function handleIntroClick() {
    if (isIntro) {
        isIntro = false;
        isMenu = true;
        canvas.removeEventListener('click', handleIntroClick);
        showMenu();       
        themeSound.play();
    }
}

function showMenu() {
    clearCanvas();
    const menuImage = new Image();
    menuImage.src = './menu-background.png'; // Add your intro image

    
    menuImage.onload = function() {
    context.drawImage(menuImage, 0, 0, canvas.width, canvas.height);
    context.font = '40px Comic Sans MS';
    context.fillStyle = 'black';
    context.fillText('DINO CHASE', 65, 300);
    
    // Draw "Start Game" Button
    context.font = '18px Comic Sans MS';
    context.fillStyle = 'red';
    context.strokeStyle = 'black';
    const startButtonX = canvas.width / 2 - 60;
    const startButtonY = canvas.height / 2 - 20;
    context.fillRect(startButtonX, startButtonY, 120, 50);
    context.strokeRect(startButtonX, startButtonY, 120, 50);
    context.fillStyle = 'white';
    context.fillText('Start Game', startButtonX + 10, startButtonY + 30);

    // Draw "Instructions" Button
    context.font = '18px Comic Sans MS';
    context.fillStyle = 'red';
    context.strokeStyle = 'black';
    const instructionsButtonX = canvas.width / 2 - 60;
    const instructionsButtonY = canvas.height / 2 + 50;
    context.strokeRect(instructionsButtonX, instructionsButtonY, 120, 50);
    context.fillRect(instructionsButtonX, instructionsButtonY, 120, 50);
    context.fillStyle = 'white';
    context.fillText('Instructions', instructionsButtonX + 10, instructionsButtonY + 30);

    
    };

    canvas.addEventListener('click', handleMenuClick);
}

function handleMenuClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const startButtonX = canvas.width / 2 - 60;
    const startButtonY = canvas.height / 2 - 20;
    const instructionsButtonX = canvas.width / 2 - 60;
    const instructionsButtonY = canvas.height / 2 + 50;

    if (mouseX >= startButtonX && mouseX <= startButtonX + 120 &&
        mouseY >= startButtonY && mouseY <= startButtonY + 50) {
        // Start the game
        isMenu = false;
        gameStarted = true;
        canvas.removeEventListener('click', handleMenuClick);
        themeSound.pause();
        themeSound.currentTime = 0;
        startGame();
    } else if (mouseX >= instructionsButtonX && mouseX <= instructionsButtonX + 120 &&
               mouseY >= instructionsButtonY && mouseY <= instructionsButtonY + 50) {
        // Show instructions
        showInstructions();
    }
}

function showInstructions() {
    clearCanvas();
    const insImage = new Image();
    insImage.src = './menu-background.png'; // Add your intro image
    
    insImage.onload = function() {
        context.drawImage(insImage, 0, 0, canvas.width, canvas.height);
        context.font = '15px Comic Sans MS';
        context.fillStyle = 'black';
        context.fillText('Instructions:', 30, 200);
        context.fillText('1. Use Up-Dowm to change type of the dino', 30, 220);
        context.fillText('special ability (Right-Bomb and Left-Avocado).', 30, 240);
        context.fillText('2. Click to drop the dino, dino with same type', 30, 260);
        context.fillText('chase to score points, drop bomb to destroy dino.', 30, 280);
        context.fillText('3. Drop avocado to make dino bigger, chase big dino', 30, 300);
        context.fillText('will get more ponit, only bomb can chase white dino.', 30, 320);
        context.fillText('4. Use avocado required 30 score point, each 4 time', 30, 340);
        context.fillText('get dino chase, you will get 1 bomb to use.', 30, 360);
        context.fillText('Click to return to menu', 30, 380);

    };
    

    canvas.addEventListener('click', showMenu);
}