var balloon,balloonImage1,balloonImage2;
var database;
var height,position

function preload(){
   bg =loadImage("Images/cityImage.png");
   balloonImage1=loadAnimation("Images/HotAirBallon01.png");
   balloonImage2=loadAnimation("Images/HotAirBallon01.png","Images/HotAirBallon01.png",
   "Images/HotAirBallon01.png","Images/HotAirBallon02.png","Images/HotAirBallon02.png",
   "Images/HotAirBallon02.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png","Images/HotAirBallon03.png");

   database=firebase.database()
   var balloonPosition=database.ref("balloon/position")
balloonPosition.once("value",readPosition)
   
  }

//Function to set initial environment
async function setup() {

  

  createCanvas(1500,700);
  var balloonPosition=await database.ref("balloon/position")
  await balloonPosition.once("value",readPositionOnce)
 if(position!=undefined){


 
  balloon=createSprite(position.x,position.y,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
 }
  var balloonPosition=database.ref('balloon/position');

  balloonPosition.on("value",readPosition);



  textSize(20); 
}


function draw() {
  background(bg);
if(position!=undefined){
  if(keyDown(LEFT_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(-10,0)
  }
  else if(keyDown(RIGHT_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    writePosition(10,0)
  }
  else if(keyDown(UP_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale -0.005;
    writePosition(0,-10)
  }
  else if(keyDown(DOWN_ARROW)){
    
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    balloon.scale=balloon.scale+0.005;
    writePosition(0,10)
  }
}
  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}



 

 function writePosition(x,y){
   database.ref('balloon/position').set({
   'x': position.x + x ,
    'y': position.y + y
  })
 }




//CHOOSE THE CORRECT READHEIGHT FUNCTION
 function readPosition(data){
   position=data.val()
  balloon.x = position.x;
   balloon.y = position.y;
}

function readPositionOnce(data){
  position=data.val()
 
}

 