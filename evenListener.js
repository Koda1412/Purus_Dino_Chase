
const dinoTypes = ['dinoT', 'dinoV', 'dinoD', 'dinoM', 'avocado', 'bomb'];
const dinoNames = ['Yellow', 'Green', 'Blue', 'Red', 'Avocado', 'Bomb'];
let currentIndex = 0;
let selectedObjectType = dinoTypes[currentIndex];
let text = dinoNames[currentIndex];

window.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        // Move up in the list (cycle only through the first 4 elements)
        currentIndex = (currentIndex === 0) ? 3 : currentIndex - 1;
    } else if (event.key === 'ArrowDown') {
        // Move down in the list (cycle only through the first 4 elements)
        currentIndex = (currentIndex === 3) ? 0 : currentIndex + 1;
    } else if (event.key === 'ArrowRight') {
        // Select bomb if 'ArrowRight' is pressed
        selectedObjectType = 'bomb';
        text = 'Bomb';
        console.log(`${text} is now selected`);
    } else if (event.key === 'ArrowLeft') {
        // Select avocado if 'ArrowLeft' is pressed
        selectedObjectType = 'avocado';
        text = 'Avocado';
        console.log(`${text} is now selected`);
    }

    // Update selection if arrow keys are pressed (only for the first 4 elements)
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        selectedObjectType = dinoTypes[currentIndex];
        text = dinoNames[currentIndex];
        console.log(`${text} selected`);
    }

    // Bomb restriction logic
    if (selectedObjectType === 'bomb' && bombValue < 4) {
        console.log('Bomb can’t be used.');
        currentIndex = 0;  // Force back to the first valid index (Yellow Dino)
        selectedObjectType = dinoTypes[currentIndex];
        text = dinoNames[currentIndex];
    }

    // Avocado restriction logic
    if (selectedObjectType === 'avocado' && score < 30) {
        console.log('Avocado can’t be used.');
        currentIndex = 0;  // Force back to the first valid index (Yellow Dino)
        selectedObjectType = dinoTypes[currentIndex];
        text = dinoNames[currentIndex];
    }
});

        
let lastClickTime = 0; // Track the last time a click was registered
const clickCooldown = 1500; // Cooldown period in milliseconds (1500 ms = 1,5 seconds)

canvas.addEventListener('click', function(event) {
    if (isGameOver) return;

    const currentTime = Date.now();
    if (currentTime - lastClickTime < clickCooldown) {
        return; // If the time since the last click is less than the cooldown, ignore this click
    }

    lastClickTime = currentTime; // Update the last click time

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = 40;
    const vx = 0;
    const vy = 100;
    const radius = 40

    if (selectedObjectType === 'dinoV') {
        gameObjects.push(new SpriteV(x, y, vx, vy, restitution, radius));
    } else if (selectedObjectType === 'dinoT') {
        gameObjects.push(new SpriteT(x, y, vx, vy, restitution, radius));
    } else if (selectedObjectType === 'dinoD') {
        gameObjects.push(new SpriteD(x, y, vx, vy, restitution, radius));
    } else if (selectedObjectType === 'dinoM') {
        gameObjects.push(new SpriteM(x, y, vx, vy, restitution, radius));
    } else if (selectedObjectType === 'avocado') {
        gameObjects.push(new Avocado(x, y, vx, vy, restitution, 25));
        score -= 30;
        selectedObjectType = 'dinoT';
        text = 'Yellow';
    } else if (selectedObjectType === 'bomb') {
        gameObjects.push(new Bomb(x, y, vx, vy, restitution, radius));
        selectedObjectType = 'dinoT';
        text = 'Yellow';
    }

    objectCount++;

    if (objectCount >= maxObjects) {
        gameOver();
    }
});
