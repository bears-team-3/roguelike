Game.Screen = {};

// Define our initial start screen
Game.Screen.startScreen = {
  enter: function () { console.log("Entered start screen."); },
  exit: function () { console.log("Exited start screen."); },
  render: function (display) {
    // Render our prompt to the screen
    display.drawText(1, 1, "%c{yellow}Javascript Roguelike");
    display.drawText(1, 2, "Press [Enter] to start!");
  },
  handleInput: function (inputType, inputData) {
    // When [Enter] is pressed, go to the play screen
    if (inputType === 'keydown') {
      if (inputData.keyCode === ROT.VK_RETURN) {
        Game.switchScreen(Game.Screen.playScreen);
      }
    }
  }
}

// Define our playing screen
Game.Screen.playScreen = {
  enter: function () { console.log("Entered play screen."); },
  exit: function () { console.log("Exited play screen."); },
  render: function (display) {
    Game.startGame();
  },
  handleInput: function (inputType, inputData) {
    if (inputType === 'keydown') {
      return;
    }
  }
}

// Define our winning screen
Game.Screen.winScreen = {
  enter: function () { console.log("Entered win screen."); },
  exit: function () { console.log("Exited win screen."); },
  render: function (display) {
    // Render our prompt to the screen

  },
  handleInput: function (inputType, inputData) {
    return;
  }
}

// Define our winning screen
Game.Screen.loseScreen = {
  enter: function () { console.log("Entered lose screen."); },
  exit: function () { console.log("Exited lose screen."); },
  render: function (display) {
    // Render our prompt to the screen
  },
  handleInput: function (inputType, inputData) {
    return;
  }
}