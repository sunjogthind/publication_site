// Level Manager
class LevelManager {
    constructor() {
        this.levels = [
            {
                id: 1,
                name: 'Literature Search',
                description: 'Collect relevant research papers',
                backgroundColor: 0x87ceeb,
                targetScore: 200,
                timeLimit: 60000,
                collectibleCount: 15,
                obstacleCount: 8,
                powerupCount: 2,
                collectiblePoints: 15,
                obstacleSpeed: 50,
                powerupType: 'Focus'
            },
            {
                id: 2,
                name: 'Methodology Development',
                description: 'Gather research methods',
                backgroundColor: 0x90ee90,
                targetScore: 300,
                timeLimit: 55000,
                collectibleCount: 12,
                obstacleCount: 10,
                powerupCount: 2,
                collectiblePoints: 20,
                obstacleSpeed: 75,
                powerupType: 'Insight'
            },
            {
                id: 3,
                name: 'Data Analysis',
                description: 'Collect data points',
                backgroundColor: 0xffa500,
                targetScore: 400,
                timeLimit: 50000,
                collectibleCount: 10,
                obstacleCount: 12,
                powerupCount: 3,
                collectiblePoints: 25,
                obstacleSpeed: 100,
                powerupType: 'Clarity'
            },
            {
                id: 4,
                name: 'Peer Review',
                description: 'Collect positive feedback',
                backgroundColor: 0xdda0dd,
                targetScore: 500,
                timeLimit: 45000,
                collectibleCount: 8,
                obstacleCount: 15,
                powerupCount: 3,
                collectiblePoints: 30,
                obstacleSpeed: 125,
                powerupType: 'Determination'
            },
            {
                id: 5,
                name: 'Publication',
                description: 'Finalize publication requirements',
                backgroundColor: 0xf08080,
                targetScore: 600,
                timeLimit: 40000,
                collectibleCount: 6,
                obstacleCount: 18,
                powerupCount: 4,
                collectiblePoints: 35,
                obstacleSpeed: 150,
                powerupType: 'Celebration'
            }
        ];
    }

    getLevel(levelId) {
        return this.levels.find(level => level.id === levelId);
    }

    getTotalLevels() {
        return this.levels.length;
    }

    getNextLevel(currentLevelId) {
        const nextId = currentLevelId + 1;
        return nextId <= this.levels.length ? this.getLevel(nextId) : null;
    }
}

window.levelManager = new LevelManager();