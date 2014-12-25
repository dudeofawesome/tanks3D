var key=new Array();
key[87]="up"; //W
key[65]="up"; //A
key[83]="up"; //S 
key[68]="up"; //D
key[32]="up"; //Space
key[16]="up"; //Shift
key[188]="up"; //W
key[79]="up"; //A
key[69]="up"; //S 

var screenCenterX=window.innerWidth/2, screenCenterY=window.innerHeight/2;
var changeX=0*1, changeY=0*1;
var timeOutShell=0;

var speed=0, ySpeed=0, velocity=0, yVelocity=0, friction=0, yFriction=0, maxspeed=0, yMaxspeed=0, degreesOfRotation=1, sensitivity;

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

    sensitivity=url[2];

    /*switch(url[2]){
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
        default: //tank
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
    }*/

    if(camera.position.y==4.7){
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
    else{
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
    }
};

THREE.PerspectiveCamera.prototype.controls = function(){
    if(key[87]=="down"){ //forward    
        velocity -= speed;
    }
    else if(key[83]=="down"){ //backward
        velocity += speed;
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
    tankYou.body.position.x=camera.position.x;
    tankYou.body.position.y=camera.position.y-4.7;
    tankYou.body.position.z=camera.position.z;
    tankYou.body.rotation.y=vehicleRotation+Math.PI/2;

    if(key[65]=="down"){ //rotate left
        vehicleRotation+=Math.PI/degreesOfRotation;
    }
    
    if(key[68]=="down" || key[69]=="down"){ //rotate right
        vehicleRotation-=Math.PI/degreesOfRotation;
    }
    if(key[32]=="down" || key[188]=="down"){ //up        
        yVelocity+=ySpeed;
    }
    else if(key[16]=="down" || key[79]=="down"){ //down
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
    bullets.push(Bullet(camera.position.x,camera.position.y-.5,camera.position.z,-camera.target.x*25,(camera.target.y-camera.position.y)*25,-camera.target.z*25));
/*    //gunShot.playover();
    bullets[bullets.length]={};
    bullets[bullets.length-1]=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
    bullets[bullets.length-1].velocity=new THREE.Vector3(-camera.target.x*25,(camera.target.y-camera.position.y)*25,-camera.target.z*25);
    bullets[bullets.length-1].scale.set(.2,.2,.2);
    bullets[bullets.length-1].position.set(camera.position.x,camera.position.y-.5,camera.position.z);
    scene.add(bullets[bullets.length-1]);*/
    addBulletData(bullets[bullets.length-1]);
};

function shootShell(){
    if(timeOutShell<=0){
        artilleryShot.volume=1;
        artilleryShot.playover();
        timeOutShell=60;

        shells.push(Shell(camera.target.x+camera.position.x,camera.target.y,camera.target.z+camera.position.z,-camera.target.x*7,(camera.target.y-camera.position.y)*7,-camera.target.z*7));
/*        artilleryShot.playover();
        timeOutShell=60;
        shells[shells.length]={};
        shells[shells.length-1]=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
        shells[shells.length-1].velocity=new THREE.Vector3(-camera.target.x*5,(camera.target.y-camera.position.y)*5,-camera.target.z*5);
        shells[shells.length-1].position.set(camera.position.x,camera.position.y,camera.position.z);
        scene.add(shells[shells.length-1]);*/
        addShellData(shells[shells.length-1]);
    }
};

//for virtual stick

stick={};
stick.x=20;
stick.y=window.innerHeight - 170;
stick.head={};
stick.head.x=0;
stick.head.y=0;

function stickSetup(){
    document.getElementById("stick").style.left=stick.x + "px";
    document.getElementById("stick").style.top=stick.y + "px";
    stick.x+=63;
    stick.y+=63;
}

document.addEventListener('touchstart', function(event) {
    stick.head.x = event.touches[0].pageX;
    stick.head.y = event.touches[0].pageY;
    //move stick head
    document.getElementById("head").style.left=stick.head.x + "px";
    document.getElementById("head").style.top=stick.head.y + "px";

}, false);

document.addEventListener('touchmove', function(event) {
    event.preventDefault();

    //move stick head
    checkPos(event.touches[0].pageX,event.touches[0].pageY)
}, false);

document.addEventListener('touchend', function(event) {
    //move stick head
    stick.head.x = stick.x;
    stick.head.y = stick.y;
    document.getElementById("head").style.left=stick.head.x + "px";
    document.getElementById("head").style.top=stick.head.y + "px";
}, false);

function checkPos(x,y){
    stick.head.x = x;
    stick.head.y = y;
    document.getElementById("head").style.left=stick.head.x + "px";
    document.getElementById("head").style.top=stick.head.y + "px";
}
