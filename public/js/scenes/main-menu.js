// Main Menu Scene
class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenuScene' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const bg = this.add.graphics();
        bg.fillGradientStyle(0x2c3e50, 0x3498db, 0x2c3e50, 0x3498db, 1);
        bg.fillRect(0, 0, width, height);

        this.add.text(width / 2, height / 4, 'Shiggus Publication Journey', {
            fontSize: '48px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.add.text(width / 2, height / 4 + 80, 'From Research to Publication', {
            fontSize: '24px',
            fill: '#ecf0f1',
            fontStyle: 'italic'
        }).setOrigin(0.5);

        const description = [
            '',
            '',
            '',
            'Navigate through 5 challenging levels representing',
            'the academic publication process:',
            '',
            '• Literature Search',
            '• Methodology Development', 
            '• Data Analysis',
            '• Peer Review',
            '• Publication'
        ];

        this.add.text(width / 2, height / 2, description.join('\n'), {
            fontSize: '16px',
            fill: '#bdc3c7',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);

        const startButton = this.add.text(width / 2, height - 120, 'START JOURNEY', {
            fontSize: '32px',
            fill: '#2ecc71',
            fontStyle: 'bold',
            stroke: '#27ae60',
            strokeThickness: 2
        }).setOrigin(0.5);

        startButton.setInteractive({ useHandCursor: true });
        
        startButton.on('pointerover', () => {
            startButton.setScale(1.1);
            startButton.setFill('#3498db');
        });
        
        startButton.on('pointerout', () => {
            startButton.setScale(1);
            startButton.setFill('#2ecc71');
        });
        
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });

        this.add.text(width / 2, height - 40, 'Use ARROW KEYS to move • Collect items • Avoid obstacles', {
            fontSize: '14px',
            fill: '#95a5a6',
            align: 'center'
        }).setOrigin(0.5);
    }
}