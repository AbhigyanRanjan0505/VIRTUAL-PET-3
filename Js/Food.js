class Food {
  constructor() {
    this.foodStock = 0;
    this.lastFed;
    this.image = loadImage('images/FoodStock.png');
  }

  updateFood(foodStock) {
    this.foodStock = foodStock;
  }

  feedTime(lastFed) {
    this.lastFed = lastFed;
  }

  deductFood() {
    if (this.foodStock > 0) {
      this.foodStock = this.foodStock - 1;
      dog.addImage(happyDog);
    }
  }

  getFood() {
    return this.foodStock;
  }

  display() {
    background("Green");

    fill("Black");
    textSize(15);

    if (lastFed >= 12) {
      text("Last Feed : " + lastFed % 12 + " PM", (width / 2) - 100, 65);
    }
    else if (lastFed == 0) {
      text("Last Feed : 12 AM", (width / 2) - 100, 65);
    }
    else {
      text("Last Feed : " + lastFed + " AM", (width / 2) - 100, 65);
    }

    var x = 150;
    var y = 120;

    imageMode(CENTER);

    if (this.foodStock != 0) {
      for (var i = 0; i < this.foodStock; i++) {
        if (i % 10 == 0) {
          x = 150;
          y = y + 75;
        }
        image(this.image, x, y, 50, 50);
        x = x + 75;
      }
    }
  }

  bedroom() {
    background(bedroom, 550, 500);
  }

  garden() {
    background(garden, 550, 500);
  }

  washroom() {
    background(washroom, 550, 500);
  }
}