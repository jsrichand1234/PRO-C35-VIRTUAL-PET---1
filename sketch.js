
var dog, dogImg, happyDogImg, database, foodS, foodStock;
function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/happydogImg.png");
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,60);
  dog.addImage(dogImg);
  dog.scale = 0.2;
}


function draw() {  
  background("lime");
  if(foodS!== undefined){
    textSize(20);    
    fill("black");    
    text("Note: Press SPACE to feed DRAGO milk", 50,50);
    fill("black"); 
    textSize("25");
    text("Food Remaining: "+foodS, 150,150);

    if(keyWentDown("space")){
      writeStock(foodS);
      dog.addImage(happyDogImg);
    }

    if(keyWentUp("space")){
      dog.addImage(dogImg);
    }
  

    if(foodS === 0){
      foodS = 20;
    }


    drawSprites();
  }
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}

