let nn;

const training = [
    {
        input: [0,0],
        output: [0]
    },
    {
        input: [0,1],
        output: [1]
    },
    {
        input: [1,0],
        output: [1]
    },
    {
        input: [1,1],
        output: [0]
    },
]

function setup () {

    createCanvas(400, 400);
    nn = new NeuralNetwork([
        new Layer(2),
        new Layer(3),
        new Layer(1)
    ]);

    nn.learning_rate = 0.1;
}

function draw() {

    background(0);
    for (let i = 0; i < 1000; i++) {  
        const data = random(training);
        nn.train(data.input, data.output);
    }
    noStroke();
    const resolution = 10;
    const col = width / resolution;
    const row = height / resolution;
    for (let i = 0; i < col; i++) {
        for ( let j = 0; j < row; j++) {
            const x1 = i / col;
            const x2 = j / row;
            let input = [x1, x2];
            const y = nn.feed_forward(input).toArray();
            fill(y * 255);
            rect(i * resolution, j * resolution, resolution, resolution);
        }
    }
}