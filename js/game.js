// Global game state
window.gameState = {
    currentLevel: 1,
    totalScore: 0,
    levelScores: [0, 0, 0, 0, 0],
    gameCompleted: false
};

// Game configuration
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    backgroundColor: '#2c3e50',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [
        BootScene,
        PreloaderScene,
        MainMenuScene,
        GameScene,
        GameOverScene
    ]
};

// Start the game
const game = new Phaser.Game(config);