function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#0F0E0E');
  noStroke();
  stars = []
  density = width/2
  for (let i = 0; i < density; i++) {
    stars.push(new Star());
  }
}

function draw() {
  background('#0F0E0E');

  for (let i = 0; i < stars.length; i++) {
    stars[i].update();
    stars[i].display();
  }
}

function colorAlpha(aColor, alpha) {
  var c = color(aColor);
  return color('rgba(' +  [red(c), green(c), blue(c), alpha].join(',') + ')');
}

class Star {
  constructor() {

    this.set_location();
    this.stop_velocity();

    this.diameter_delta = random(0, 0.03);
    this.max_diameter = random(1, 5);
    this.min_diameter = random(0, this.max_diameter)
    this.diameter = this.min_diameter;
    this.alph = this.diameter/this.max_diameter;
  }

  update() {
    this.diameter += this.diameter_delta
    this.alph = this.diameter/this.max_diameter;
    if(this.diameter > this.max_diameter){
      this.diameter = this.max_diameter;
      this.diameter_delta *= -1;
    }
    if(this.diameter < this.min_diameter){
      this.diameter = this.min_diameter;
      this.diameter_delta *= -1;
    }

    if (random(0, 1) < 0.00001){
      this.set_velocity();
    }
    this.shoot();
  }

  set_location() {
    this.x = random(width);
    this.y = random(height);
  }
  set_velocity() {
    this.magnitude = random(0, 5);
    this.x_velocity = random(-1, 1);
    this.y_velocity = random(-1, 1);
  }

  stop_velocity() {
    this.magnitude = 0;
    this.x_velocity = 0;
    this.y_velocity = 0;
  }

  shoot() {
    this.x += this.x_velocity;
    this.y += this.y_velocity;

    if(this.x < 0 || this.x > width ||this.y < 0 || this.y > height){
      this.stop_velocity();
      this.set_location();
    }
  }

  display() {
    fill(colorAlpha('#FFF2F4', this.alph));
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }
}
