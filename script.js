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

    //event listeners, listens to keys pressed down
    class InputHandler {
        constructor(){
            this.keys = [];
            window.addEventListener('keydown', function(e){
                console.log(e);

            });
        }


    }

    class Player {

    }

    class Background {

    }

    class Enemy {

    }

    // adding,animation and removing enemies
    function handleEnemies() {

    }

//display scores or messages
    function displayStatusText() {

    }

    const input= new InputHandler();

    // update and drawing the game
    function animate() {

    }

});