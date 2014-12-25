var tanks=[];
var bullets=[];
var shells=[];

var bulletHit1 = new Audio("../audio/bullet1.ogg");
var bulletHit2 = new Audio("../audio/bullet2.ogg");
var gunShot = new Audio("../audio/gunShot.ogg");
var missileLaunch = new Audio("../audio/missileLaunch.ogg");
var artilleryShot = new Audio("../audio/artilleryShot.ogg");
var explosion = new Audio("../audio/explosion.ogg");
var tankEngine = new Audio("../audio/tankEngine.ogg");
var heliEngine = new Audio("../audio/heliEngine.ogg");

//var heliYou=new Object();

var clock=new THREE.Clock();
var container, stats, camera, scene, renderer;

var playerType=0;

//document.onload=setup();

//document.onoffline=function(){alert("You have been disconnected from the internet!");}

//var speed=0, ySpeed=0, velocity=0, yVelocity=0, friction=0, yFriction=0, maxspeed=0, yMaxspeed=0, degreesOfRotation=0;

function setup() {
    tankYou=player[me];

    //stickSetup();

    ctx = document.createElement("canvas");
    ctx.setAttribute("style","position:absolute;z-index:1;");
    ctx.setAttribute("width",window.innerWidth);
    ctx.setAttribute("height",window.innerHeight);
    ctx.style.top="0px";
    ctx.style.left="0px";
    ctx = document.body.appendChild(ctx).getContext("2d");

    container=document.createElement('div');
    document.body.appendChild(container);

    camera=new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0,4.7,0);
    camera.target=new THREE.Vector3(0,4.7,-1);
    camera.angle=0;
    camera.init();
    scene.add(camera);

    light=new THREE.SpotLight(0xFFF5F2);
    light.position.set(400,700,0);
    light.castShadow=true;
    scene.add(light);

    // texture = THREE.ImageUtils.loadTexture( "../textures/enviro/sun2.png" );
    // sunSprite = new THREE.Sprite( { map: texture, useScreenCoordinates: false, affectedByDistance: true} );
    // sunSprite.position=light.position;
    // scene.add(sunSprite);

    var planeTex = THREE.ImageUtils.loadTexture("../textures/enviro/grass.jpg");
    planeTex.wrapS = planeTex.wrapT = THREE.RepeatWrapping;
    planeTex.repeat.set( 1000, 1000 );

    var planeMat = new THREE.MeshBasicMaterial( { map: planeTex } );

    ground = new THREE.Mesh( new THREE.PlaneGeometry(5268,5268), planeMat );  
    ground.rotation.x=Math.PI/2*3;
    scene.add(ground);

    var material=new THREE.MeshBasicMaterial({color:0x7185e5});
    var ceiling=new THREE.Mesh(new THREE.PlaneGeometry(5268,5268),material);
    //ceiling.doubleSided=true;
    ceiling.position.y=1240;
    ceiling.rotation.x=Math.PI/2;
    scene.add(ceiling);
    
    var texture=THREE.ImageUtils.loadTexture('../textures/enviro/p1.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var leftWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    //leftWall.doubleSided=true;
    leftWall.position.x=-2634;
    leftWall.position.y=200;
    leftWall.position.z=0;
    leftWall.rotation.x=0;
    leftWall.rotation.y=Math.PI/2;
    leftWall.rotation.z=0;
    scene.add(leftWall);
    
    texture=THREE.ImageUtils.loadTexture('../textures/enviro/p2.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var frontWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    //frontWall.doubleSided=true;
    frontWall.position.x=0;
    frontWall.position.y=200;
    frontWall.position.z=-2634;
    frontWall.rotation.x=0;
    frontWall.rotation.y=0;
    frontWall.rotation.z=0;
    scene.add(frontWall);

    texture=THREE.ImageUtils.loadTexture('../textures/enviro/p3.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var rightWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    //rightWall.doubleSided=true;
    rightWall.position.x=2634;
    rightWall.position.y=200;
    rightWall.position.z=0;
    rightWall.rotation.x=0;
    rightWall.rotation.y=Math.PI/2*3;
    rightWall.rotation.z=0;
    scene.add(rightWall);

    texture=THREE.ImageUtils.loadTexture('../textures/enviro/p4.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var backWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    //backWall.doubleSided=true;
    backWall.position.x=0;
    backWall.position.y=200;
    backWall.position.z=2634;
    backWall.rotation.x=0;
    backWall.rotation.y=Math.PI;
    backWall.rotation.z=0;
    scene.add(backWall);

    tankYou.width=8;
    tankYou.health=100;
    
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled=true;
    renderer.domElement.style.position='absolute';
    renderer.domElement.style.top='0px';
    renderer.domElement.style.left='0px';
    renderer.autoClear=false;
    
    container.appendChild(renderer.domElement);
    stats=new Stats();
    stats.domElement.style.position='absolute';
    stats.domElement.style.top='0px';
    container.appendChild(stats.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function createSceneHeli(geometry){
    texture=THREE.ImageUtils.loadTexture('../models/heliSkin.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    //enemytanks.AibodySetup(material,geometry);
    tankYou.body=new THREE.SkinnedMesh(geometry,material);
    tankYou.body.doubleSided=true;
    tankYou.body.scale.set(5,5,5);
    tankYou.body.castShadow = true;
    tankYou.body.receiveShadow = true;
    tankYou.body.position.z=0;
    tankYou.body.position.y=0;
    scene.add(tankYou.body);
}

function render() {
    if(camera.paused==false){
        if(camera.rotation.x=="undefined"){
            camera.rotation.set(0,0,0);
        }
        camera.controls();

        moveBullets();
        
        timeOutShell-=1;
        
        camera.angle+=changeX;

        camera.target.x=Math.cos(camera.angle)+camera.position.x;
        camera.target.y-=changeY/5;
        camera.target.z=Math.sin(camera.angle)+camera.position.z;

        camera.lookAt(camera.target);

        camera.target.x-=camera.position.x;
        camera.target.z-=camera.position.z;

        tankYou.turret.rotation.y=-camera.angle;

        renderer.clear();
        renderer.render(scene, camera);

        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        ctx.drawProgressBar( tankYou.health/100, 0, innerHeight-10, innerWidth, 10 );
    }
}

function moveBullets(){
    for(var counter=0;counter<bullets.length;counter++){
        bullets[counter].position.x-=bullets[counter].velocity.x;
        bullets[counter].position.y+=bullets[counter].velocity.y;
        bullets[counter].position.z-=bullets[counter].velocity.z;
/*        var distance=tankYou.body.position.distanceTo(bullets[counter].position);
        var collisionHappening=8;
        if(distance<=collisionHappening){
            var volume=1-(player[me].body.position.distanceTo(bullets[counter])/600);
            if(volume<0){
                volume=0;
            }
            bulletHit2.volume=volume;
            bulletHit2.playover();
            socket.disconnect();
            scene.remove(bullets[counter]);
            bullets.splice(counter,1);
            tankYou.health-=.05;
            if(tankYou.health<=0){
                scene.remove(tankYou);
                alert("You have died. Click OK to respawn.");
                //respawn code here
            }
        }
        else*/ if(Math.sqrt(Math.pow(-bullets[counter].position.x,2) + Math.pow(-bullets[counter].position.z, 2))>=4000){
            scene.remove(bullets[counter]);
            bullets.splice(counter,1);
        }

        if(player[me].body.position.distanceTo(bullets[counter].position)<=player[me].width){
            //var volume=1-Math.sqrt((camera.position.x-player[me].body.position.x)^2+(camera.position.z-player[me].body.position.z)^2)/600;
            //if(volume<0){
            //    volume=0;
            //}
            //bulletHit2.volume=volume;
            //bulletHit2.playover();
            scene.remove(bullets[counter]);
            bullets.splice(counter,1);
            player[me].health-=.05;
            if(player[me].health<=0){
                socket.disconnect();
                if(player.length<=1){
                    gameFinished();
                }
            }
        }
    }
    moveShells();
}

function moveShells(){
    for(var counter=0;counter<shells.length;counter++){
        shells[counter].position.x-=shells[counter].velocity.x;
        shells[counter].position.y+=shells[counter].velocity.y;
        shells[counter].position.z-=shells[counter].velocity.z;
        if (player[me].body.position.distanceTo(shells[counter].position)<=player[me].width){
            explosion.playover();
            scene.remove(shells[counter]);
            shells.splice(counter,1);
            player[me].health-=10;
            if(player[me].health<=0){
                socket.disconnect()
                gameFinished();
            }
        }
    }
}

function gameFinished(){
    //display score board
    window.location.href="../scoreboard.php";
}

function testEnemyCollision(tankToSkip){
    var totalCollisions=0*1;
    for(var counter=0;counter<tanks.length;counter++){
        if(counter!=tankToSkip){
            if(testCollision(tanks[tankToSkip],tanks[counter])==true){
                totalCollisions+=1;
            }
        }
    }
    if(totalCollisions==0){
        return false;
    }
    else{return true;}
}

function testCollision(obj1, obj2) {
    var distance=Math.sqrt(Math.pow(obj2.body.position.x+(obj2.width/4)-obj1.body.position.x+(obj1.width/4),2) + Math.pow((obj2.body.position.z+(obj2.width/4)-obj1.body.position.z+(obj1.width/4)), 2));
    var collisionHappening=(obj1.width*2)+(obj2.width*2)
    
    if(distance<=collisionHappening){
        return true
    }
    else{
        return false
    }
}
