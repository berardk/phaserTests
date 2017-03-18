const GAME_VIEW_WIDTH = 1000;
const GAME_VIEW_HEIGHT = 600;

var game = new Phaser.Game(GAME_VIEW_WIDTH, GAME_VIEW_HEIGHT, Phaser.AUTO, 'phaser');

game.state.add('Application', Application);

game.state.start('Application');