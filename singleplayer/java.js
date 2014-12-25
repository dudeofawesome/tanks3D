var tanks=[];
var bullets=[];
var shells=[];
var tankYou={};

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
var container, stats, camera, scene, renderer, canvas, ctx;

var levelBeat=false;
var torus={};

var playerType=0;

//mikes tank code
var enemytanks=new AiTanks();

//document.onload=setup();

//document.onload=animate();

//document.onoffline=function(){alert("You have been disconnected from the internet!");}

//var speed=0, ySpeed=0, velocity=0, yVelocity=0, friction=0, yFriction=0, maxspeed=0, yMaxspeed=0, degreesOfRotation=0;

function setup() {
	tankYou.model = new THREE.Mesh(new THREE.SphereGeometry(1, 3, 3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
	

    canvas = document.createElement("canvas");
    canvas.setAttribute("style", "position:absolute;z-index:1;");
    canvas.setAttribute("width", window.innerWidth);
    canvas.setAttribute("height", window.innerHeight);
    canvas.style.top = "0px";
    canvas.style.left = "0px";
    canvas = document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock || canvas.webkitRequestPointerLock;
    canvas.requestPointerLock();

    container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.x = 0;
    camera.position.y = 4.7;
    camera.position.z = 0;
    camera.rotation.x = 0;
    camera.rotation.y = 0;
    camera.rotation.z = 0;
    camera.target = new THREE.Vector3(0, 4.7, -1);
    camera.paused = false;
    camera.angle = 0;
    camera.init();
    scene.add(camera);

    light = new THREE.DirectionalLight(0xFFF5F2, 1);
    light.position.x = 400;
    light.position.y = 700;
    light.position.z = 0;
    light.castShadow = true;
    light.shadowDarkness = 0.5;
    // light.shadowCameraVisible = true;
    scene.add(light);

    // texture = THREE.ImageUtils.loadTexture( "../textures/enviro/sun2.png" );
    // sunSprite = new THREE.Sprite( { map: texture, useScreenCoordinates: false, affectedByDistance: true} );
    // sunSprite.position=light.position;
    // scene.add(sunSprite);

    enemytanks.setup();
    
    var planeTex = THREE.ImageUtils.loadTexture("../textures/enviro/grass.jpg");
    planeTex.wrapS = planeTex.wrapT = THREE.RepeatWrapping;
    planeTex.repeat.set( 1000, 1000 );

    var planeMat = new THREE.MeshLambertMaterial( { map: planeTex } );

    ground = new THREE.Mesh( new THREE.PlaneGeometry(5268,5268), planeMat );  
    ground.rotation.x = Math.PI/2*3;
    ground.receiveShadow = true;
    scene.add(ground);

    var material=new THREE.MeshBasicMaterial({color:0x7185e5});
    var ceiling=new THREE.Mesh(new THREE.PlaneGeometry(5268,5268),material);
    //ceiling.doubleSided=true;
    ceiling.position.x=0;
    ceiling.position.y=1240;
    ceiling.position.z=0;
    ceiling.rotation.x=Math.PI/2;
    ceiling.rotation.y=0;
    ceiling.rotation.z=0;
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

    var model=new THREE.JSONLoader();
    model.load('../models/tankBody.json',createSceneYou);
    
    tankYou.width=4;
    tankYou.health=100;
    
    /*
    var model=new THREE.JSONLoader();
    model.load('models/heli.js',createSceneHeli);
    */
        
    //model=new THREE.JSONLoader();
    // model.load("../models/tankBody.js",createSceneBody);
    
    //var model=new THREE.JSONLoader();
    // model.load("../models/tankTurret.js",createSceneTurret);
    
    enemytanks.AiTankSetup();

    //model.load("models/heli.js",createSceneHeli);
    
    renderer=new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    renderer.shadowCameraNear = 3;
    renderer.shadowCameraFar = camera.far;
    renderer.shadowCameraFov = 50;
    renderer.shadowMapBias = 0.0039;
    renderer.shadowMapDarkness = 0.5;
    renderer.shadowMapWidth = 1024;
    renderer.shadowMapHeight = 1024;
    renderer.domElement.style.position='absolute';
    renderer.domElement.style.top='0px';
    renderer.domElement.style.left='0px';
    renderer.autoClear=false;
    
    container.appendChild(renderer.domElement);
    stats=new Stats();
    stats.domElement.style.position='absolute';
    stats.domElement.style.top='0px';
    container.appendChild(stats.domElement);

    canvas.requestPointerLock();

    animate();

    document.getElementById("errorMessage").innerHTML = "";
}

function animate() {
    requestAnimationFrame(animate);

    render();
    stats.update();
}

function createSceneBody(geometry){
    //make enemy tanks
    var material = new THREE.MeshLambertMaterial({color:0xffffff});
    enemytanks.AiTankBodySetup(material,geometry);
}

function createSceneTurret(geometry){
    //make enemy tanks
    var material = new THREE.MeshLambertMaterial({color:0xffffff});
    enemytanks.AiTankTurretSetup(material,geometry);
}

function createSceneHeli(geometry){
    texture = THREE.ImageUtils.loadTexture('../models/heliSkin.png');
    material = new THREE.MeshLambertMaterial({map: texture});
    //enemytanks.AiTankBodySetup(material,geometry);
    tankYou.model = new THREE.SkinnedMesh(geometry,material);
    tankYou.model.doubleSided=true;
    tankYou.model.scale.set(5,5,5);
    tankYou.model.castShadow = true;
    tankYou.model.receiveShadow = true;
    tankYou.model.position.z=0;
    tankYou.model.position.y=0;
    scene.add(tankYou.model);
}

function createSceneYou(geometry){
    var material = new THREE.MeshLambertMaterial({color:"0x"+tankColor});

    tankYou.model = new THREE.SkinnedMesh(geometry,material);
    tankYou.model.doubleSided=true;
    tankYou.model.scale.set(5,5,5);
    tankYou.model.castShadow = true;
    tankYou.model.receiveShadow = true;
    tankYou.model.position.z=0;
    tankYou.model.position.y=0;
    scene.add(tankYou.model);
}

function render() {
    if(camera.paused == false){
        camera.controls();
        //camera.heliControls();

        //updates the enemy tanks
        if(levelBeat == false){
            enemytanks.Update();
        }
        
        moveBullets();
        
        timeOutShell -= 1;
        
        camera.angle+=changeX;

        camera.target.x=Math.cos(camera.angle)+camera.position.x;
        camera.target.y-=changeY/5;
        camera.target.z=Math.sin(camera.angle)+camera.position.z;

        camera.lookAt(camera.target);

        camera.target.x-=camera.position.x;
        camera.target.z-=camera.position.z;

        renderer.clear();
        renderer.render(scene, camera);

        ctx.clearRect(0,0,window.innerWidth,window.innerHeight);
        ctx.drawProgressBar( tankYou.health/100, 0, innerHeight-10, innerWidth, 10 );
    }
}

function moveBullets(){
    for(var counter=0;counter<bullets.length;counter++){
        bullets[counter].model.position.x-=bullets[counter].vX;
        bullets[counter].model.position.y+=bullets[counter].vY;
        bullets[counter].model.position.z-=bullets[counter].vZ;

        //check for enemies hitting you
        var distance=Math.sqrt(Math.pow(tankYou.model.position.x-bullets[counter].model.position.x,2) + Math.pow((tankYou.model.position.z-bullets[counter].model.position.z), 2));
        var collisionHappening=8;
        if(distance<=collisionHappening){
            bulletHit1.playover();
            scene.remove(bullets[counter].model);
            bullets.splice(counter,1);
            tankYou.health-=.05;
            if(tankYou.health<=0){
                scene.remove(tankYou.model);
                //loseSetup();
                alert("You have died. Try again.");
                window.location.reload();
            }
        }
        //remove bullets when they're far away
        else if(distance>=1500){
            scene.remove(bullets[counter].model);
            bullets.splice(counter,1);
        }

        for(var count=0;count<enemytanks.GetTankArray().length;count++){
            if(bullets[counter].model.position.x>=enemytanks.GetTankArray()[count].tankTurret.position.x-enemytanks.GetTankArray()[count].width*2 && bullets[counter].model.position.x<=enemytanks.GetTankArray()[count].tankTurret.position.x+enemytanks.GetTankArray()[count].width && bullets[counter].model.position.z>=enemytanks.GetTankArray()[count].tankTurret.position.z-enemytanks.GetTankArray()[count].width*2 && bullets[counter].model.position.z<=enemytanks.GetTankArray()[count].tankTurret.position.z+enemytanks.GetTankArray()[count].width){
                var volume=1-(enemytanks.GetTankArray()[count].tankTurret.position.distanceTo(bullets[counter].model.position)/2000);
                if(volume<0){
                    volume=0;
                }
                bulletHit2.volume=volume;
                bulletHit2.playover();
                scene.remove(bullets[counter].model);
                //particles(enemytanks.GetTankArray()[count].tankTurret.position);
                bullets.splice(counter,1);
                enemytanks.GetTankArray()[count].health-=.1;
                if(enemytanks.GetTankArray()[count].health<=0){
                    scene.remove(enemytanks.GetTankArray()[count].tankBody);
                    scene.remove(enemytanks.GetTankArray()[count].tankTurret);
                    enemytanks.GetTankArray().splice(count,1);
                    if(enemytanks.GetTankArray().length<=1){
                        winSetup();
                    }
                }
            }
        }
    }
    
    moveShells();
}

function moveShells(){
    for(var counter=0;counter<shells.length;counter++){
        shells[counter].model.position.x-=shells[counter].vX;
        shells[counter].model.position.y+=shells[counter].vY;
        shells[counter].model.position.z-=shells[counter].vZ;

        //check for enemies hitting you
        var distance=Math.sqrt(Math.pow(tankYou.model.position.x-shells[counter].model.position.x,2) + Math.pow((tankYou.model.position.z-shells[counter].model.position.z), 2));
        var collisionHappening=8;
        if(distance<=collisionHappening){
            bulletHit1.playover();
            scene.remove(shells[counter].model);
            shells.splice(counter,1);
            tankYou.health-=2;
            if(tankYou.health<=0){
                scene.remove(tankYou.model);
                //loseSetup();
                alert("You have died. Try again.");
                window.location.reload();
            }
        }

        for(var count=0;count<enemytanks.GetTankArray().length;count++){
                        if (shells[counter].model.position.x >= enemytanks.GetTankArray()[count].tankTurret.position.x
                    - enemytanks.GetTankArray()[count].width * 2
                    && shells[counter].model.position.x <= enemytanks
                            .GetTankArray()[count].tankTurret.position.x
                            + enemytanks.GetTankArray()[count].width
                    && shells[counter].model.position.z >= enemytanks
                            .GetTankArray()[count].tankTurret.position.z
                            - enemytanks.GetTankArray()[count].width * 2
                    && shells[counter].model.position.z <= enemytanks
                            .GetTankArray()[count].tankTurret.position.z+enemytanks.GetTankArray()[count].width){
                var volume=1-(enemytanks.GetTankArray()[count].tankTurret.position.distanceTo(shells[counter].model.position)/2000);
                if(volume<0){
                    volume=0;
                }
                explosion.volume=volume;
                explosion.playover();
                scene.remove(shells[counter].model);
                shells.splice(counter,1);
                enemytanks.GetTankArray()[count].health-=10;
                if(enemytanks.GetTankArray()[count].health<=0){
                    scene.remove(enemytanks.GetTankArray()[count].tankBody);
                    scene.remove(enemytanks.GetTankArray()[count].tankTurret);
                    enemytanks.GetTankArray().splice(count,1);
                    if(enemytanks.GetTankArray().length<=0){
                        winSetup();
                    }
                }
            }
        }
    }
}

function winSetup(){
    levelBeat=true;

    var c=document.createElement('canvas')
    var ctx=c.getContext('2d');
    ctx.font='60px Arial';
    ctx.fillText('You won!',0,50);
    var tex=new THREE.Texture(c);
    tex.needsUpdate=true;
    var mat=new THREE.MeshBasicMaterial({map: tex});
    mat.transparent=true;
    var winText=new THREE.Mesh(new THREE.PlaneGeometry(c.width, c.height),mat);
    winText.doubleSided=true;
    winText.position.x=camera.position.x-Math.sin(camera.angle+Math.PI/2)*300;
    winText.position.y=6;
    winText.position.z=camera.position.z-Math.cos(camera.angle+Math.PI/2)*300;
    winText.rotation.y=camera.angle+Math.PI/2;
    scene.add(winText);
    
    var c2=document.createElement('canvas')
    var ctx2=c2.getContext('2d');
    ctx2.font='30px Arial';
    ctx2.fillText('Go here to   continue',0,50);
    var tex2=new THREE.Texture(c2);
    tex2.needsUpdate=true;
    var mat2=new THREE.MeshBasicMaterial({map: tex2});
    mat2.transparent=true;
    var winText2=new THREE.Mesh(new THREE.PlaneGeometry(c2.width, c2.height),mat2);
    winText2.doubleSided=true;
    winText2.position.x=camera.position.x-Math.sin(camera.angle+Math.PI/2)*300;
    winText2.position.y=-17;
    winText2.position.z=camera.position.z-Math.cos(camera.angle+Math.PI/2)*300;
    winText2.rotation.y=camera.angle+Math.PI/2;
    scene.add(winText2);
    
    var group=new THREE.Object3D();
    
    var geometry=new THREE.TorusGeometry(17,3,50,50,Math.PI);
    var material=new THREE.MeshLambertMaterial({color:0xff88ff});
    torus.model=new THREE.Mesh(geometry,material);
    torus.model.position.x=camera.position.x-Math.sin(camera.angle+Math.PI/2)*300;
    torus.model.position.y=-1;
    torus.model.position.z=camera.position.z-Math.cos(camera.angle+Math.PI/2)*300;
    torus.model.rotation.y=camera.angle+Math.PI/2;
    torus.width=10;
    torus.model.castShadow=true;
    scene.add(torus.model);
    
    var texture=THREE.ImageUtils.loadTexture('../textures/portal2.jpg');
    var material=new THREE.MeshBasicMaterial({map: texture});
    var portalField=new THREE.Mesh(new THREE.PlaneGeometry(28,14),material);
    portalField.doubleSided=true;
    portalField.position.x=camera.position.x-Math.sin(camera.angle+Math.PI/2)*300;
    portalField.position.y=6;
    portalField.position.z=camera.position.z-Math.cos(camera.angle+Math.PI/2)*300;
    portalField.rotation.y=camera.angle+Math.PI/2;
    scene.add(portalField);
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
    var distance=Math.sqrt(Math.pow(obj2.model.position.x+(obj2.width/4)-obj1.model.position.x+(obj1.width/4),2) + Math.pow((obj2.model.position.z+(obj2.width/4)-obj1.model.position.z+(obj1.width/4)), 2));
    var collisionHappening=(obj1.width*2)+(obj2.width*2)
    
    if(distance<=collisionHappening){
        return true
    }
    else{
        return false
    }
}
