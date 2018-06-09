class NeuralNetwork {

    constructor(input_nodes, hidden_nodes, output_nodes) {
        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        // Create weights
        this.weight_ih = new Matrix(this.hidden_nodes, this.input_nodes);
        this.weight_ho = new Matrix(this.output_nodes, this.hidden_nodes);
        this.weight_ih.randomize();
        this.weight_ho.randomize();

        // Create biases
        this.bias_h = new Matrix(hidden_nodes, 1);
        this.bias_o = new Matrix(output_nodes, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    predict(input_array) {
        // Generating hidden output
        let input = Matrix.fromArray(input_array);
        input.print();
        let hidden = Matrix.multiply(this.weight_ih, input);
        this.weight_ih.print();
        hidden.print()
        hidden.add(this.bias_h);
        this.bias_h.print()
        hidden.print();
    }
}