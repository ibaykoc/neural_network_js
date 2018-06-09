class Pipe {

    constructor(gap, size_width, size_height) {
        this.x = width + size_width;
        this.y = Math.floor(Math.random() * height) - 15;
        this.width = size_width;
        this.height = size_height;
        this.gap = gap;
        this. color = 255;
    }

    update() {
        if(this.x < -this.width) {
            this.x = width + this.width;
            this.y = Math.floor(Math.random() * height) - 15;
        }
        this.x -= 2;
    }

    draw() {
        fill(this.color);

        // Top
        rect(this.x, this.y - this.gap/2 - this.height, this.width, this.height);
        // Bottom
        rect(this.x, this.y + this.gap/2, this.width, this.height);
    }

    

    is_hit(bird) {
        // Check x in range
        if (bird.x < this.x + this.width &&
            bird.x > this.x) {
                // Check y in top range
                if(bird.y < this.y - this.gap /2 || bird.y > this.y + this.gap / 2) {
                    this.color = 100;
                    return true;
                }
        }
        this.color = 255;
        return false;
    }

    respawn() {
        this.x = width + this.width;
        this.y = Math.floor(Math.random() * height) - 15;
    }

}