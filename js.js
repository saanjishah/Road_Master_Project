/**
 * Created by shah1932 on 4/5/2018.
 */
//JAVASCRIPT
var a;
var redCar = new Image();
redCar.src = "resources/overhead_red_car.png";
var greenCar = new Image();
greenCar.src = "resources/green_overhead_car.png";
var yellowCar = new Image();
yellowCar.src = "resources/yellow_overhead_car.png";
var bush = new Image();
bush.src = "resources/Bushes.png";
var crate = new Image();
crate.src = "resources/crate.png";
var heart = new Image();
heart.src = "resources/heart.png";
var freezer = new Image();
freezer.src = "resources/snowflake.png";
var score=0;//This variable keeps track of the score
var topC=1;//This variable is a common variable used to control the speed of the crates
var topB=1;//This variable is a common variable used to control the speed of the bushes
crates1=[];//This array contains all of the crates in the first lane
crates2=[];//This array contains all of the crates in the second lane
crates3=[];//This array contains all of the crates in the third lane
bushes=[];//This array contains all of the bushes
hearts=[];//This array contains all of the hearts that you can use
lanes=[];//This array is used to make sure that three of the crates do not line up and make the game impossible
heartPick=[];
var easy= false;//Level
var medium=false;//Level
var hard = false;//Level
var pause = false;//Pause
var loc="";//This variable is used to determine which lane the freeze will show up in
function initialize() {//This function is used to store the pictures that are being used in an  array as a group
    document.getElementById("reset").disabled = true;
    var ctx = document.getElementById("myCanvas").getContext("2d");
    //starting screen display
    ctx.fillStyle="#99ccff";	//sets the fill color (black)
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("1. Choose a car",115,170);
    ctx.fillText(" ",125,185);
    ctx.fillText("2. Choose a level",115,200);
    ctx.fillText(" ",125,215);
    ctx.fillText("3. Click Start to Begin",75,230);
    //adding crates to an array
    crates1.push(createImage("resources/crate.png", "crate1",150,500));
    crate1 = createImage("resources/crate.png", "crate1",150,0);

    crates2.push(createImage("resources/crate.png", "crate2",220,-800));
    crate2 = createImage("resources/crate.png", "crate2",220,500);

    crates3.push(createImage("resources/crate.png", "crate3",310,300));
    crate3 = createImage("resources/crate.png", "crate3",300,100);

    //adding bushes to an array
    bushes.push(createImage("resources/Bushes.png", "bush1",400,10));
    bush1 = createImage("resources/Bushes.png", "bush1",400,10);

    bushes.push(createImage("resources/Bushes.png", "bush2",10,50));
    bush2 = createImage("resources/Bushes.png", "bush2",10,50);

    bushes.push(createImage("resources/Bushes.png", "bush3",390,100));
    bush3 = createImage("resources/Bushes.png", "bush3",390,100);

    bushes.push(createImage("resources/Bushes.png", "bush4",10,200));
    bush4 = createImage("resources/Bushes.png", "bush4",10,200);


}
function instructions(){//This function is called when a person doesn't know how to play and clicks on the "how to play" button
    var ctx = document.getElementById("myCanvas").getContext("2d");
    document.getElementById("pause").disabled = true;
    ctx.fillStyle="#99ccff";	//sets the fill color (black)
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    ctx.font = "30px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("HOW TO PLAY:",100,100);
    ctx.font = "20px Arial";
    ctx.fillText("Objective: Drive the car to avoid the crates that",35,150);
    ctx.fillText("are coming on the road",50,175);
    ctx.fillText("Controls: Use the A and D keys to drive the car",35,250);
    ctx.fillText("right and left",50,275);
    ctx.fillText("Lives: Everytime you drive into the grass",35,350);
    ctx.fillText("you lose a life",50,375);
    ctx.fillText("Losing: If you crash into a crate you lose a heart",35,450);

}
var red = false;
var green = false;
var yellow = false;
function carRed() {
    red=true;
    document.getElementById("green").disabled = true;
    document.getElementById("yellow").disabled = true;
}
function carGreen() {
    green = true;
    document.getElementById("red").disabled = true;
    document.getElementById("yellow").disabled = true;
}
function carYellow() {
    yellow = true;
    document.getElementById("red").disabled = true;
    document.getElementById("green").disabled = true;
}

function easyL(){
    easy=true;
    document.getElementById("medium").disabled = true;
    document.getElementById("hard").disabled = true;
}
function mediumL(){
    medium=true;
    topC=2;
    topB=2;
    crates1.push(createImage("resources/crate.png", "crate4",150,100));
    crate4 = createImage("resources/crate.png", "crate4",150,200);

    crates2.push(createImage("resources/crate.png", "crate5",220,210));
    crate5 = createImage("resources/crate.png", "crate5",220,-100);

    document.getElementById("easy").disabled = true;
    document.getElementById("hard").disabled = true;

}
function hardL() {
    hard = true;
    topC=2.5;
    topB=2.5;
    crates1.push(createImage("resources/crate.png", "crate7", 120, 750));
    crate7 = createImage("resources/crate.png", "crate7", 150, 500);
    crates2.push(createImage("resources/crate.png", "crate8", 220, 800));
    crate8 = createImage("resources/crate.png", "crate8", 220, -300);

    document.getElementById("easy").disabled = true;
    document.getElementById("medium").disabled = true;
}
var cCheck=false;
var lCheck=false;
function check(){
    if(red==true || green == true || yellow == true){
        cCheck=true;
    }
    else{
        alert("Choose a car");
    }
    if(easy==true || medium == true || hard == true){
        lCheck=true;
    }
    else{
        alert("Choose a Level");
    }
    if(cCheck==true && lCheck==true){
        startAnimation();
    }
}
function Cheat() {
    alert("Snowflake Location: "+loc+"");
}
function startAnimation(){//This function runs when a person clicks start and the game begins
    var ctx = document.getElementById("myCanvas").getContext("2d");
    document.getElementById("red").disabled = true;
    document.getElementById("green").disabled = true;
    document.getElementById("yellow").disabled = true;
    document.getElementById("easy").disabled = true;
    document.getElementById("medium").disabled = true;
    document.getElementById("hard").disabled = true;
    document.getElementById("pause").disabled = false;

    if (red==true){
        car = createImage("resources/overhead_red_car.png", "car",225,390);
        ctx.drawImage(car,car.left,car.top,225,390);
    }
    if (green==true){
        car = createImage("resources/green_overhead_car.png", "car",225,390);
        ctx.drawImage(car,car.left,car.top,225,390);
    }
    if (yellow==true){
        car = createImage("resources/yellow_overhead_car.png", "car",225,390);
        ctx.drawImage(car,car.left,car.top,225,390);
    }

    road = createImage("resources/triangle.png", "road",-51,-200);
    ctx.drawImage(road,road.left,road.top,-51,-200);

    loc = Math.floor(Math.random() * 3)+1;//This random number determines what lane the snowflack will appear in
    if(loc==1){
        freeze = createImage("resources/snowflake.png", "freeze",105,410);
        ctx.drawImage(freeze,freeze.left,freeze.top,105,410);
    }
    else if(loc==2){
        freeze = createImage("resources/snowflake.png", "freeze",225,410);
        ctx.drawImage(freeze,freeze.left,freeze.top,225,410);
    }
    else if(loc==3){
        freeze = createImage("resources/snowflake.png", "freeze",345,410);
        ctx.drawImage(freeze,freeze.left,freeze.top,345,410);
    }

    hearts.push(createImage("resources/heart.png", "heart1",5,505));
    heart1 = createImage("resources/crate.png", "heart1",5,505);

    hearts.push(createImage("resources/heart.png", "heart2",21,505));
    heart2 = createImage("resources/crate.png", "heart2",15,515);

    hearts.push(createImage("resources/heart.png", "heart3",37,505));
    heart3 = createImage("resources/crate.png", "heart3",25,525);

    animate();//calling the function animate will call the rest of the functions
}
function animate(){
    a=requestAnimationFrame(animate);//The animation of the game begins
    //The order of the functions allow the canvas to show up in the right order
    drawBackground();
    drawBush();
    drawCar();
    drawFreeze();
    checkLanes();
    drawTab();
    drawHeart();
    collision();
}
function drawBackground(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
//The background of the game is green to simulate the grass
    ctx.fillStyle="#00b300";	//sets the fill color (black)
    ctx.fillRect(0,0,window.innerWidth,window.innerHeight);
    drawRoad();
    drawRoadLine();
}

function drawRoad(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    //I used a pictre of a triangle to simulate the road
    ctx.drawImage(road,road.left,road.top,600,800);
}
function drawRoadLine(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    //The road lines are differentiating the lanes on the road
    count1=0;
    x1=160;
    y1=500;
    y2=500;
    x2=340;
    while (count1<15){
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x1,y1,10,20);
        count1+=1;
        x1+=6;
        y1-=50;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(x2,y2,10,20);
        x2-=6;
        y2-=50;
    }

}

function drawBush(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if(score==5000){
        topB=topB+1;
    }
    for(i=0;i<bushes.length;i++) {//Using a for loop allows each entry in an array to show up
        ctx.drawImage(bushes[i], bushes[i].left, bushes[i].top, 60, 30);
        if(i% 2==0){
            bushes[i].top += topB;
            bushes[i].left+=0.25;
            while (bushes[i].top>450){
                bushes[i].left=400;
                bushes[i].top=-10;
            }
        }else{
            bushes[i].top += topB;
            bushes[i].left-=0.2;
            while(bushes[i].top>450){
                bushes[i].left=20;
                bushes[i].top=-10;
            }
        }

    }
}
function drawFreeze(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if(score>7000 && score<9000){
        ctx.drawImage(freeze,freeze.left,freeze.top,50,50);
    }
}
function drawCar(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.drawImage(car,car.left,car.top,50,100);
}
$(document).keydown(function(event){  //jQuery code to recognize a keydown event
    var keycode = (event.keyCode ? event.keyCode : event.which);
    //alert("frog");
    if(keycode == 68)
    {
        //right(d)
        car.left+= 160;
        // document.getElementById('disp').innerHTML = "Car- ("+car.left+","+car.top+")";

    }
    if(keycode == 65)
    {
        //left(a)
        car.left-=160;
        // document.getElementById('disp').innerHTML = "Car- ("+car.left+","+car.top+")";

    }//all key numbers can be found on the internet
});
// alert("working");
function checkLanes(){
    if (easy==true){
        lanes=[false,false,false];//There is three"falses" because there are three crates
    }
    else if(medium==true){
        lanes=[false,false,false,false,false]
    }
    else if(hard==true){
        lanes=[false,false,false,false,false,false,false,false]
    }
    drawCrate();
}

function drawCrate(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    //These variables will keep track of the crates in that lane
    var first = "";
    var mid="";
    var last= "";
    if (easy==true){
        if(lanes[0]==false ){
            first=false;
        }
        if(lanes[1]==false ){
            mid=false;
        }
        if(lanes[2]==false ){
            last=false;
        }
    }
    else if(medium==true){
        if(lanes[0]==false || lanes[1]==false){
            first=false;
        }
        if(lanes[2]==false || lanes[3]==false ){
            mid=false;
        }
        if(lanes[4]==false ){
            last=false;
        }
    }
    else if(hard==true){
        if(lanes[0]==false || lanes[1]==false || lanes[2]==false){
            first=false;
        }
        if(lanes[3]==false || lanes[4]==false || lanes[5]==false){
            mid=false;
        }
        if(lanes[6]==false || lanes[7]==false){
            last=false;
        }
    }
    if(score==5000){
        topC=topC+1;
    }
    score+=10;
    if(mid==false || last==false){
        for(i=0;i<crates1.length;i++) {
            ctx.drawImage(crates1[i], crates1[i].left, crates1[i].top, 60, 60);
            crates1[i].top += topC;
            document.getElementById('score').innerHTML = "Score: " + score;
            crates1[i].left -= 0.25;
            if(crates1[0].top>0 && crates1[0].top<500){
                lanes[i]=true;
                if(lanes[0]==true){
                    first=true;
                }
                first=true;
            }
            else{
                first=false;
                lanes[i]=false;

            }
            while (crates1[i].top > 820) {
                crates1[i].top = 0;
                crates1[i].left = 150;
                // alert("good 1");
            }
        }
    }
    if(first==false || last==false){
        for(i=0;i<crates2.length;i++) {
            ctx.drawImage(crates2[i], crates2[i].left, crates2[i].top, 60, 60);
            crates2[i].top += topC;
            if(crates2[i].top>0 && crates2[i].top<500){
                mid=true;
                lanes[i+2]=true;
            }
            else{
                mid=false;
                lanes[i+2]=false;

            }
            while (crates2[i].top > 520) {
                crates2[i].top = 0;
            }
        }
    }
    if(first==false || mid==false){
        for(i=0;i<crates3.length;i++) {
            ctx.drawImage(crates3[i], crates3[i].left, crates3[i].top, 60, 60);
            crates3[i].top += topC;
            crates3[i].left+=0.25;
            if(crates3[i].top>0 && crates3[i].top<500){
                last=true;
                lanes[i+4]=true;
            }
            else{
                last=false;
                lanes[i+4]=false;

            }
            while(crates3[i].top>1120){
                crates3[i].left=310;
                crates3[i].top = 0;
            }
        }
    }
}

var createImage = function(src, title,xcoord,ycoord) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    img.left = xcoord;
    img.top = ycoord;
    return img;
};
function drawTab() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.fillStyle = "#404040";
    ctx.fillRect(0,500,500,20);
}
function drawHeart(){
    var ctx = document.getElementById("myCanvas").getContext("2d");
    for(i=0;i<hearts.length;i++){
        ctx.drawImage(hearts[i], hearts[i].left, hearts[i].top, 15, 15);
    }
}
var freezeCheck=false;
function collision() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    var grasscolL = false;
    var grasscolR = false;
    var cratecol = false;
    freezeCheck=false;
    if (car.left < 50) {
        grasscolL = true;
        car.left = 65;
        hearts.pop()
        // document.getElementById('disp').innerHTML = grasscolL;
    }
    if (car.left > 450) {
        grasscolR = true;
        car.left = 385;
        hearts.pop()
        // document.getElementById('disp').innerHTML = grasscolL;
    }
    for (i = 0; i < crates1.length; i++) {
        if (car.left < crates1[i].left +50 && car.left + 50 > crates1[i].left && car.top < crates1[i].top + 50 && car.top + 50 > crates1[i].top) {
            cratecol = true;
            // document.getElementById('check').innerHTML = "i: "+i+"location y 1: "+crates1[i].top;
            crates1[i].top=510;
        }
    }
    for (i = 0; i < crates2.length; i++) {
        if (car.left < crates2[i].left + 50 && car.left + 50 > crates2[i].left && car.top < crates2[i].top + 50 && car.top + 50 > crates2[i].top) {
            cratecol = true;
            crates2[i].top=600;
        }
        // document.getElementById('check').innerHTML = "i: "+i+"location y 2: "+crates1[i].top;
    }
    for (i = 0; i < crates3.length; i++) {
        if (car.left < crates3[i].left + 50 && car.left + 50 > crates3[i].left && car.top < crates3[i].top + 50 && car.top + 50 > crates3[i].top) {
            cratecol = true;
            // document.getElementById('check').innerHTML = "i: "+i+"location y 3: "+crates1[i].top;
            crates3[i].top=510;
        }
    }
    if(score>7000&&score<9000){
        if(car.left < freeze.left + 50 && car.left + 50 > freeze.left && car.top < freeze.top + 50 && car.top + 50 > freeze.top){
            freezeCheck=true;
            freeze.top=500;

        }
    }
    if(cratecol==true){
        hearts.pop();
    }
    if(freezeCheck==true){
        slowDown();
    }
    if(score>11001) {
        if (easy == true) {
            topC = 2;
            topB = 2;
        }
        if (medium == true) {
            topC = 3;
            topB = 3;
        }
        if (hard == true) {
            topC = 3.5;
            topB = 3.5;
        }
    }
    if (hearts.length == 0) {
        document.getElementById('win').innerHTML = "YOU LOST!! Your score is: "+score;
        document.getElementById("reset").disabled = false;
        stopAnimation();
    }
}
function slowDown() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    if (score>7000 && score<11000){
        if(freezeCheck==true){
            topC=1;
            topB=1;
        }
    }

}
function reset() {
    score=0;
    red = false;
    green = false;
    yellow = false;
    easy = false;
    medium = false;
    hard = false;
    pause=false;
    topC=1;
    topB=1;
    document.getElementById("red").disabled = false;
    document.getElementById("green").disabled = false;
    document.getElementById("yellow").disabled = false;
    document.getElementById("easy").disabled = false;
    document.getElementById("medium").disabled = false;
    document.getElementById("hard").disabled = false;
    document.getElementById("pause").disabled = true;
    while (crates1.length>0){
        crates1.pop();
    }
    while (crates2.length>0){
        crates2.pop();
    }
    while (crates3.length>0){
        crates3.pop();
    }
    while (bushes.length>0){
        bushes.pop()
    }
    document.getElementById('win').innerHTML = "";
    initialize();
    document.getElementById("start").disabled = false;

    // animate();
}
var hscore = 0;
function stopAnimation(){
    highscore();
    cancelAnimationFrame(a);
}
function highscore() {
    if (hscore < score){
        hscore = score;
    }
    document.getElementById('highscore').innerHTML = "High score: "+hscore;

}
function Pause() {
    if (pause == false){
        cancelAnimationFrame(a);
        pause=true;
    }
    else if (pause==true){
        a=requestAnimationFrame(animate);
        pause=false;
    }
}