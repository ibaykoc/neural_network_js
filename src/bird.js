class Bird {

    constructor(x, y, size, brain) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.velocity = 0;
        this.jump_power = 10;
        this.score = 0;
        this.fitness = 0;
        if (brain) {
            this.brain = brain;
        } else {
            this.brain = new NeuralNetwork([
                new Layer(4),
                new Layer(8),
                new Layer(1)
            ])
        }
    }

    think(input) {
        const act = this.brain.feed_forward(input);
        if(act.data[0][0] > 0.5) {
            this.jump();
        }
    }

    jump() {
        
        if(this.velocity > 0 && this.y > this.size) {
            this.velocity = -this.jump_power;
        }
    }

    update() {
        this.score += 1;
        this.velocity += .5;
        this.y += this.velocity;
    }

    draw() {
        fill(255, 100);
        noStroke();
        ellipse(this.x, this.y, this.size, this.size);
    }

    mutate() {
        this.brain.mutate(mutate);
    }    
}
// Mutation function to be passed into bird.brain
function mutate(x) {
    if (random(1) < 0.1) {
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
    } else {
    return x;
    }
}