// Preloader Scene
class PreloaderScene extends Phaser.Scene {
    constructor() {
        super({ key: 'PreloaderScene' });
    }

    preload() {
        // Load player image
        this.load.image('player_image', 'assets/images/player.png');
        
        this.createShapes();
    }

    createShapes() {
        const graphics = this.add.graphics();
        
        // Player shape
        graphics.fillStyle(0x4a90e2);
        graphics.fillCircle(16, 16, 16);
        graphics.generateTexture('player', 32, 32);
        
        // Collectible shapes
        const collectibleColors = [0x87ceeb, 0x90ee90, 0xffa500, 0xdda0dd, 0xf08080];
        collectibleColors.forEach((color, index) => {
            graphics.clear();
            graphics.fillStyle(color);
            graphics.fillRect(0, 0, 20, 20);
            graphics.generateTexture(`collectible_${index + 1}`, 20, 20);
        });
        
        // Obstacle shapes
        const obstacleColors = [0xff6b6b, 0xee5a52, 0xdc3545, 0xc82333, 0xb21f2d];
        obstacleColors.forEach((color, index) => {
            graphics.clear();
            graphics.fillStyle(color);
            graphics.fillRect(0, 0, 25, 25);
            graphics.generateTexture(`obstacle_${index + 1}`, 25, 25);
        });
        
        // Power-up shapes
        graphics.clear();
        graphics.fillStyle(0xffd700);
        graphics.fillCircle(15, 15, 15);
        graphics.generateTexture('powerup', 30, 30);
        
        graphics.destroy();
    }

    create() {
        this.scene.start('MainMenuScene');
    }
}