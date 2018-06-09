let training_data = [
  {
    input: [0,1],
    target: [1]
  },
  {
    input: [1,0],
    target: [1]
  },
  {
    input: [0,0],
    target: [0]
  },
  {
    input: [1,1],
    target: [0]
  }
]

function setup() {
  nn = new NeuralNetwork([
    new Layer(2),
    new Layer(3),
    new Layer(1)
  ]);
  nn.weights[0].print()
  nn.biases[0].print();

  for (let i = 0; i < 50000; i++) {  
    const data = random(training_data);
    nn.train(data.input, data.target);
  }

  nn.weights[0].print()
  nn.biases[0].print();


  nn.feed_forward([1,0]).print();
  nn.feed_forward([0,1]).print();
  nn.feed_forward([0,0]).print();
  nn.feed_forward([1,1]).print();
  
  // Print error
  nn.layers[nn.layers.length - 1].errors.print();

}

function draw() {
  // put drawing code here
}