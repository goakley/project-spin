"use strict";

window.requestAnimFrame = (function(){
    return window.requestAnimationFrame    ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

/**
 * @constructor
 * @struct
 */
function Game(canvas) {
    // set the canvas size to the game size
    canvas.width = 800;
    canvas.height = 600;
    // make the game canvas selectable
    if (canvas.getAttribute('tabindex') === null || 
        canvas.getAttribute('tabindex') === undefined)
        canvas.setAttribute("tabindex", 1);
    if (canvas.getAttribute('tabIndex') === null || 
        canvas.getAttribute('tabIndex') === undefined)
        canvas.setAttribute("tabIndex", 1);
    // get the drawing context
    var ctx = canvas.getContext('2d');
    // set the score to 0
    var score = 0;
    // create an array of keys to hold key states
    var keys = new Array(256);
    // create the game's audio manager
    var audioManager = new AudioManager();
    // create the game's graphics manager
    var graphicsManager = new GraphicsManager();
    // add a listener to the canvas for keyboard input
    canvas.addEventListener("keydown", function(event) {
        if (event.preventDefault)
            event.preventDefault();
        if (event.stopPropagation)
            event.stopPropagation();
        var code = event.keyCode;
        keys[code] = true;
        if (code == 87) { // W
            audioManager.toggleLoop(0);
        }
        else if (code == 65) { // A
            audioManager.toggleLoop(1);
        }
        else if (code == 83) { // S
            audioManager.toggleLoop(2);
        }
        else if (code == 68) { // D
            audioManager.toggleLoop(3);
        }
        else if (code == 38) { // UP
            audioManager.toggleLoop(4);
        }
        else if (code == 37) { // LEFT
            audioManager.toggleLoop(5);
        }
        else if (code == 40) { // DOWN
            audioManager.toggleLoop(6);
        }
        else if (code == 39) { // RIGHT
            audioManager.toggleLoop(7);
        }
        else if (code == 32) { // SPACE
            audioManager.playScratch();
        }
        else if (code == 74) { // J
            graphicsManager.showLight(1);
        }
        else if (code == 75) { // K
            graphicsManager.showLight(2);
        }
        else if (code == 76) { // L
            graphicsManager.showLight(3);
        }
        else if (code == 186) { // ;
            graphicsManager.showLight(0);
        }
        else if (code == 85) { // U
            audioManager.playVoice(0);
        }
        else if (code == 73) { // I
            audioManager.playVoice(1);
        }
        else if (code == 79) { // O
            audioManager.playVoice(2);
        }
        else if (code == 80) { // P
            audioManager.playVoice(3);
        }
        else {
            return;
        }
        if ([65,68,83,87].indexOf(code) >= 0) {
            graphicsManager.playerPic(1);
        } else if ([37,38,39,40].indexOf(code) >= 0) {
            graphicsManager.playerPic(2);
        } else {
            graphicsManager.playerPic(4);
        }
        score -= (audioManager.quarteroffset() - 0.4) / 8;
        if (score < 0) score = 0;
        else if (score > 1) score = 1;
        graphicsManager.visualHit();
        graphicsManager.toggleKey(code);
        graphicsManager.setMeterLevel(score);
    });
    canvas.addEventListener("keyup", function(event) {
        if (event.preventDefault)
            event.preventDefault();
        if (event.stopPropagation)
            event.stopPropagation();
        keys[event.keyCode] = undefined;
    });
    // create and start the update loop for the game
    (function update(){
        requestAnimFrame(update);
        // update the gui
        graphicsManager.update(ctx,
                               audioManager.quartercompletion(),
                               audioManager.measurecompletion());
    })();
}

new Game(document.getElementById("projectspin"));
