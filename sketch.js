var dog, normalDog, happyDog, garden, washroom, database, foodS, foodStock, fedTime, lastFed, time, feed, food;
var gameState, readState, addFood;

function preload() {
  normalDog = loadImage("images/Dog.png");
  happyDog = loadImage("images/Happy.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/WashRoom.png");
  bedroom = loadImage("images/BedRoom.png");
}

function setup() {
  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  fedTime = database.ref('FeedTime');
  fedTime.on("value", function (data) {
    lastFed = data.val();
  });

  readState = database.ref('GameState');
  readState.on("value", function (data) {
  gameState = data.val();
  });

  var canvas = createCanvas(1000, 650);

  feed = createButton("Feed the dog");
  feed.position((width / 2) - 75, 85);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position((width / 2) - 65, 120);
  addFood.mousePressed(addFoods);

  food = new Food();

  dog = createSprite(width / 2, height - 100, 150, 150);
  dog.addImage(normalDog);
  dog.scale = 0.15;
}

function draw() {
  time = hour();

  if (time == (lastFed + 1)) {
    update("Playing");
    food.garden();
  }
  else if (time == (lastFed + 2)) {
    update("Sleeping");
    food.bedroom();
  }
  else if (time > (lastFed + 2) && time <= (lastFed + 4)) {
    update("Bathing");
    food.washroom();
  }
  else {
    update("Hungry")
    food.display();
  }

  if (gameState != "Hungry") {
    feed.hide();
    addFood.hide();
    dog.remove();
  }
  else {
    feed.show();
    addFood.show();
    dog.addImage(normalDog);
  }

  drawSprites();
}

function readStock(data) {
  foodS = data.val();
  food.updateFood(foodS);
}

function feedDog() {
  dog.addImage(happyDog);

  food.updateFood(food.getFood() - 1);
  database.ref('/').update({
    Food: food.getFood(),
    FeedTime: hour(),
    GameState: "not"
  })
}

function addFoods() {
  foodS++;
  database.ref('/').update({
    Food: foodS
  })
}

function update(state) {
  database.ref('/').update({
    GameState: state
  })
}