var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var bananaImage,obstacleImage;
var FoodGroup,obstaclesGroup;
var score=0;
var obstacle;
var gameOverImage;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage=loadImage("banana.png");
  obstacleImage=loadImage("stone.png");
  gameOverImage=loadImage("gameOver.png")


}

function setup() {
  createCanvas(800,400);
  
  

  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  FoodGroup=createGroup();
  obstaclesGroup=createGroup();
  
  
}

function draw() 
{ 
  background(0);

 

   player.velocityY = player.velocityY + 0.8;


    if(gameState===PLAY)
    {
      text("Score:"+score,100,300);
      if(FoodGroup.isTouching(player))
      {
        FoodGroup.destroyEach();
        score+=2;
        player.scale+= +0.01;
      }
      }

     if(backgr.x<100){
      backgr.x=backgr.width/1.9;
     }
      if (player.collide(ground)){
    
      if(keyDown("space") ) {
        player.velocityY = -18;
      }
    
    

    spawnFood();
    spawnObstacles();

   /// textSize(30);
    //fill(255);
    //text("Game Over",300,220); 
   // textSize(55);
    fill("black");
    text("Score:"+score,10,30);

  }

    if(obstaclesGroup.isTouching(player))
    {
     gameState=0;
     player.scale=0.01;
    }
  

 else if (gameState === END)
 {
   //stopping the ground and monkey from moving
   ground.velocityX = 0;
   player.velocityY = 0;
   backgr.velocityX=0;
  
   //setting the lifetime
   obstaclesGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  
   //stopping the groups
   obstaclesGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0);
  
   //displaying game over
    

   backgr=createSprite(250,50,800,400);
   backgr.addImage(gameOverImage);

  }


  drawSprites();
}


function spawnFood()
{
  if (frameCount %50 === 0)
  {
    var banana= createSprite(90,90,22,22); 
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.06;
    banana.velocityX=-8;


    banana.lifetime = 250;
    player.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles()
{
  if (frameCount %70 === 0)
  {
    var obstacle = createSprite(40,52,22,22); 
    obstacle.y=random(330,370);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    
    obstacle.lifetime = 250;
    obstacle.depth=player.depth+1;
    obstaclesGroup.add(obstacle);

  }
}