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
    canvas.width = 800;
    canvas.height = 720;

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
            /* this.frameX = 0;  // picture status
             this.frameY = 0;  // picture status*/
            this.speed = 0;
            this.vy = 0;
            this.weight = 1;
        }

        draw(context) {
            context.fillStyle = 'red';
            context.fillRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }

        //make it possible to move the player
        update(input) {                                              // input = inputHandler
            if (input.keys.indexOf('ArrowRight') > -1) { // if ArrowRight is in the array of pressed keys
                this.speed = 5;                                     // move to right
            } else if (input.keys.indexOf('ArrowLeft') > -1) {
                this.speed = -5;                                    // move to left
            } else if (input.keys.indexOf('ArrowUp') > -1 && this.onGround()) {   // player can only jump when on ground
                this.vy -= 25;                                      // jump
            } else {
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
        constructor(gameWidth, gameHeight) {
            this.gameWidth = gameWidth;
            this.gameHeight = gameHeight;
            this.image = document.getElementById('parallax');  //parallax = background image
            this.x = 0;
            this.y = 0;
            this.width = 1500; // 2400
            this.height = 1300;  // 720
            this.speed = 20;
        }

        draw(context) {  // decides which canvas you want to draw on
            context.drawImage(this.image, this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);  //put the img af the background 2 times so its seems like it's endless
        }
       update(){
            this.x -= this.speed;
            if(this.x < 0 - this.width) this.x = 0;   // make background come back
        }
    }

    class Enemy {

    }

    // adding,animation and removing enemies
    function handleEnemies() {

    }

//display scores or messages
    function displayStatusText() {

    }

    const input = new InputHandler();
    const player = new Player(canvas.width, canvas.height);
    const background = new Background(canvas.width, canvas.height);


    // update and drawing the game
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        background.draw(ctx);
        background.update();
        player.draw(ctx);
        player.update(input);

        requestAnimationFrame(animate)
    }

    animate();
});