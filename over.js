
function resetGame() {
    
    isGameOver = false;
    score = 0;
    bombValue = 0;
    objectCount = 0;
    time = 0;
    gameObjects = [];
    isAutoGenerating = false;
    autoGenerateIntervalId = null;
    autoGenerateIntervalBoneId = null;
    canvas.removeEventListener('click', handleRestartClick); // Remove the game-over listener
    clearCanvas();
    createWorld();
    startTimer();
}

function gameOver() {
    isGameOver = true;
    loopSound.pause();
    loopSound.currentTime = 0;
    currentBackgroundImage = backgroundImage;
    // Check and update high score
    if (score > highScore) {
    highScore = score;
    localStorage.setItem('highScore', highScore); // Save the new high score to localStorage
    }
    drawGameOverScreen();
    canvas.addEventListener('click', handleRestartClick);
}

function drawGameOverScreen() {
    clearCanvas();

    const backgroundOver = new Image();
    backgroundOver.src = './over.jpg';

    // Wait until the image is fully loaded before drawing
    backgroundOver.onload = function() {
        // Draw the background image
        context.drawImage(backgroundOver, 0, 0, canvas.width, canvas.height);

        // Set font and color for the text
        context.font = '36px Comic Sans MS';
        context.fillStyle = 'white';

        // Calculate text width and height for the rectangle
        const gameOverText = 'Game Over';
        const scoreText = 'Your score: ' + score;
        const highScoreText = 'High score: ' + highScore;
        const restartText = 'Click to Restart';
        const menuText = 'Back to Menu';

        // Measure text sizes
        const gameOverWidth = context.measureText(gameOverText).width;
        const scoreWidth = context.measureText(scoreText).width;
        const highScoreWidth = context.measureText(highScoreText).width;
        const restartWidth = context.measureText(restartText).width;
        const menuWidth = context.measureText(menuText).width;
        const maxWidth = Math.max(gameOverWidth, scoreWidth, highScoreWidth, restartWidth, menuWidth);

        const textHeight = 36; // Font size
        const padding = 30;
        const boxWidth = maxWidth + 2 * padding;
        const boxHeight = (textHeight * 8) + (4 * padding); // 5 lines of text

        const boxX = canvas.width / 2 - boxWidth / 2;
        const boxY = canvas.height / 2 - boxHeight / 2;

        // Draw the rectangle
        context.fillStyle = 'rgba(0, 0, 0, 0.7)'; // Semi-transparent background
        context.fillRect(boxX, boxY, boxWidth, boxHeight);

        // Draw the text
        context.fillStyle = 'white';
        context.fillText(gameOverText, canvas.width / 2 - gameOverWidth / 2, canvas.height / 2 - textHeight / 2 - padding + textHeight);
        context.font = '24px Comic Sans MS';
        context.fillText(scoreText, canvas.width / 2 - scoreWidth / 2, canvas.height / 2 + textHeight / 2 + padding);
        context.fillText(highScoreText, canvas.width / 2 - highScoreWidth / 2, canvas.height / 2 + textHeight / 2 + padding * 2);

        // Draw the "Restart" button
        const restartButtonX = canvas.width / 2 - restartWidth / 2 - 10;
        const restartButtonY = canvas.height / 2 + textHeight / 2 + padding * 2.8;
        context.fillStyle = 'red';
        context.fillRect(restartButtonX, restartButtonY, restartWidth + 20, 30);

        // Draw the "Back to Menu" button
        const menuButtonX = canvas.width / 2 - menuWidth / 2 - 10;
        const menuButtonY = canvas.height / 2 + textHeight / 2 + padding * 4.0;
        context.fillStyle = 'red';
        context.fillRect(menuButtonX, menuButtonY, menuWidth + 20, 30);

        // Draw the text on top of both buttons
        context.fillStyle = 'white';
        context.fillText(restartText, canvas.width / 2 - restartWidth / 2, canvas.height / 2 + textHeight / 2 + padding * 3 + 20);
        context.fillText(menuText, canvas.width / 2 - menuWidth / 2, canvas.height / 2 + textHeight / 2 + padding * 4.7);
    };
}


function handleRestartClick(event) {
    const mouseX = event.clientX - canvas.getBoundingClientRect().left;
    const mouseY = event.clientY - canvas.getBoundingClientRect().top;

    const restartButtonX = canvas.width / 2 - context.measureText('Click to Restart').width / 2 - 10;
    const restartButtonY = canvas.height / 2 + 36 / 2 + 30 * 2.8;
    const restartButtonWidth = context.measureText('Click to Restart').width + 20;
    const restartButtonHeight = 30;

    const menuButtonX = canvas.width / 2 - context.measureText('Back to Menu').width / 2 - 10;
    const menuButtonY = canvas.height / 2 + 36 / 2 + 30 * 4.0;
    const menuButtonWidth = context.measureText('Back to Menu').width + 20;
    const menuButtonHeight = 30;

    // Check if the restart button is clicked
    if (mouseX >= restartButtonX && mouseX <= restartButtonX + restartButtonWidth &&
        mouseY >= restartButtonY && mouseY <= restartButtonY + restartButtonHeight) {
        resetGame();
        requestAnimationFrame(gameLoop); // Restart the game loop
        canvas.removeEventListener('click', handleRestartClick);
    }

    // Check if the menu button is clicked
    else if (mouseX >= menuButtonX && mouseX <= menuButtonX + menuButtonWidth &&
             mouseY >= menuButtonY && mouseY <= menuButtonY + menuButtonHeight) {
        isGameOver = false;
        isIntro = true;
        canvas.removeEventListener('click', handleRestartClick);
        showIntro(); // Go back to the menu
    }
}
