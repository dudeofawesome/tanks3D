var tanks=new Array();
var bullets=new Array();
var shells=new Array();
//var tanksInfo=new Array();
var tankYou=new Object();
var screenCenterX=window.innerWidth/2;
var screenCenterY=window.innerHeight/2;
var changeX=0*1;
var changeY=0*1;
var timeOutShell=0;

var clock=new THREE.Clock();
var container, stats;
var controls;
var camera, scene, renderer;

var levelBeat=false;
var cube, plane, torus;

var windowHalfX=window.innerWidth / 2;
var windowHalfY=window.innerHeight / 2;

//mikes tank code
var enemytanks=new AiTanks();

setup();
animate();

function setup() {

	numberOfEnemies=getValue("enemies");
	
	container=document.createElement('div');
	document.body.appendChild(container);

	scene=new THREE.Scene();
	
	camera=new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.x=0;
	camera.position.y=5.6;
	camera.position.z=0;
	camera.rotation.x=0;
	camera.rotation.y=0;
	camera.rotation.z=0;
	scene.add(camera);

	light=new THREE.SpotLight(0xFFF5F2);
	light.position.x=10;
	light.position.y=1000;
	light.position.z=0;
    light.castShadow=true;
	scene.add(light);

    enemytanks.setup();
    
    plane=new THREE.Mesh(new THREE.PlaneGeometry(5268,5268), new THREE.MeshBasicMaterial({color:0xe0e0e0}));
    plane.overdraw=true;
    plane.position.y=.53;
    plane.rotation.x=Math.PI/2*3;
    plane.receiveShadow=true;
    scene.add(plane);
    
    var texture=THREE.ImageUtils.loadTexture('textures/enviro/11.png');
    var material=new THREE.MeshBasicMaterial({color:0x7185e5});
    var ceiling=new THREE.Mesh(new THREE.PlaneGeometry(5268,5268),material);
    ceiling.doubleSided=true;
    ceiling.position.x=0;
    ceiling.position.y=1240;
    ceiling.position.z=0;
    ceiling.rotation.x=Math.PI/2;
    ceiling.rotation.y=0;
    ceiling.rotation.z=0;
    scene.add(ceiling);
    
    var texture=THREE.ImageUtils.loadTexture('textures/enviro/p1.png');
    var material=new THREE.MeshBasicMaterial({map: texture});
    var leftWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    leftWall.doubleSided=true;
    leftWall.position.x=-2634;
    leftWall.position.y=200;
    leftWall.position.z=0;
    leftWall.rotation.x=0;
    leftWall.rotation.y=Math.PI/2;
    leftWall.rotation.z=0;
    scene.add(leftWall);
    
    texture=THREE.ImageUtils.loadTexture('textures/enviro/p2.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var frontWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    frontWall.doubleSided=true;
    frontWall.position.x=0;
    frontWall.position.y=200;
    frontWall.position.z=-2634;
    frontWall.rotation.x=0;
    frontWall.rotation.y=0;
    frontWall.rotation.z=0;
    scene.add(frontWall);

    texture=THREE.ImageUtils.loadTexture('textures/enviro/p3.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var rightWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    rightWall.doubleSided=true;
    rightWall.position.x=2634;
    rightWall.position.y=200;
    rightWall.position.z=0;
    rightWall.rotation.x=0;
    rightWall.rotation.y=Math.PI/2*3;
    rightWall.rotation.z=0;
    scene.add(rightWall);

    texture=THREE.ImageUtils.loadTexture('textures/enviro/p4.png');
    material=new THREE.MeshBasicMaterial({map: texture});
    var backWall=new THREE.Mesh(new THREE.PlaneGeometry(5268,2090),material);
    backWall.doubleSided=true;
    backWall.position.x=0;
    backWall.position.y=200;
    backWall.position.z=2634;
    backWall.rotation.x=0;
    backWall.rotation.y=Math.PI;
    backWall.rotation.z=0;
    scene.add(backWall);

	var model=new THREE.JSONLoader();
	model.load('models/tankBody.js',createSceneYou);
	
	tankYou.x=0;
	tankYou.y=0;
	tankYou.z=0;
	tankYou.vX=0;
	tankYou.vY=0;
	tankYou.vZ=1;
	tankYou.rX=0;
	tankYou.rY=0;
	tankYou.rZ=0;
	tankYou.cRy=0;
	tankYou.width=4;
	tankYou.health=100;
		
	//model=new THREE.JSONLoader();
	model.load("models/tankBody.js",createSceneBody);
	
	//var model=new THREE.JSONLoader();
	model.load("models/tankTurret.js",createSceneTurret);
	
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
}

function getValue(varname)
{
  // First, we load the URL into a variable
  var url=window.location.href;

  // Next, split the url by the ?
  var qparts=url.split("?");

  // Check that there is a querystring, return "" if not
  if (qparts.length == 0)
  {
    return "";
  }

  // Then find the querystring, everything after the ?
  var query=qparts[1];

  // Split the query string into variables (separates by &s)
  var vars=query.split("&");

  // Initialize the value with "" as default
  var value="";

  // Iterate through vars, checking each one for varname
  for (i=0;i<vars.length;i++)
  {
    // Split the variable by =, which splits name and value
    var parts=vars[i].split("=");
    
    // Check if the correct variable
    if (parts[0] == varname)
    {
      // Load value into variable
      value=parts[1];

      // End the loop
      break;
    }
  }
  
  // Convert escape code
  value=unescape(value);

  // Convert "+"s to " "s
  value.replace(/\+/g," ");

  // Return the value
  return value;
}

function animate() {
	requestAnimationFrame(animate);

	render();
	stats.update();
}

function createSceneBody(geometry){
    //make enemy tanks
	var material=new THREE.MeshFaceMaterial();
    enemytanks.AiTankBodySetup(material,geometry);
}

function createSceneTurret(geometry){
    //make enemy tanks
	var material=new THREE.MeshFaceMaterial();
    enemytanks.AiTankTurretSetup(material,geometry);
}

function createSceneYou(geometry){
	var material=new THREE.MeshFaceMaterial();

    tankYou.model=new THREE.SkinnedMesh(geometry,material);
    tankYou.model.scale.set(5,5,5);
    tankYou.model.position.x=0;
    tankYou.model.position.y=.5;
    tankYou.model.position.z=0;
    //tankYou.model.rotation.x=(3*Math.PI)/2;
    tankYou.model.rotation.y=Math.PI/2;
    tankYou.model.rotation.z=2*Math.PI;
    //tankYou.model.castShadow=true;
    tankYou.model.receiveShadow=true;
    scene.add(tankYou.model);
}

function render() {
	moveTankView();

    //updates the enemy tanks
	enemytanks.Update();
    
        
    moveBullets();
    
    timeOutShell-=1;
    
    //rotate camera
    tankYou.cRy-=changeX;
	camera.rotation.y=tankYou.cRy;

	renderer.clear();
	renderer.render(scene, camera);
}

function moveBullets(){
    for(var counter=0;counter<bullets.length;counter++){
        bullets[counter].model.position.x-=bullets[counter].vX;
        bullets[counter].model.position.z-=bullets[counter].vZ;
        for(var count=0;count<enemytanks.GetTankArray().length;count++){
        	var distance=Math.sqrt(Math.pow(tankYou.model.position.x-bullets[counter].model.position.x,2) + Math.pow((tankYou.model.position.z-bullets[counter].model.position.z), 2));
        	var collisionHappening=1500;
        	if(distance>=collisionHappening){
                scene.remove(bullets[counter].model);
                bullets.splice(counter,1);
        	}
        	else if(bullets[counter].model.position.x>=enemytanks.GetTankArray()[count].tankBody.position.x-enemytanks.GetTankArray()[count].width*2 && bullets[counter].model.position.x<=enemytanks.GetTankArray()[count].tankBody.position.x+enemytanks.GetTankArray()[count].width && bullets[counter].model.position.z>=enemytanks.GetTankArray()[count].tankBody.position.z-enemytanks.GetTankArray()[count].width*2 && bullets[counter].model.position.z<=enemytanks.GetTankArray()[count].tankBody.position.z+enemytanks.GetTankArray()[count].width){
                scene.remove(bullets[counter].model);
                bullets.splice(counter,1);
                enemytanks.GetTankArray()[count].health-=.1;
                if(enemytanks.GetTankArray()[count].health<=0){
                    scene.remove(enemytanks.GetTankArray()[count].tankBody);
                    scene.remove(enemytanks.GetTankArray()[count].tankTurret);
                    enemytanks.GetTankArray().splice(count,1);
                    if(enemytanks.GetTankArray().length<=0){
                        winSetup();
                    }
                }
            }
            else if(bullets[counter].model.position.x>=tankYou.model.position.x-tankYou.width*2 && bullets[counter].model.position.x<=tankYou.model.position.x+tankYou.width && bullets[counter].model.position.z>=tankYou.model.position.z-tankYou.width*2 && bullets[counter].model.position.z<=tankYou.model.position.z+tankYou.width){
                scene.remove(bullets[counter].model);
                bullets.splice(counter,1);
                tankYou.health-=.05;
                if(tankYou.health<=0){
                    scene.remove(tankYou.model);
                    //loseSetup();
                }
            }
        }
    }
    
    moveShells();
}

function moveShells(){
    for(var counter=0;counter<shells.length;counter++){
        shells[counter].model.position.x-=shells[counter].vX;
        shells[counter].model.position.z-=shells[counter].vZ;
        for(var count=0;count<enemytanks.GetTankArray().length;count++){
			            if (shells[counter].model.position.x >= enemytanks.GetTankArray()[count].tankBody.position.x
					- enemytanks.GetTankArray()[count].width * 2
					&& shells[counter].model.position.x <= enemytanks
							.GetTankArray()[count].tankBody.position.x
							+ enemytanks.GetTankArray()[count].width
					&& shells[counter].model.position.z >= enemytanks
							.GetTankArray()[count].tankBody.position.z
							- enemytanks.GetTankArray()[count].width * 2
					&& shells[counter].model.position.z <= enemytanks
							.GetTankArray()[count].tankBody.position.z+enemytanks.GetTankArray()[count].width){
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
    winText.position.x=tankYou.model.position.x-Math.sin(tankYou.cRy)*300;
    winText.position.y=6;
    winText.position.z=tankYou.model.position.z-Math.cos(tankYou.cRy)*300;
    winText.rotation.y=tankYou.cRy;
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
    winText2.position.x=tankYou.model.position.x-Math.sin(tankYou.cRy)*300;
    winText2.position.y=-17;
    winText2.position.z=tankYou.model.position.z-Math.cos(tankYou.cRy)*300;
    winText2.rotation.y=tankYou.cRy;
    scene.add(winText2);
    
    var group=new THREE.Object3D();
    
    var geometry=new THREE.TorusGeometry(17,3,50,50,Math.PI);
    var material=new THREE.MeshLambertMaterial({color:0xff88ff});
    torus=new Object();
    torus.x=tankYou.model.position.x-Math.sin(tankYou.cRy)*300;
    torus.y=-1;
    torus.z=tankYou.model.position.z-Math.cos(tankYou.cRy)*300;
    torus.rY=tankYou.cRy;
    torus.width=10;
    
    torus.model=new THREE.Mesh(geometry,material);
    torus.model.position.x=torus.x
    torus.model.position.y=torus.y
    torus.model.position.z=torus.z
    torus.model.rotation.y=torus.rY
    torus.model.castShadow=true;
    levelBeat=true;
    scene.add(torus.model);
    
    var texture=THREE.ImageUtils.loadTexture('textures/portal2.jpg');
    var material=new THREE.MeshBasicMaterial({map: texture});
    var portalField=new THREE.Mesh(new THREE.PlaneGeometry(28,14),material);
    portalField.doubleSided=true;
    portalField.position.x=tankYou.model.position.x-Math.sin(tankYou.cRy)*300;
    portalField.position.y=6;
    portalField.position.z=tankYou.model.position.z-Math.cos(tankYou.cRy)*300;
    portalField.rotation.y=tankYou.cRy;
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
