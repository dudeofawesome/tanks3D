var key=new Array();
key[87]="up"; //W
key[65]="up"; //A
key[83]="up"; //S
key[68]="up"; //D
key[32]="up"; //Space
key[16]="up"; //Shift

//checks to see what keys are down
function keyDown(event){
    if(window.event){
        // code for IE
        event=window.event;
        key[event.keyCode]="down";
    }
    else{
        //code for FireFox
        key[event.which]="down";
    }
}

//checks to see what keys are up
function keyUp(event){
    if(window.event){
        // code for IE
        event=window.event;
        key[event.keyCode]="up";
    }
    else{
        //code for FireFox
        key[event.which]="up";
    }
}

function moveTankView(){
	if(key[87]=="down"){ //forward
		tankYou.model.position.z-=tankYou.vZ;
		tankYou.model.position.x-=tankYou.vX;
		camera.position.z=tankYou.model.position.z;
		camera.position.x=tankYou.model.position.x;
        
        if(levelBeat==true && testCollision(tankYou,torus)==true){
            window.location.assign("tank.php?enemies="+(numberOfEnemies*1+1));
        }
	}
	if(key[65]=="down"){ //rotate left
		tankYou.rY+=Math.PI/80;
		tankYou.vZ=Math.cos(tankYou.rY);
		tankYou.vX=Math.sin(tankYou.rY);
        tankYou.model.rotation.y=tankYou.rY+Math.PI/2;
	}
	if(key[83]=="down"){ //backward
        tankYou.model.position.z+=tankYou.vZ*50;
        tankYou.model.position.x+=tankYou.vX*50;
        camera.position.z=tankYou.model.position.z;
        camera.position.x=tankYou.model.position.x;

        if(levelBeat==true && testCollision(tankYou,torus)==true){
        	window.location.assign("tank.php?enemies="+(numberOfEnemies*1+1));
        }
	}
	if(key[68]=="down"){ //rotate right
		tankYou.rY-=Math.PI/80;
		tankYou.vZ=Math.cos(tankYou.rY);
		tankYou.vX=Math.sin(tankYou.rY);
        tankYou.model.rotation.y=tankYou.rY+Math.PI/2;
	}
	if(key[32]=="down"){ //shoot bullet
		bullets[bullets.length]=new Object();
		bullets[bullets.length-1].vX=Math.sin(tankYou.cRy)*25;
		bullets[bullets.length-1].vZ=Math.cos(tankYou.cRy)*25;
		bullets[bullets.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
        bullets[bullets.length-1].model.scale.set(.2,.2,.2);
        bullets[bullets.length-1].model.position.x=tankYou.model.position.x;
        bullets[bullets.length-1].model.position.y=4;
        bullets[bullets.length-1].model.position.z=tankYou.model.position.z;
        scene.add(bullets[bullets.length-1].model);
	}
	if(key[16]=="down"){ //shoot shell
	    if(timeOutShell<=0){
            timeOutShell=60;
            shells[shells.length]=new Object();
            shells[shells.length-1].vX=Math.sin(tankYou.cRy)*2;
            shells[shells.length-1].vZ=Math.cos(tankYou.cRy)*2;
            shells[shells.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
            shells[shells.length-1].model.position.x=tankYou.model.position.x;
            shells[shells.length-1].model.position.y=4.5;
            shells[shells.length-1].model.position.z=tankYou.model.position.z;
            scene.add(shells[shells.length-1].model);
        }
	}
}





function moveHeliView(){
	if(key[87]=="down"){ //forward
		heliYou.model.position.z-=heliYou.vZ;
		heliYou.model.position.x-=heliYou.vX;
		camera.position.z=heliYou.model.position.z-200;
		camera.position.x=heliYou.model.position.x;
        
        if(levelBeat==true && testCollision(tankYou,torus)==true){
            window.location.assign("tank.php?enemies="+(numberOfEnemies*1+1));
        }
	}
	if(key[65]=="down"){ //rotate left
		heliYou.rY+=Math.PI/80;
		heliYou.vZ=Math.cos(heliYou.rY);
		heliYou.vX=Math.sin(heliYou.rY);
        heliYou.model.rotation.y=heliYou.rY+Math.PI/2;
	}
	if(key[83]=="down"){ //backward
        heliYou.model.position.z+=heliYou.vZ*50;
        heliYou.model.position.x+=heliYou.vX*50;
        camera.position.z=heliYou.model.position.z-200;
        camera.position.x=heliYou.model.position.x;

        if(levelBeat==true && testCollision(tankYou,torus)==true){
        	window.location.assign("tank.php?enemies="+(numberOfEnemies*1+1));
        }
	}
	if(key[68]=="down"){ //rotate right
		heliYou.rY-=Math.PI/80;
		heliYou.vZ=Math.cos(heliYou.rY);
		heliYou.vX=Math.sin(heliYou.rY);
        heliYou.model.rotation.y=heliYou.rY+Math.PI/2;
	}
	if(key[32]=="down"){ //shoot bullet
		/*bullets[bullets.length]=new Object();
		bullets[bullets.length-1].vX=Math.sin(heliYou.cRy)*25;
		bullets[bullets.length-1].vZ=Math.cos(heliYou.cRy)*25;
		bullets[bullets.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
        bullets[bullets.length-1].model.scale.set(.2,.2,.2);
        bullets[bullets.length-1].model.position.x=heliYou.model.position.x;
        bullets[bullets.length-1].model.position.y=4;
        bullets[bullets.length-1].model.position.z=heliYou.model.position.z;
        scene.add(bullets[bullets.length-1].model);*/
        
        heliYou.model.position.y+=.2;
	}
	if(key[16]=="down"){ //shoot shell
	    /*if(timeOutShell<=0){
            timeOutShell=60;
            shells[shells.length]=new Object();
            shells[shells.length-1].vX=Math.sin(heliYou.cRy)*2;
            shells[shells.length-1].vZ=Math.cos(heliYou.cRy)*2;
            shells[shells.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
            shells[shells.length-1].model.position.x=heliYou.model.position.x;
            shells[shells.length-1].model.position.y=4.5;
            shells[shells.length-1].model.position.z=heliYou.model.position.z;
            scene.add(shells[shells.length-1].model);
        }*/
        
        heliYou.model.position.y-=.2;
	}
}

//ajust camera view
document.onmousemove = function(event){
    var mouseX=event.pageX;
    var mouseY=event.pageY;
    changeX=(mouseX-screenCenterX)/25000;
    changeY=(mouseY-screenCenterY)/7500;
};