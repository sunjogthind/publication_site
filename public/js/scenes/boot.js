// Boot Scene
class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        this.load.on('progress', (progress) => {
            this.updateLoadingBar(progress);
        });
        this.createLoadingBar();
    }

    createLoadingBar() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.loadingBarBg = this.add.graphics();
        this.loadingBarBg.fillStyle(0x333333);
        this.loadingBarBg.fillRect(width / 2 - 150, height / 2 - 10, 300, 20);

        this.loadingBar = this.add.graphics();

        this.loadingText = this.add.text(width / 2, height / 2 - 50, 'Loading...', {
            fontSize: '20px',
            fill: '#ffffff'
        }).setOrigin(0.5);
    }

    updateLoadingBar(progress) {
        this.loadingBar.clear();
        this.loadingBar.fillStyle(0x00ff00);
        this.loadingBar.fillRect(
            this.cameras.main.width / 2 - 150,
            this.cameras.main.height / 2 - 10,
            300 * progress,
            20
        );
    }

    create() {
        this.scene.start('PreloaderScene');
    }
}