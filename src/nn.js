function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

class NeuralNetwork {
    constructor(n_input, n_hidden, n_output) {
        this.n_input = n_input;
        this.n_hidden = n_hidden;
        this.n_output = n_output;

        this.weights_ih = new Matrix(this.n_hidden, this.n_input);
        this.weights_ho = new Matrix(this.n_output, this.n_hidden);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.n_hidden, 1);
        this.bias_o = new Matrix(this.n_output, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
    }

    feed_forward(input_arr) {
        let input = Matrix.fromArray(input_arr);
        let hidden = Matrix.multiply(this.weights_ih, input);
        hidden.add(this.bias_h);
        hidden.map(sigmoid)
        
        let output = Matrix.multiply(this.weights_ho, hidden);
        output.add(this.bias_o);

        return output.toArray();
    }

    train(input, answer) {
        
    }
}