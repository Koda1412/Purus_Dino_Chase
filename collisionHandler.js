
const collisionSound = new Audio('./mouse-click.mp3'); 
collisionSound.volume = 0.5;


function circleIntersect(x1, y1, r1, x2, y2, r2) {
    let squareDistance = (x1 - x2) ** 2 + (y1 - y2) ** 2;
    return squareDistance <= (r1 + r2) ** 2;
}

function resolveCollision(obj1, obj2) {
    let vCollision = { x: obj2.x - obj1.x, y: obj2.y - obj1.y };
    let distance = Math.sqrt(vCollision.x ** 2 + vCollision.y ** 2);
    let vCollisionNorm = { x: vCollision.x / distance, y: vCollision.y / distance };
    let vRelativeVelocity = { x: obj1.vx - obj2.vx, y: obj1.vy - obj2.vy };
    let speed = vRelativeVelocity.x * vCollisionNorm.x + vRelativeVelocity.y * vCollisionNorm.y;

    if (speed < 0) return;

    speed *= Math.min(obj1.restitution, obj2.restitution);
    let impulse = 2 * speed / (1 + 1);
    obj1.vx -= impulse * vCollisionNorm.x;
    obj1.vy -= impulse * vCollisionNorm.y;
    obj2.vx += impulse * vCollisionNorm.x;
    obj2.vy += impulse * vCollisionNorm.y;
}

function detectEdgeCollisions(obj) {
    if (obj instanceof SpriteVB ||obj instanceof SpriteTB ||obj instanceof SpriteMB ||obj instanceof SpriteDB 
    ||obj instanceof Bone ||obj instanceof Avocado ||obj instanceof Bomb ||obj instanceof SpriteD|| obj instanceof SpriteV 
    || obj instanceof SpriteM || obj instanceof SpriteT) {
        if (obj.x < obj.radius) {
            obj.vx = Math.abs(obj.vx) * obj.restitution;
            obj.x = obj.radius;
        } else if (obj.x > canvas.width - obj.radius) {
            obj.vx = -Math.abs(obj.vx) * obj.restitution;
            obj.x = canvas.width - obj.radius;
        }
        if (obj.y < obj.radius) {
            obj.vy = Math.abs(obj.vy) * obj.restitution;
            obj.y = obj.radius;
        } else if (obj.y > canvas.height - obj.radius) {
            obj.vy = -Math.abs(obj.vy) * obj.restitution;
            obj.y = canvas.height - obj.radius;
        }
     }
}

function detectCollisions() {
    // Reset collision status for all objects
    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].isColliding = false;
    }

    for (let i = 0; i < gameObjects.length; i++) {
        for (let j = i + 1; j < gameObjects.length; j++) {
            let obj1 = gameObjects[i];
            let obj2 = gameObjects[j];

            // Handle Different object collision (No disappearing, No bonus score)
            // Normal Object
            if ((obj1 instanceof SpriteT && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof SpriteT) 
            || (obj1 instanceof SpriteT && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof SpriteT) 
            || (obj1 instanceof SpriteT && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteT) 
            || (obj1 instanceof SpriteM && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof SpriteM) 
            || (obj1 instanceof SpriteM && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteM) 
            || (obj1 instanceof SpriteD && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteD)
            // Big Object
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteMB && obj2 instanceof SpriteTB) 
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof SpriteTB) 
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof SpriteTB) 
            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof SpriteMB) 
            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof SpriteMB) 
            || (obj1 instanceof SpriteDB && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof SpriteDB)
            // Big To Normal
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof SpriteTB) 
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof SpriteTB) 
            || (obj1 instanceof SpriteTB && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteTB) 

            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof SpriteMB) 
            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof SpriteMB) 
            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteMB) 

            || (obj1 instanceof SpriteVB && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof SpriteVB) 
            || (obj1 instanceof SpriteVB && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof SpriteVB) 
            || (obj1 instanceof SpriteVB && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof SpriteVB) 

            || (obj1 instanceof SpriteDB && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof SpriteDB) 
            || (obj1 instanceof SpriteDB && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof SpriteDB) 
            || (obj1 instanceof SpriteDB && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof SpriteDB) 
            // Same Type
            || (obj1 instanceof Bone && obj2 instanceof Bone) || (obj1 instanceof Avocado && obj2 instanceof Avocado) || (obj1 instanceof Bomb && obj2 instanceof Bomb)
            // Bone To Normal and Big Object
            || (obj1 instanceof Bone && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteTB) || (obj1 instanceof SpriteTB && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof Bone)
            || (obj1 instanceof Bone && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteMB && obj2 instanceof Bone)
            // Avocado To Big Object and Speacial Ability Object
            || (obj1 instanceof Avocado && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteMB && obj2 instanceof Avocado)
            || (obj1 instanceof Avocado && obj2 instanceof SpriteTB) || (obj1 instanceof SpriteTB && obj2 instanceof Avocado)
            || (obj1 instanceof Avocado && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof Avocado)
            || (obj1 instanceof Avocado && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof Avocado)
            || (obj1 instanceof Avocado && obj2 instanceof Bone) || (obj1 instanceof Bone && obj2 instanceof Avocado)
            || (obj1 instanceof Avocado && obj2 instanceof Bomb) || (obj1 instanceof Bomb && obj2 instanceof Avocado)
        
        ) 
            {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);

                    // No removal of objects and no score change for Sprite-Circle collision
                }
            }
            // Handle Bomb To Normal Object Collision
            else if ((obj1 instanceof Bomb && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof Bomb) 
            || (obj1 instanceof Bomb && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof Bomb) 
            || (obj1 instanceof Bomb && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof Bomb) 
            || (obj1 instanceof Bomb && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof Bomb)) 
            {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();
                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 2;

                    bombValue = 0;
                
                    // Update score and timer
                    if (score > 1000) {
                        score += 40;
                        if (time > 1) {
                            time -= 2;
                        }
                    } else if (score > 500) {
                        score += 30;
                        if (time > 1) {
                            time -= 1;
                        }
                    } else {
                        score += 20;
                        if (time > 1) {
                            time -= 1;
                        }
                    }

                    // Restart the timer
                    startTimer();
                    
                }
            }
            // Handle Bomb To Bone collision
            else if ((obj1 instanceof Bomb && obj2 instanceof Bone) || (obj1 instanceof Bone && obj2 instanceof Bomb)) 
            {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();
                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 2;

                    bombValue = 0;
                
                        score += 100;
                        if (time > 1) {
                            time -= 3;
                        }

                    // Restart the timer
                    startTimer();
                    
                }
            }

            // Handle Same Normal object collision
            else if ((obj1 instanceof SpriteD && obj2 instanceof SpriteD) || (obj1 instanceof SpriteT && obj2 instanceof SpriteT)
                || (obj1 instanceof SpriteM && obj2 instanceof SpriteM) || (obj1 instanceof SpriteV && obj2 instanceof SpriteV))
             {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();

                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 2;
                
                    if (bombValue < 4) {
                    bombValue += 1;
                    }
                    // Update score and timer
                    if (score > 1000) {
                        score += 20;
                        if (time > 1) {
                            time -= 2;
                        }
                    } else if (score > 500) {
                        score += 15;
                        if (time > 1) {
                            time -= 1;
                        }
                    } else {
                        score += 10;
                        if (time > 1) {
                            time -= 1;
                        }
                    }

                    // Restart the timer
                    startTimer();
                }
            }
            // Handle Avocado To Normal Object Collision (Remove Both and Create Big Object)
            else if ((obj1 instanceof Avocado && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof Avocado)
                || (obj1 instanceof Avocado && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof Avocado)
                || (obj1 instanceof Avocado && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof Avocado)
                || (obj1 instanceof Avocado && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof Avocado))
             {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();

                    // // Calculate position and size for the new object
                    let newX = (obj1.x + obj2.x) / 2;
                    let newY = (obj1.y + obj2.y) / 2;
                    let newRadius = 60;

                    // // Create new object of the same type but bigger
                    let newObj;
                    if ((obj1 instanceof Avocado && obj2 instanceof SpriteD) || (obj1 instanceof SpriteD && obj2 instanceof Avocado)) newObj = new SpriteDB(newX, newY, 0, 100, restitution, newRadius);
                    if ((obj1 instanceof Avocado && obj2 instanceof SpriteT) || (obj1 instanceof SpriteT && obj2 instanceof Avocado)) newObj = new SpriteTB(newX, newY, 0, 100, restitution, newRadius);
                    if ((obj1 instanceof Avocado && obj2 instanceof SpriteM) || (obj1 instanceof SpriteM && obj2 instanceof Avocado)) newObj = new SpriteMB(newX, newY, 0, 100, restitution, newRadius);
                    if ((obj1 instanceof Avocado && obj2 instanceof SpriteV) || (obj1 instanceof SpriteV && obj2 instanceof Avocado)) newObj = new SpriteVB(newX, newY, 0, 100, restitution, newRadius);
               
                    // // Add new object to the gameObjects array
                    gameObjects.push(newObj);

                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 1;
                
                    if (bombValue < 4) {
                    bombValue += 1;
                    }
                    // Restart the timer
                    startTimer();
                }
            }
            // Handle Same Type Normal Object To Big Object Collision
            else if ((obj1 instanceof SpriteD && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof SpriteD)
                || (obj1 instanceof SpriteM && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteMB && obj2 instanceof SpriteM)
                || (obj1 instanceof SpriteT && obj2 instanceof SpriteTB) || (obj1 instanceof SpriteTB && obj2 instanceof SpriteT)
                || (obj1 instanceof SpriteV && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof SpriteV))
                {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();

                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 2;
                
                    if (bombValue < 4) {
                    bombValue += 1;
                    }
                    // Update score and timer
                    if (score > 1000) {
                        score += 90;
                        if (time > 1) {
                            time -= 3;
                        }
                    } else if (score > 500) {
                        score += 70;
                        if (time > 1) {
                            time -= 2;
                        }
                    } else {
                        score += 50;
                        if (time > 1) {
                            time -= 2;
                        }
                    }

                    // Restart the timer
                    startTimer();
                }
            }

            // Handle Same Type Big object collision (Remove objects, spawn bomb)
            else if ((obj1 instanceof SpriteDB && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteTB && obj2 instanceof SpriteTB)
            || (obj1 instanceof SpriteMB && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteVB && obj2 instanceof SpriteVB))
             {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();
  
                    // // Calculate position and size for the new object
                    let newX = (obj1.x + obj2.x) / 2;
                    let newY = (obj1.y + obj2.y) / 2;

                    // // Create new object of the same type
                    let newObj;
                    if ((obj1 instanceof SpriteDB && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteTB && obj2 instanceof SpriteTB)
                    || (obj1 instanceof SpriteMB && obj2 instanceof SpriteMB) 
                    || (obj1 instanceof SpriteVB && obj2 instanceof SpriteVB)) newObj = new Bomb(newX, newY, 0, 100, restitution, 40);
               
                    // // Add new object to the gameObjects array
                    gameObjects.push(newObj);


                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 1;
                
                    if (bombValue < 4) {
                    bombValue += 1;
                    }
                    // Update score and timer
                    if (score > 1000) {
                        score += 200;
                        if (time > 1) {
                            time -= 4;
                        }
                    } else if (score > 500) {
                        score += 150;
                        if (time > 1) {
                            time -= 3;
                        }
                    } else {
                        score += 120;
                        if (time > 1) {
                            time -= 3;
                        }
                    }

                    // Restart the timer
                    startTimer();
                }
            }
            // Handle Bomb To Big Object
            else if ((obj1 instanceof Bomb && obj2 instanceof SpriteDB) || (obj1 instanceof SpriteDB && obj2 instanceof Bomb)
            || (obj1 instanceof Bomb && obj2 instanceof SpriteVB) || (obj1 instanceof SpriteVB && obj2 instanceof Bomb)
            || (obj1 instanceof Bomb && obj2 instanceof SpriteTB) || (obj1 instanceof SpriteTB && obj2 instanceof Bomb)
            || (obj1 instanceof Bomb && obj2 instanceof SpriteMB) || (obj1 instanceof SpriteMB && obj2 instanceof Bomb))
            {
                if (circleIntersect(obj1.x, obj1.y, obj1.radius, obj2.x, obj2.y, obj2.radius)) {
                    obj1.isColliding = true;
                    obj2.isColliding = true;
                    resolveCollision(obj1, obj2);
                    collisionSound.play();
  
                    // Remove both original objects
                    gameObjects.splice(j, 1); // Remove second object first
                    gameObjects.splice(i, 1); // Then remove the first one
                    objectCount -= 2;
                
                    if (bombValue < 4) {
                    bombValue += 1;
                    }
                    // Update score and timer
                    if (score > 1000) {
                        score += 140;
                        if (time > 1) {
                            time -= 3;
                        }
                    } else if (score > 500) {
                        score += 120;
                        if (time > 1) {
                            time -= 2;
                        }
                    } else {
                        score += 100;
                        if (time > 1) {
                            time -= 2;
                        }
                    }

                    // Restart the timer
                    startTimer();
                }
            }
        }
    }
}