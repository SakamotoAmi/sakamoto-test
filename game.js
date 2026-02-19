class FlowerPuyoGame {
    constructor() {
        this.grid = this.createEmptyGrid(6, 12);
        this.currentPuyos = [];
        this.score = 0;
        this.difficultyLevel = 1;
        this.controls = {
            left: 'ArrowLeft',
            right: 'ArrowRight',
            down: 'ArrowDown',
            rotate: 'ArrowUp'
        };
        this.init();
    }

    createEmptyGrid(width, height) {
        return Array.from({ length: height }, () => Array(width).fill(null));
    }

    init() {
        this.spawnPuyos();
        this.startGameLoop();
        this.bindControls();
    }

    spawnPuyos() {
        const colors = ['red', 'green', 'blue', 'yellow', 'purple'];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        this.currentPuyos = [{ x: 2, y: 0, color: randomColor }, { x: 2, y: 1, color: randomColor }];
    }

    startGameLoop() {
        setInterval(() => {
            this.update();
        }, 1000 / this.difficultyLevel);
    }

    bindControls() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case this.controls.left:
                    this.move(-1);
                    break;
                case this.controls.right:
                    this.move(1);
                    break;
                case this.controls.down:
                    this.moveDown();
                    break;
                case this.controls.rotate:
                    this.rotate();
                    break;
            }
        });
    }

    move(direction) {
        // Move the puyos in the specified direction
        this.currentPuyos.forEach(puyo => {
            puyo.x += direction;
        });
    }

    moveDown() {
        // Move puyos down
        this.currentPuyos.forEach(puyo => {
            puyo.y += 1;
        });
        if (this.checkCollision()) {
            this.currentPuyos.forEach(puyo => {
                puyo.y -= 1; // Undo move
            });
            this.mergePuyos();
            this.clearMatches();
            this.spawnPuyos();
        }
    }

    rotate() {
        // Simple rotation logic for this demo
        this.currentPuyos.forEach(puyo => {
            puyo.x = (puyo.x + 1) % 6;
        });
    }

    checkCollision() {
        // Basic collision check logic
        return this.currentPuyos.some(puyo => {
            return puyo.y >= 12 || puyo.x < 0 || puyo.x >= 6;
        });
    }

    mergePuyos() {
        // Merge the current puyos into the grid
        this.currentPuyos.forEach(puyo => {
            this.grid[puyo.y][puyo.x] = puyo.color;
        });
    }

    clearMatches() {
        // Check and clear matches in the grid
        // Basic match clearing logic (for demo purposes)
        this.grid = this.grid.filter(row => {
            return !row.every(cell => cell === null);
        });
        this.score += 10; // Increment score for matches
    }
}

const game = new FlowerPuyoGame();
