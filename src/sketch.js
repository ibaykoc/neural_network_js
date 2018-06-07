function setup() {
  nn = new NeuralNetwork(2,2,1);

  let input = [1,0];

  let output = nn.feed_forward(input);
  console.log(output);

}

function draw() {
  // put drawing code here
}