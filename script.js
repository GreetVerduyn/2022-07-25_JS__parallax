/*
function parallax(layer,distance, speed){
    const.item= document.querySelector(layer)
    item.transform ='translateX('+ -distance * speed + 'px)'

}
document.addEventListener('scroll', function(){
    parallax('.floor, parallax.scrollX, 0.5')
    parallax('.Back,parallax.scroll, -0.5')

    )
})*/

window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const CANVAS_WIDTH = canvas.width = 800;
    const CANVAS_HEIGHT = canvas.height = 700;
    let gameSpeed = 5;

    const backgroundLayer1 = new Image();   // .appendChild()      document.createElement("img);
    backgroundLayer1.src = 'img/11_background.png';
    const backgroundLayer2 = new Image();
    backgroundLayer1.src = 'img/09_distant_clouds1.png';
    const backgroundLayer3= new Image();
    backgroundLayer1.src = 'img/06_hill2.png';
    const backgroundLayer4 = new Image();
    backgroundLayer1.src = 'img/07_huge_clouds.png';
    const backgroundLayer5 = new Image();
    backgroundLayer1.src = 'img/08_clouds.png';
    const backgroundLayer6 = new Image();
    backgroundLayer1.src = 'img/ 05_hill1.png';
    const backgroundLayer7 = new Image();
    backgroundLayer1.src = 'img/ 03_distant_trees.png';
    const backgroundLayer8 = new Image();
    backgroundLayer1.src = 'img/ 03_distant_trees.png';
    const backgroundLayer9 = new Image();
    backgroundLayer1.src = 'img/ 01_ground.png';

    function animateBackGround (){
        ctx.drawImage(backgroundLayer1, 0, 0);
        requestAnimationFrame(animate);
    };
    animateBackGround();

    let enemies = [];
    let score = 0;
    let gameOver= false;

    //event listeners, listens to keys pressed down
    class InputHandler {
        constructor() {
            this.keys = [];
            window.addEventListener('keydown', e => {
                if ((e.key === 'ArrowDown' ||
                        e.key === 'ArrowUp' ||
                        e.key === 'ArrowLeft' ||
                        e.key === 'ArrowRight')
                    && this.keys.indexOf(e.key) === -1) {
                    this.keys.push(e.key);
                }
                console.log(e.key, this.keys);
            });
            window.addEventListener('keyup', e => {
                if (e.key === 'ArrowDown' ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowRight') {
                    this.keys.splice(this.keys.indexOf(e.key), 1);
                }
                console.log(e.key, this.keys);
            });
        }
    }

    class Player {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 200;
            this.height = 200;
            this.x = 0;
            this.y = this.gameHeight - this.height;
            this.image = document.getElementById('playerImage');
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }

        draw(context) {


            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        //make it possible to move the player
        update(input, enemies) {
            // collision detection
                 enemies.forEach(enemy => {
                    const dx = ((enemy.x+150 + enemy.width/2) - (this.x + this.width/2));
                    const dy = ((enemy.y+70 + enemy.height/2) - (this.y + this.height/2));
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    if(distance < enemy.width/2 + this.width/2){
                        gameOver=true;
                    }
                 })
            // controls
            if (input.keys.indexOf('ArrowRight') > -1) { // if ArrowRight is in the array of pressed keys
                this.image = document.getElementById('playerImageRun');
                this.speed = 5;                                     // move to right
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.image = document.getElementById('playerImageRun');
                this.speed = -5;                                    // move to left
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {   // player can only jump when on ground
                this.image = document.getElementById('playerImageJump');
                this.vy -= 25;                                      // jump
            } else {
                this.image = document.getElementById('playerImage');
                this.speed = 0;

            }
            //horizontal movement
            this.x += this.speed;
            if (this.x < 0) this.x = 0;
            else if (this.x > this.gameWidth - this.width) this.x = this.gameWidth - this.width // keep it in the canvas
            // vertical movement
            this.y += this.vy;
            if (!this.onGround()) {  // if player is in the air
                this.vy += this.weight;
                //this.frameY = 1;  // jumping animation
            } else {
                this.vy = 0;
                //this.frameY = 0;  // jumping animation
            }
            if (this.y >= this.gameHeight - this.height) this.y = this.gameHeight - this.height  // keep it in the canvas
        }

        onGround() {  // check of player is on ground, returns true or falls
            return this.y >= this.gameHeight - this.height
        }
    }

    class Background {
        constructor(gameWidth, gameHeight){
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('parallax');  //parallax = background image
            this.x = this.gameWidth;
            this.y = this.gameHeight - this.height;
            this.width = 1500; // 2400
            this.height = 1300;  // 720
            this.speed = 20;
        }

        draw(context) {  // decides which canvas you want to draw on
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height);  //put the img af the background 2 times so its seems like it's endless
        }

        update() {
            this.x -= this.speed;
            if (this.x < 0 - this.width) this.x = 0;   // make background come back, when completely scrolled over
        }
    }

    class Enemy {
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.width = 160;
            this.height = 119;
            this.image = document.getElementById('enemyImage');
            this.x = this.gameWidth - 100;
            this.y = this.gameHeight - this.height;
            this.speed = 8;
            this.markedForDeletion = false;

        }

        draw(context) {
           context.drawImage(this.image, this.x, this.y, this.width, this.height)
        }

        update(deltaTime) {
            this.x -= this.speed;
            if (this.x < 0 - this.width) {
                this.markedForDeletion = true;
                score++;
            }
        }
    }

          // adding,animation and removing enemies

    function handleEnemies(deltaTime) {
        if (enemyTimer > enemyInterval + randomEnemyInterval) {
            enemies.push(new Enemy(canvas.width, canvas.height));
            console.log(enemies)
            randomEnemyInterval = Math.random() * 1000 + 700;
            enemyTimer = 0;
        } else {
            enemyTimer += deltaTime;
        }
        enemies.forEach(enemy => {
            enemy.draw(ctx);
            enemy.update(deltaTime);
        });
        enemies = enemies.filter(enemy => !enemy.markedForDeletion);  //delete psooky when leaving the screen
    }

         //display scores or messages
    function displayStatusText(context) {
        context.fillStyle = 'white';
        context.front = ' 50px Helvetica';
        context.fillText('Score: ' + score, 20, 50);
        if (gameOver){
            context.textAlign = 'center';
            context.fillStyle = 'red';
            context.front = ' 50px Helvetica';
            context.fillText('GAME OVER, try again ' ,canvas.width/2, 200);
        }
    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
   // const background = new Background(canvas.width, canvas.height);

    let lastTime = 0;
    let enemyTimer = 0;
    let enemyInterval = 1000;
    let randomEnemyInterval = Math.random() * 1000 + 700;

    // update and drawing the game
    function animate(timeStamp) {
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
       // background.draw(ctx);
       // background.update();
        player.draw(ctx);
        player.update(input, enemies);
        handleEnemies(deltaTime);
        displayStatusText(ctx);

        if(!gameOver) requestAnimationFrame(animate);
    }

    animate(0);
});