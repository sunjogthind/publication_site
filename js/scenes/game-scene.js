// Game Scene
class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    init() {
        this.currentLevel = window.gameState.currentLevel;
        this.levelData = window.levelManager.getLevel(this.currentLevel);
        this.score = 0;
        this.timeLeft = this.levelData.timeLimit;
        this.gameObjects = {
            collectibles: [],
            obstacles: [],
            powerups: []
        };
        this.isPaused = false;
        this.powerupActive = false;
        this.powerupEndTime = 0;
    }

    create() {
        this.cameras.main.setBackgroundColor(this.levelData.backgroundColor);
        this.physics.world.setBounds(0, 0, 800, 600);

        this.createPlayer();
        this.createUI();
        this.createGameObjects();
        this.createControls();
        this.startLevelTimer();
        this.showLevelIntro();
    }

    createPlayer() {
        // Create player as a sprite with the custom image
        this.player = this.add.sprite(400, 300, 'player_image');
        
        // Scale the image to a reasonable size (adjust these values as needed)
        this.player.setScale(0.15); // Scale to 15% of original size
        
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setBounce(0.3);
        this.player.body.setDrag(300);
        this.player.body.setMaxVelocity(200);
        
        // Update the hitbox size to match the scaled image
        const width = this.player.displayWidth;
        const height = this.player.displayHeight;
        this.player.body.setSize(width, height);
        this.player.body.setOffset(0, 0);
    }

    createUI() {
        this.scoreText = this.add.text(20, 20, `Score: ${this.score}`, {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.timeText = this.add.text(20, 50, `Time: ${Math.ceil(this.timeLeft / 1000)}s`, {
            fontSize: '20px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 3
        });

        this.levelText = this.add.text(20, 80, `Level ${this.currentLevel}: ${this.levelData.name}`, {
            fontSize: '18px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        this.targetText = this.add.text(600, 20, `Target: ${this.levelData.targetScore}`, {
            fontSize: '18px',
            fill: '#ffffff',
            stroke: '#000000',
            strokeThickness: 2
        });

        this.powerupText = this.add.text(600, 50, '', {
            fontSize: '16px',
            fill: '#ffff00',
            stroke: '#000000',
            strokeThickness: 2
        });
        
        // Add skip button
        const skipButton = this.add.text(700, 80, 'SKIP LEVEL', {
            fontSize: '16px',
            fill: '#ffffff',
            backgroundColor: '#ff6b6b',
            padding: { x: 10, y: 5 }
        });
        
        skipButton.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        skipButton.on('pointerover', () => {
            skipButton.setStyle({ fill: '#ffff00' });
        });
        
        skipButton.on('pointerout', () => {
            skipButton.setStyle({ fill: '#ffffff' });
        });
        
        // Add click handler
        skipButton.on('pointerdown', () => {
            this.levelComplete();
        });
    }

    createGameObjects() {
        for (let i = 0; i < this.levelData.collectibleCount; i++) {
            this.createCollectible();
        }

        for (let i = 0; i < this.levelData.obstacleCount; i++) {
            this.createObstacle();
        }

        for (let i = 0; i < this.levelData.powerupCount; i++) {
            this.createPowerup();
        }
    }

    createCollectible() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        
        const collectible = this.add.graphics();
        collectible.fillStyle(0xffffff);
        collectible.lineStyle(2, this.levelData.backgroundColor);
        collectible.fillRect(-10, -10, 20, 20);
        collectible.strokeRect(-10, -10, 20, 20);
        collectible.x = x;
        collectible.y = y;
        
        this.physics.add.existing(collectible);
        collectible.body.setVelocity(
            Phaser.Math.Between(-50, 50),
            Phaser.Math.Between(-50, 50)
        );
        collectible.body.setBounce(1);
        collectible.body.setCollideWorldBounds(true);
        collectible.body.setSize(20, 20);
        collectible.body.setOffset(-10, -10);
        
        this.physics.add.overlap(this.player, collectible, this.collectItem, null, this);
        
        this.gameObjects.collectibles.push(collectible);
    }

    createObstacle() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        
        const obstacle = this.add.graphics();
        obstacle.fillStyle(0xff6b6b);
        obstacle.lineStyle(2, 0xff0000);
        obstacle.fillRect(-12.5, -12.5, 25, 25);
        obstacle.strokeRect(-12.5, -12.5, 25, 25);
        obstacle.x = x;
        obstacle.y = y;
        
        this.physics.add.existing(obstacle);
        obstacle.body.setVelocity(
            Phaser.Math.Between(-this.levelData.obstacleSpeed, this.levelData.obstacleSpeed),
            Phaser.Math.Between(-this.levelData.obstacleSpeed, this.levelData.obstacleSpeed)
        );
        obstacle.body.setBounce(1);
        obstacle.body.setCollideWorldBounds(true);
        obstacle.body.setSize(25, 25);
        obstacle.body.setOffset(-12.5, -12.5);
        
        this.physics.add.overlap(this.player, obstacle, this.hitObstacle, null, this);
        
        this.gameObjects.obstacles.push(obstacle);
    }

    createPowerup() {
        const x = Phaser.Math.Between(50, 750);
        const y = Phaser.Math.Between(50, 550);
        
        const powerup = this.add.graphics();
        powerup.fillStyle(0xffd700);
        powerup.lineStyle(2, 0xffa500);
        powerup.fillCircle(0, 0, 15);
        powerup.strokeCircle(0, 0, 15);
        powerup.x = x;
        powerup.y = y;
        
        this.physics.add.existing(powerup);
        powerup.body.setVelocity(
            Phaser.Math.Between(-30, 30),
            Phaser.Math.Between(-30, 30)
        );
        powerup.body.setBounce(1);
        powerup.body.setCollideWorldBounds(true);
        powerup.body.setSize(30, 30);
        powerup.body.setOffset(-15, -15);
        
        this.tweens.add({
            targets: powerup,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 1000,
            yoyo: true,
            repeat: -1
        });
        
        this.physics.add.overlap(this.player, powerup, this.collectPowerup, null, this);
        
        this.gameObjects.powerups.push(powerup);
    }

    createControls() {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    startLevelTimer() {
        this.levelTimer = this.time.addEvent({
            delay: 100,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    showLevelIntro() {
        this.isPaused = true;
        
        const overlay = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.8);
        
        const title = this.add.text(400, 250, this.levelData.name, {
            fontSize: '36px',
            fill: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);
        
        const description = this.add.text(400, 300, this.levelData.description, {
            fontSize: '20px',
            fill: '#cccccc'
        }).setOrigin(0.5);
        
        const instruction = this.add.text(400, 350, 'Press SPACE to start', {
            fontSize: '18px',
            fill: '#ffff00'
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: instruction,
            alpha: 0,
            duration: 500,
            yoyo: true,
            repeat: -1
        });
        
        const spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        spaceKey.once('down', () => {
            overlay.destroy();
            title.destroy();
            description.destroy();
            instruction.destroy();
            this.isPaused = false;
        });
    }

    update() {
        if (this.isPaused) return;

        this.updatePlayerMovement();
        this.updatePowerupStatus();

        if (this.score >= this.levelData.targetScore) {
            this.levelComplete();
        }
    }

    updatePlayerMovement() {
        const acceleration = 300;
        
        if (this.cursors.left.isDown) {
            this.player.body.setAccelerationX(-acceleration);
        } else if (this.cursors.right.isDown) {
            this.player.body.setAccelerationX(acceleration);
        } else {
            this.player.body.setAccelerationX(0);
        }
        
        if (this.cursors.up.isDown) {
            this.player.body.setAccelerationY(-acceleration);
        } else if (this.cursors.down.isDown) {
            this.player.body.setAccelerationY(acceleration);
        } else {
            this.player.body.setAccelerationY(0);
        }
    }

    updateTimer() {
        if (this.isPaused) return;
        
        this.timeLeft -= 100;
        this.timeText.setText(`Time: ${Math.ceil(this.timeLeft / 1000)}s`);
        
        if (this.timeLeft <= 0) {
            this.gameOver();
        }
    }

    updatePowerupStatus() {
        if (this.powerupActive && this.time.now > this.powerupEndTime) {
            this.powerupActive = false;
            this.powerupText.setText('');
            this.resetPlayerColor();
        }
    }

    resetPlayerColor() {
        // For sprites, we just reset the tint
        this.player.clearTint();
    }

    setPlayerColor(color) {
        // For sprites, we apply a tint instead of redrawing
        this.player.setTint(color);
    }

    collectItem(player, collectible) {
        collectible.destroy();
        const index = this.gameObjects.collectibles.indexOf(collectible);
        if (index > -1) {
            this.gameObjects.collectibles.splice(index, 1);
        }
        
        const points = this.powerupActive ? this.levelData.collectiblePoints * 2 : this.levelData.collectiblePoints;
        this.score += points;
        this.scoreText.setText(`Score: ${this.score}`);
        
        this.createCollectible();
        this.showScorePopup(collectible.x, collectible.y, `+${points}`);
    }

    hitObstacle(player, obstacle) {
        // Temporarily disabled negative points
        // const penalty = Math.min(this.score, 20);
        // this.score -= penalty;
        // this.scoreText.setText(`Score: ${this.score}`);
        // this.showScorePopup(obstacle.x, obstacle.y, `-${penalty}`, 0xff0000);
        
        // Just show a visual feedback with no score penalty
        this.showScorePopup(obstacle.x, obstacle.y, `BUMP!`, 0xff0000);
        
        this.setPlayerColor(0xff0000);
        this.time.delayedCall(200, () => {
            if (!this.powerupActive) {
                this.resetPlayerColor();
            } else {
                this.setPlayerColor(0xffd700);
            }
        });
    }

    collectPowerup(player, powerup) {
        powerup.destroy();
        const index = this.gameObjects.powerups.indexOf(powerup);
        if (index > -1) {
            this.gameObjects.powerups.splice(index, 1);
        }
        
        this.powerupActive = true;
        this.powerupEndTime = this.time.now + 5000;
        this.powerupText.setText(`${this.levelData.powerupType} Active!`);
        
        this.setPlayerColor(0xffd700);
        this.showScorePopup(powerup.x, powerup.y, this.levelData.powerupType, 0xffd700);
        
        this.time.delayedCall(10000, () => {
            this.createPowerup();
        });
    }

    showScorePopup(x, y, text, color = 0xffffff) {
        const popup = this.add.text(x, y, text, {
            fontSize: '16px',
            fill: `#${color.toString(16).padStart(6, '0')}`,
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        this.tweens.add({
            targets: popup,
            y: y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => popup.destroy()
        });
    }

    levelComplete() {
        window.gameState.levelScores[this.currentLevel - 1] = this.score;
        window.gameState.totalScore += this.score;
        
        if (this.currentLevel >= window.levelManager.getTotalLevels()) {
            window.gameState.gameCompleted = true;
            this.scene.start('GameOverScene', { success: true, finalLevel: true });
        } else {
            window.gameState.currentLevel++;
            this.scene.start('GameOverScene', { success: true, finalLevel: false });
        }
    }

    gameOver() {
        this.scene.start('GameOverScene', { success: false, finalLevel: false });
    }
}