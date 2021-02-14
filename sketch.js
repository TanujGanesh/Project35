var balloon,balloonAni;
var database,position,bp;
var backgroundImg;

function preload(){
    backgroundImg = loadImage('HotAirBallon01.jpg');
    balloonAni = loadAnimation('Hot02.png','Hot03.png','Hot04.png');
}

function setup(){
    database=firebase.database();
    createCanvas(700,600);
    balloon = createSprite(250,250,50,50);
    balloon.scale=0.4;
    balloon.addAnimation('t',balloonAni);
    bp = database.ref('balloon/position')
    bp.on("value",readPosition);
}

function draw(){
    background(backgroundImg,700,600);
    fill(0);
    text("**use arrow keys to move the balloon**",20,30);
    
    if(keyDown(LEFT_ARROW)){
        changePosition(-10,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(10,0);
    }
    else if(keyDown(UP_ARROW)&& position.y>=50){
        balloon.scale=balloon.scale -0.01;
        changePosition(0,-10);
    }
    else if(keyDown(DOWN_ARROW)&& position.y<=450){
        balloon.scale=balloon.scale +0.01;
        changePosition(0,+10);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('balloon/position').set({
        'x': position.x + x,
        'y': position.y + y
      })
    
}

function readPosition(data){
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}
