// Game Over Scene
class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }

    init(data) {
        this.success = data.success;
        this.finalLevel = data.finalLevel;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const bg = this.add.graphics();
        if (this.success) {
            bg.fillGradientStyle(0x2ecc71, 0x27ae60, 0x2ecc71, 0x27ae60, 1);
        } else {
            bg.fillGradientStyle(0xe74c3c, 0xc0392b, 0xe74c3c, 0xc0392b, 1);
        }
        bg.fillRect(0, 0, width, height);

        let title = '';
        if (this.success && this.finalLevel) {
            title = 'PUBLICATION SUCCESSFUL!';
        } else if (this.success) {
            title = 'LEVEL COMPLETE!';
        } else {
            title = 'RESEARCH SETBACK';
        }

        this.add.text(width / 2, height / 4, title, {
            fontSize: '42px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);

        this.createResults();
        this.createButtons();

        if (this.success && this.finalLevel) {
            this.createCelebrationEffect();
        }
    }

    createResults() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const currentLevel = window.gameState.currentLevel - (this.success ? 1 : 0);
        const levelData = window.levelManager.getLevel(currentLevel);

        let resultText = '';
        if (this.success && this.finalLevel) {
            resultText = [
                '',
                '',
                'Congratulations Snigdha! You have successfully navigated',
                'the entire academic publication journey and',
                'have officialy become a 1st author!',
                '',
                `Total Score: ${window.gameState.totalScore}`,
                '',
                'Level Breakdown:'
            ];
            
            for (let i = 0; i < 5; i++) {
                const level = window.levelManager.getLevel(i + 1);
                resultText.push(`${level.name}: ${window.gameState.levelScores[i]}`);
            }
        } else if (this.success) {
            resultText = [
                `${levelData.name} completed successfully!`,
                '',
                `Level Score: ${window.gameState.levelScores[currentLevel - 1]}`,
                `Total Score: ${window.gameState.totalScore}`,
                '',
                'Ready for the next challenge?'
            ];
        } else {
            resultText = [
                `${levelData.name} proved challenging this time.`,
                '',
                'Research often requires multiple attempts.',
                'Don\'t give up - persistence is key!',
                '',
                'Try again to continue your publication journey.'
            ];
        }

        this.add.text(width / 2, height / 2, resultText.join('\n'), {
            fontSize: '18px',
            fill: '#ffffff',
            align: 'center',
            lineSpacing: 8
        }).setOrigin(0.5);
    }

    createButtons() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        if (this.success && this.finalLevel) {
            const playAgainButton = this.add.text(width / 2, height - 100, 'PLAY AGAIN', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.makeButtonInteractive(playAgainButton, () => {
                this.resetGame();
                this.scene.start('MainMenuScene');
            });
        } else if (this.success) {
            const continueButton = this.add.text(width / 2 - 100, height - 100, 'CONTINUE', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.makeButtonInteractive(continueButton, () => {
                this.scene.start('GameScene');
            });

            const menuButton = this.add.text(width / 2 + 100, height - 100, 'MAIN MENU', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.makeButtonInteractive(menuButton, () => {
                this.scene.start('MainMenuScene');
            });
        } else {
            const tryAgainButton = this.add.text(width / 2 - 100, height - 100, 'TRY AGAIN', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.makeButtonInteractive(tryAgainButton, () => {
                this.scene.start('GameScene');
            });

            const menuButton = this.add.text(width / 2 + 100, height - 100, 'MAIN MENU', {
                fontSize: '24px',
                fill: '#ffffff',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 2
            }).setOrigin(0.5);

            this.makeButtonInteractive(menuButton, () => {
                this.scene.start('MainMenuScene');
            });
        }
    }

    makeButtonInteractive(button, callback) {
        button.setInteractive({ useHandCursor: true });
        
        button.on('pointerover', () => {
            button.setScale(1.1);
            button.setTint(0xffff00);
        });
        
        button.on('pointerout', () => {
            button.setScale(1);
            button.setTint(0xffffff);
        });
        
        button.on('pointerdown', callback);
    }

    createCelebrationEffect() {
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(0, this.cameras.main.width);
            const y = Phaser.Math.Between(0, this.cameras.main.height);
            
            const star = this.add.circle(x, y, 8, 0xffd700);
            
            this.tweens.add({
                targets: star,
                y: y - 200,
                alpha: 0,
                rotation: Math.PI * 2,
                duration: 3000,
                delay: i * 100,
                onComplete: () => star.destroy()
            });
        }
    }

    resetGame() {
        window.gameState.currentLevel = 1;
        window.gameState.totalScore = 0;
        window.gameState.levelScores = [0, 0, 0, 0, 0];
        window.gameState.gameCompleted = false;
    }
}