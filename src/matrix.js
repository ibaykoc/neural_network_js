class Matrix {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.data = []

        for (let r = 0; r < row; r++) {
            this.data[r] = []
            for (let c = 0; c < col; c++) {
                this.data[r][c] = 0
            }
        }
    }

    static fromArray(arr){
        let m = new Matrix(arr.length, 1);
        for (let r = 0; r < m.row; r++) {
            m.data[r][0] =  arr[r];
        }
        return m;
    }

    toArray() {
        let arr = []
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                arr.push(this.data[r][c]);
            }
        }
        return arr;
    }

    static multiply(a,b) {
        if(b instanceof Matrix) {
            if(a.col != b.row) {
                console.error("column and row not matched");
                return undefined
            }
            // Matrix product
            
            let result = new Matrix(a.row, b.col);
            for (let r = 0; r < result.row; r++) {
                for (let c = 0; c < result.col; c++) {
                    for (let ar = 0; ar < a.col; ar++) {
                        result.data[r][c] += a.data[r][ar] * b.data[ar][c];
                    }
                }
            }
            return result;
        } else {
            let result = new Matrix(a.row, a.col);
            for (let r = 0; r < a.row; r++) {
                for (let c = 0; c < a.col; c++) {
                    // Scalar product
                    result.data[r][c] *= b;
                }
            }
            return result;
        }
    }

    static transpose(matrix) {
        let result = new Matrix(this.col, this.row);
        for (let r = 0; r < result.row; r++) {
            for (let c = 0; c < result.col; c++) {
                // Scalar product
                result.data[r][c] = matrix.data[c][r];
            }
        }
        return result;
    }

    add(n) {
        if(n instanceof Matrix) {
            for (let r = 0; r < this.row; r++) {
                for (let c = 0; c < this.col; c++) {
                    this.data[r][c] += n.data[r][c];
                }
            }
        } else {
            for (let r = 0; r < this.row; r++) {
                for (let c = 0; c < this.col; c++) {
                    this.data[r][c] += n;
                }
            }
        }
    }

    randomize() {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                this.data[r][c] =  Math.random() * 2 - 1;
            }
        }
    }

    print() {
        console.table(this.data);
    }

    map (fn) {
        for (let r = 0; r < this.row; r++) {
            for (let c = 0; c < this.col; c++) {
                let val = this.data[r][c];
                this.data[r][c] =  fn(r, c, val);
            }
        }
    }
}