var key=new Array();
key[87]="up"; //W
key[65]="up"; //A
key[83]="up"; //S
key[68]="up"; //D
key[32]="up"; //Space
key[16]="up"; //Shift

var screenCenterX=window.innerWidth/2, screenCenterY=window.innerHeight/2;
var changeX=0*1, changeY=0*1;
var timeOutShell=0;

var speed=0, ySpeed=0, velocity=0, yVelocity=0, friction=0, yFriction=0, maxspeed=0, yMaxspeed=0, degreesOfRotation=0;

var leftMouseDown=false;

var vehicleRotation=0;

var url=window.location.href;

//checks to see what keys are down
document.onkeydown = function(event){
    if(window.event){
        // code for IE
        event=window.event;
        key[event.keyCode]="down";
        if(event.keyCode==27){
            //alert("Paused");
            if(camera.paused==false){
                camera.paused=true;
            }
            else{
                camera.paused=false;
            }
        }
    }
    else{
        //code for FireFox
        key[event.which]="down";
    }
};
//checks to see what keys are up
document.onkeyup = function(event){
    if(window.event){
        // code for IE
        event=window.event;
        key[event.keyCode]="up";
    }
    else{
        //code for FireFox
        key[event.which]="up";
    }
};

THREE.PerspectiveCamera.prototype.init = function(){
    url=url.split("?");

    numberOfEnemies = url[1];

    switch(url[2]){
        case "0": //tank
            speed=0.1;
            ySpeed=0;
            velocity=0;
            yVelocity=0;
            friction=0.75;
            yFriction=0;
            maxspeed=.7;
            yMaxspeed=0;
            degreesOfRotation=80;
            //tankEngine.playloop(3000);
        break;
        case "1": //helicopter
            speed=0.1;
            ySpeed=0.1;
            velocity=0;
            yVelocity=0;
            friction=0.95;
            yFriction=0.9;
            maxspeed=2;
            yMaxspeed=1;
            degreesOfRotation=60;
            //heliBlades.playloop(3000);
        break;
        default:
            speed=0.1;
            ySpeed=0;
            velocity=0;
            yVelocity=0;
            friction=0.75;
            yFriction=0;
            maxspeed=.7;
            yMaxspeed=0;
            degreesOfRotation=80;
            //tankEngine.playloop(3000);
    }
};

THREE.PerspectiveCamera.prototype.controls = function(){
    if(key[87]=="down"){ //forward
        
        velocity -= speed;

        if(levelBeat==true && testCollision(tankYou,torus)==true){
            window.location.assign("tank.php?"+(numberOfEnemies*1+1)+"?"+url[2]);
        }
    }
    else if(key[83]=="down"){ //backward
        velocity += speed;

        if(levelBeat==true && testCollision(tankYou,torus)==true){
            window.location.assign("tank.php?"+(numberOfEnemies*1+1)+"?"+url[2]);
        }
    }
    else{
        velocity*=friction;
    }

    if (velocity > maxspeed){
        velocity = maxspeed;
    }
    else if (velocity < -maxspeed){
        velocity = -maxspeed;
    }

    camera.position.z+=Math.cos(vehicleRotation)*velocity;
    camera.position.x+=Math.sin(vehicleRotation)*velocity;
    tankYou.model.position.x=camera.position.x;
    tankYou.model.position.y=camera.position.y-4.7;
    tankYou.model.position.z=camera.position.z;
    tankYou.model.rotation.y=vehicleRotation+Math.PI/2;

    if(key[65]=="down"){ //rotate left
        vehicleRotation+=Math.PI/degreesOfRotation;
    }
    
    if(key[68]=="down"){ //rotate right
        vehicleRotation-=Math.PI/degreesOfRotation;
    }
    if(key[32]=="down"){ //up        
        yVelocity+=ySpeed;
    }
    else if(key[16]=="down"){ //down
        yVelocity-=ySpeed;
    }
    else{
        yVelocity*=yFriction;
    }

    if (yVelocity > yMaxspeed){
        yVelocity = yMaxspeed;
    }
    else if (yVelocity < -yMaxspeed){
        yVelocity = -yMaxspeed;
    }

    camera.target.y+=yVelocity;
    camera.position.y+=yVelocity;

    if(camera.position.y<4.5){
        //decrease health rapidly
        vehicleRotation+=(Math.random()*Math.PI)-Math.PI;
    }

    if(leftMouseDown==true){
        shootBullet();
    }
};

//ajust camera view
document.onmousemove = function(event){
    var mouseX=event.pageX;
    var mouseY=event.pageY;
    changeX=(mouseX-screenCenterX)/25000;
    changeY=(mouseY-screenCenterY)/7500;
};

document.oncontextmenu = function(){return false;};
document.ondragstart = function(){return false;};

document.onmousedown = function(event){
    switch (event.which) {
        case 1: //left
            leftMouseDown=true;
        break;
        case 2: //middle
            
        break;
        case 3: //right
            shootShell();
        break;
        default: //other
            throw "Button " + event.which + " is not defined.";
    }
};

document.onmouseup = function(event){
    switch (event.which) {
        case 1: //left
            leftMouseDown=false;
        break;
        case 2: //middle
            
        break;
        case 3: //right
            
        break;
        default: //other
            throw "Button " + event.which + " is not defined.";
    }
};

function shootBullet(){
    //gunShot.playover();
    bullets[bullets.length]=new Object();
    bullets[bullets.length-1].vX=-camera.target.x*25;
    bullets[bullets.length-1].vY=(camera.target.y-camera.position.y)*25;
    bullets[bullets.length-1].vZ=-camera.target.z*25;
    bullets[bullets.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
    bullets[bullets.length-1].model.scale.set(.2,.2,.2);
    bullets[bullets.length-1].model.position.x=camera.position.x;
    bullets[bullets.length-1].model.position.y=camera.position.y-.5;
    bullets[bullets.length-1].model.position.z=camera.position.z;
    scene.add(bullets[bullets.length-1].model);
};

function shootShell(){
    if(timeOutShell<=0){
        var audio=artilleryShot;
        audio.play();
        timeOutShell=60;
        shells[shells.length]=new Object();
        shells[shells.length-1].vX=-camera.target.x*10;
        shells[shells.length-1].vY=(camera.target.y-camera.position.y)*5;
        shells[shells.length-1].vZ=-camera.target.z*10;
        shells[shells.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
        shells[shells.length-1].model.position.x=camera.position.x;
        shells[shells.length-1].model.position.y=camera.position.y;
        shells[shells.length-1].model.position.z=camera.position.z;
        scene.add(shells[shells.length-1].model);
    }
};