function sigmoid(x) {
    return 1/(1 + Math.exp(-x));
}

function dsigmoid(x) {
    return x * (1 - x);
}

class NeuralNetwork {
    constructor(layers) {
        // Initialize layers
        this.layers = layers;

        // Initialize weights
        this.weights = [];

        // Initialize biases
        this.biases = [];

        // Initialize learning rate 
        this.learning_rate = 0.1;

        for (let i = 1; i < layers.length; i++) {
            const a = layers[i-1];
            const b = layers[i];

            // Create weights between each layer and randomize value
            let layer_weight = new Matrix(b.nodes.row, a.nodes.row);
            layer_weight.randomize();
            this.weights.push(layer_weight);
            
            // Create bias foreach layer(ex input) and randomize value
            let bias = new Matrix(b.nodes.row, 1);
            bias.randomize();
            this.biases.push(bias);
        }
    }

    // Feed forward
    feed_forward (input_arr) {
        // Assign the input_arr to first layer nodes value
        for (let i = 0; i < this.layers[0].nodes.row; i++) {
            this.layers[0].nodes.data[i][0] = input_arr[i];
        }

        // Calculate all layers nodes value
        // Starting from the second layer or the 1 index layer
        for (let i = 1; i < this.layers.length; i++) {
            const current_layer = this.layers[i];
            const before_layer_nodes = this.layers[i-1].nodes;
            const current_weights = this.weights[i-1];
            const current_bias = this.biases[i-1]
            current_layer.nodes = Matrix.multiply(current_weights, before_layer_nodes);
            current_layer.nodes.add(current_bias);
            current_layer.nodes.map(sigmoid);
        }

        return this.layers[this.layers.length-1].nodes;
    }

    train (input_arr, target_arr) {
        if(target_arr.length < this.layers[this.layers.length-1].nodes.row){
            console.error("[NeuralNetwork.train]: target_arr length("+ target_arr.length +") and output layer row("+ this.layers[this.layers.length-1].nodes.row +") not matched");
            return undefined
        }

        // Convert target to Matrix
        let target = Matrix.fromArray(target_arr);

        // Get guess
        this.feed_forward(input_arr);

        // Calculate and add output error
        const output_err = Matrix.substract(target, this.layers[this.layers.length-1].nodes);
        this.layers[this.layers.length-1].errors = output_err;

        // Calculate the rest errors ( from last to first )
        for (let i = this.layers.length-1; i > 1 ; i--) {
            const b_error = this.layers[i].errors;
            const weight_ab_T = Matrix.transpose(this.weights[i-1])
            const a_error = Matrix.multiply(weight_ab_T, b_error);
            this.layers[i-1].errors = a_error;
        }

        // Adjust all the weights and bias
        for (let i = this.layers.length-1; i > 0; i--) {
            const b_error = this.layers[i].errors;
            const b_nodes = this.layers[i].nodes;
            
            // Calculate gradient
            const b_gradient = Matrix.map(b_nodes, dsigmoid);
            b_gradient.multiply_element(b_error);
            b_gradient.multiply_element(this.learning_rate);
            
            // Calculate delta
            const aT = Matrix.transpose(this.layers[i-1].nodes);
            const w_ab_delta = Matrix.multiply(b_gradient, aT);

            // Adjust weights and bias
            this.weights[i-1].add(w_ab_delta);
            this.biases[i-1].add(b_gradient);
        }
        // errors[1].print();
    }

    copy () {
        let layersCopy = []
        for (let index = 0; index < this.layers.length; index++) {
            layersCopy.push(new Layer(this.layers[index].nodes.row))
        }
        let r = new NeuralNetwork(layersCopy);
        for (let index = 0; index < this.weights.length; index++) {
            r.weights[index] = this.weights[index].copy();   
        }
        for (let index = 0; index < this.biases.length; index++) {
            r.biases[index] = this.biases[index].copy();   
        }
        r.learning_rate = this.learning_rate;
        return r;
    }

    mutate(func) {
        this.weights.forEach(w => {
            w.map(func);
        });
        this.biases.forEach(b => {
            b.map(func);
        });
    }
}

class Layer {
    constructor(number_of_node) {
        this.nodes = new Matrix(number_of_node, 1);
        this.errors = new Matrix(number_of_node, 1);
    }
}