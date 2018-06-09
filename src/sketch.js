const BIRD_POPULATION = 100;

let birds = [];
let diedBirds = [];
let pipe;
let slider;
let generation = 0;
let high_score = 0;
let current_score = 0;
function setup() {
    createCanvas(400, 600);
    for (let i = 0; i < BIRD_POPULATION; i++){ 
        birds[i] = new Bird(32, height/2, 16);
    }   
    slider = createSlider (1,100,1);
    pipe = new Pipe(100, 20, height);
}

function keyPressed() {
    if (key == ' ') {
        bird.jump();
    }
}

function draw() {
    for (let i = 0; i < slider.value(); i++) {
        current_score += 1;
        high_score = Math.max(current_score, high_score);
        pipe.update();
        birds.forEach(bird => {
            bird.update();
            bird.think([bird.y, bird.velocity, pipe.x, pipe.y]);
            
            if (pipe.is_hit(bird) || bird.y > height) {
                diedBirds.push(birds.splice(birds.indexOf(bird), 1)[0]);
            }
        });

        if(birds.length <= 0) {
            nextGeneration();
            pipe.respawn();
        }        
    }    

    background(0);
    pipe.draw();
    birds.forEach(bird => {
        bird.draw();
    });
    textSize(16);
    fill(255);
    text('GENERATION: '+ generation, 10, 16);
    text('HIGH SCORE: '+ high_score, 10, 32);
    text('SCORE: '+ current_score, 10, 48);
}

function nextGeneration() {
    current_score = 0;
    generation++;
    calculateFitness();
    for (let i = 0; i < BIRD_POPULATION; i++){ 
        birds[i] = pickOne();
    }
    diedBirds = [];
}

function pickOne() {
    let index = 0;
    let r = random(1);

    while(r > 0){
        r = r - diedBirds[index].fitness;
        index++;
    }
    index--;
    let pickedOne = diedBirds[index];
    let newGen = new Bird(32, height/2, 16, pickedOne.brain.copy());
    newGen.mutate();
    return newGen;
}

function calculateFitness() {
    let sum = 0;
    diedBirds.forEach(bird => {
        sum += bird.score;
    });
    diedBirds.forEach(bird => {
        bird.fitness = bird.score / sum;
    });
}