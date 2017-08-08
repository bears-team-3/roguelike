// width and height
ROT.DEFAULT_HEIGHT = 25;
ROT.DEFAULT_WIDTH = 36;

let Game = {
    display: null,
    _currentScreen: null,
    engine: null,

    init: function () {
        // create display with rot defaults
        this.display = new ROT.Display();

        let game = this;
        var bindEventToScreen = function (event) {
            window.addEventListener(event, function (e) {
                if (game._currentScreen !== null) {
                    game._currentScreen.handleInput(event, e);
                }
            })
        }
        // Bind keyboard input events
        bindEventToScreen('keydown');
    },
    getDisplay: function () {
        return this.display;
    },
    switchScreen: function (screen) {
        // If we had a screen before, notify it that we exited
        if (this._currentScreen !== null) {
            this._currentScreen.exit();
        }
        // Clear the display
        this.getDisplay().clear();
        // Update our current screen, notify it we entered
        // and then render it
        this._currentScreen = screen;
        if (!this._currentScreen !== null) {
            this._currentScreen.enter();
            this._currentScreen.render(this.display);
        }
    },
    startGame: function () {
        // call map generation function
        this.generateMap();

        // create scheduler and add beings to it
        let scheduler = new ROT.Scheduler.Simple();
        scheduler.add(this.player, true);
        scheduler.add(this.enemy, true);

        // start the engine with the scheduler
        this.engine = new ROT.Engine(scheduler);
        this.engine.start();
    }
};

window.onload = function () {
    // Check if rot.js can work on this browser
    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
    } else {
        // Initialize the game
        Game.init();
        // Add the container to our HTML page
        document.getElementsByClassName("game-container")[0].appendChild(Game.getDisplay().getContainer());
        // Load the start screen
        Game.switchScreen(Game.Screen.startScreen);
    }
}