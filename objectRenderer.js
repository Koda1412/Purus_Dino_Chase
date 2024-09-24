
const g = 10000;
const canvasWidth = 400;
const canvasHeight = 750;
const restitution = 0.5;

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
let gameObjects = [];
let oldTimeStamp = 0;

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

class GameObject {
    constructor(x, y, vx, vy, restitution, radius) {
        this.x = x;
        this.radius = radius;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.restitution = restitution;
        this.isColliding = false;
    }
    draw() {}
    update(secondsPassed) {}
}

class Avocado extends GameObject {
    static numColumns = 1;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'avocado';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!Avocado.sprite) {
            Avocado.sprite = new Image();

            // Define the size of a frame when the image loads
            Avocado.sprite.onload = () => {
                Avocado.frameWidth = Avocado.sprite.width / Avocado.numColumns;
                Avocado.frameHeight = Avocado.sprite.height / Avocado.numRows;
            };

            // Start loading the image
            Avocado.sprite.src = './Avocado.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!Avocado.sprite || !Avocado.frameWidth || !Avocado.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % Avocado.numColumns;
        const row = Math.floor(this.currentFrame / Avocado.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            Avocado.sprite,
            column * Avocado.frameWidth,
            row * Avocado.frameHeight,
            Avocado.frameWidth,
            Avocado.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (Avocado.numColumns * Avocado.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}    


    class Bone extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'bone';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!Bone.sprite) {
            Bone.sprite = new Image();

            // Define the size of a frame when the image loads
            Bone.sprite.onload = () => {
                Bone.frameWidth = Bone.sprite.width / Bone.numColumns;
                Bone.frameHeight = Bone.sprite.height / Bone.numRows;
            };

            // Start loading the image
            Bone.sprite.src = './DinoSprites - cloud.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!Bone.sprite || !Bone.frameWidth || !Bone.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % Bone.numColumns;
        const row = Math.floor(this.currentFrame / Bone.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            Bone.sprite,
            column * Bone.frameWidth,
            row * Bone.frameHeight,
            Bone.frameWidth,
            Bone.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (Bone.numColumns * Bone.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}    

class SpriteVB extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoVB';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteVB.sprite) {
            SpriteVB.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteVB.sprite.onload = () => {
                SpriteVB.frameWidth = SpriteVB.sprite.width / SpriteVB.numColumns;
                SpriteVB.frameHeight = SpriteVB.sprite.height / SpriteVB.numRows;
            };

            // Start loading the image
            SpriteVB.sprite.src = './DinoSprites - vita.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteVB.sprite || !SpriteVB.frameWidth || !SpriteVB.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteVB.numColumns;
        const row = Math.floor(this.currentFrame / SpriteVB.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteVB.sprite,
            column * SpriteVB.frameWidth,
            row * SpriteVB.frameHeight,
            SpriteVB.frameWidth,
            SpriteVB.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteVB.numColumns * SpriteVB.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}


    class SpriteV extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoV';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteV.sprite) {
            SpriteV.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteV.sprite.onload = () => {
                SpriteV.frameWidth = SpriteV.sprite.width / SpriteV.numColumns;
                SpriteV.frameHeight = SpriteV.sprite.height / SpriteV.numRows;
            };

            // Start loading the image
            SpriteV.sprite.src = './DinoSprites - vita.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteV.sprite || !SpriteV.frameWidth || !SpriteV.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteV.numColumns;
        const row = Math.floor(this.currentFrame / SpriteV.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteV.sprite,
            column * SpriteV.frameWidth,
            row * SpriteV.frameHeight,
            SpriteV.frameWidth,
            SpriteV.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteV.numColumns * SpriteV.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}

class Bomb extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'bomb';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!Bomb.sprite) {
            Bomb.sprite = new Image();

            // Define the size of a frame when the image loads
            Bomb.sprite.onload = () => {
                Bomb.frameWidth = Bomb.sprite.width / Bomb.numColumns;
                Bomb.frameHeight = Bomb.sprite.height / Bomb.numRows;
            };

            // Start loading the image
            Bomb.sprite.src = './Bomb.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!Bomb.sprite || !Bomb.frameWidth || !Bomb.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % Bomb.numColumns;
        const row = Math.floor(this.currentFrame / Bomb.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            Bomb.sprite,
            column * Bomb.frameWidth,
            row * Bomb.frameHeight,
            Bomb.frameWidth,
            Bomb.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (Bomb.numColumns * Bomb.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}


class SpriteD extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoD';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteD.sprite) {
            SpriteD.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteD.sprite.onload = () => {
                SpriteD.frameWidth = SpriteD.sprite.width / SpriteD.numColumns;
                SpriteD.frameHeight = SpriteD.sprite.height / SpriteD.numRows;
            };

            // Start loading the image
            SpriteD.sprite.src = './DinoSprites - doux.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteD.sprite || !SpriteD.frameWidth || !SpriteD.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteD.numColumns;
        const row = Math.floor(this.currentFrame / SpriteD.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteD.sprite,
            column * SpriteD.frameWidth,
            row * SpriteD.frameHeight,
            SpriteD.frameWidth,
            SpriteD.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteD.numColumns * SpriteD.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}


class SpriteDB extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoDB';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteDB.sprite) {
            SpriteDB.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteDB.sprite.onload = () => {
                SpriteDB.frameWidth = SpriteDB.sprite.width / SpriteDB.numColumns;
                SpriteDB.frameHeight = SpriteDB.sprite.height / SpriteDB.numRows;
            };

            // Start loading the image
            SpriteDB.sprite.src = './DinoSprites - doux.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteDB.sprite || !SpriteDB.frameWidth || !SpriteDB.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteDB.numColumns;
        const row = Math.floor(this.currentFrame / SpriteDB.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteDB.sprite,
            column * SpriteDB.frameWidth,
            row * SpriteDB.frameHeight,
            SpriteDB.frameWidth,
            SpriteDB.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteDB.numColumns * SpriteDB.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}

class SpriteM extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoM';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteM.sprite) {
            SpriteM.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteM.sprite.onload = () => {
                SpriteM.frameWidth = SpriteM.sprite.width / SpriteM.numColumns;
                SpriteM.frameHeight = SpriteM.sprite.height / SpriteM.numRows;
            };

            // Start loading the image
            SpriteM.sprite.src = './DinoSprites - mort.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteM.sprite || !SpriteM.frameWidth || !SpriteM.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteM.numColumns;
        const row = Math.floor(this.currentFrame / SpriteM.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteM.sprite,
            column * SpriteM.frameWidth,
            row * SpriteM.frameHeight,
            SpriteM.frameWidth,
            SpriteM.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteM.numColumns * SpriteM.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}

class SpriteMB extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoMB';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteMB.sprite) {
            SpriteMB.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteMB.sprite.onload = () => {
                SpriteMB.frameWidth = SpriteMB.sprite.width / SpriteMB.numColumns;
                SpriteMB.frameHeight = SpriteMB.sprite.height / SpriteMB.numRows;
            };

            // Start loading the image
            SpriteMB.sprite.src = './DinoSprites - mort.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteMB.sprite || !SpriteMB.frameWidth || !SpriteMB.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteMB.numColumns;
        const row = Math.floor(this.currentFrame / SpriteMB.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteMB.sprite,
            column * SpriteMB.frameWidth,
            row * SpriteMB.frameHeight,
            SpriteMB.frameWidth,
            SpriteMB.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteMB.numColumns * SpriteMB.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}


class SpriteT extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoT';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteT.sprite) {
            SpriteT.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteT.sprite.onload = () => {
                SpriteT.frameWidth = SpriteT.sprite.width / SpriteT.numColumns;
                SpriteT.frameHeight = SpriteT.sprite.height / SpriteT.numRows;
            };

            // Start loading the image
            SpriteT.sprite.src = './DinoSprites - tard.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteT.sprite || !SpriteT.frameWidth || !SpriteT.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteT.numColumns;
        const row = Math.floor(this.currentFrame / SpriteT.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteT.sprite,
            column * SpriteT.frameWidth,
            row * SpriteT.frameHeight,
            SpriteT.frameWidth,
            SpriteT.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteT.numColumns * SpriteT.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}

class SpriteTB extends GameObject {
    static numColumns = 24;
    static numRows = 1;
    static frameWidth = 0;
    static frameHeight = 0;
    static sprite = null;

    constructor(x, y, vx, vy, restitution, radius) {
        super(x, y, vx, vy, restitution, radius);
        this.type = 'dinoTB';
        this.currentFrame = 0;
        this.frameSpeed = 10; // Adjust the speed of the frame changes
        this.frameCounter = 0;

        // Load the sprite image if not loaded already
        this.loadImage();
    }

    loadImage() {
        if (!SpriteTB.sprite) {
            SpriteTB.sprite = new Image();

            // Define the size of a frame when the image loads
            SpriteTB.sprite.onload = () => {
                SpriteTB.frameWidth = SpriteTB.sprite.width / SpriteTB.numColumns;
                SpriteTB.frameHeight = SpriteTB.sprite.height / SpriteTB.numRows;
            };

            // Start loading the image
            SpriteTB.sprite.src = './DinoSprites - tard.png';
        }
    }

    draw(context) {
        // Ensure image has loaded before drawing
        if (!SpriteTB.sprite || !SpriteTB.frameWidth || !SpriteTB.frameHeight) return;

        // Calculate the row and column based on the current frame number
        const column = this.currentFrame % SpriteTB.numColumns;
        const row = Math.floor(this.currentFrame / SpriteTB.numColumns);

        // Draw the current sprite frame
        context.drawImage(
            SpriteTB.sprite,
            column * SpriteTB.frameWidth,
            row * SpriteTB.frameHeight,
            SpriteTB.frameWidth,
            SpriteTB.frameHeight,
            this.x - this.radius,
            this.y - this.radius,
            this.radius * 2,
            this.radius * 2.42 // Adjust height scaling to match sprite proportions
        );
    }

    update(secondsPassed) {
        this.vy += g * secondsPassed;
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;

        // Increment frame counter to control animation speed
        this.frameCounter += secondsPassed * this.frameSpeed;
        if (this.frameCounter >= 1) {
            this.currentFrame = (this.currentFrame + 1) % (SpriteTB.numColumns * SpriteTB.numRows); // Loop through frames
            this.frameCounter = 0;
        }

        detectEdgeCollisions(this);
    }

    handleCollision() {
        // You can also trigger animation changes here if needed
    }
}
