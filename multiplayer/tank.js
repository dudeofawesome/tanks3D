var numberOfEnemies=2;

function tank()
{
this.health = 100;
this.tankBody=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
this.tankTurret=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
this.width=8;
this.point;
this.index=0;
this.oldX=0;
this.oldZ=0;

    this.getPointToGoTo = function()
    {
    	if(this.point == null)
    		return new THREE.Vector3(0,0,0);
    	else
        	return this.point[this.index];

    }
}


function PlayerTank () {

}


function AiTanks(){
    this.tanks = new Array();
	this.pathing = new PathFinding(40,40,-200,-200,10,10);
	
	var _playerDeadZone = new Array();
	
	this.GetTankArray = function()
	{
		return this.tanks;
	}
	
	this.setup = function()
	{
        for(var counter=0;counter <(numberOfEnemies*1);counter++){
             this.tanks.push( new tank());

             this.tanks[counter].point = this.pathing.findPath(this.pathing.getXLocation(this.tanks[counter].tankBody.position.x),
                    this.pathing.getYLocation(0),
                    this.pathing.getXLocation(0),
                    this.pathing.getYLocation(0)
            );
        }
	    this.pathing.debug();
    	this.pathing.setLocationAsOccupide(5,5);
    	this.pathing.setLocationAsOccupide(6,5);
    	this.pathing.setLocationAsOccupide(7,5);
    	this.pathing.setLocationAsOccupide(8,5);
    	this.pathing.setLocationAsOccupide(9,5);
    	this.pathing.setLocationAsOccupide(10,5);
    	this.pathing.setLocationAsOccupide(11,5);
    	this.pathing.setLocationAsOccupide(2,5);
    	this.pathing.setLocationAsOccupide(0,1);	
	}
	
	
    this.AiTankBodySetup = function(material, geometry)
    {
    	for(var counter=0;counter<numberOfEnemies;counter++){

        	this.tanks[counter].tankBody = new THREE.SkinnedMesh(geometry,material);
    		this.tanks[counter].tankBody.scale.set(5,5,5);
         	this.tanks[counter].tankBody.castShadow = true;
        	this.tanks[counter].tankBody.receiveShadow = true;
            this.tanks[counter].tankBody.position.z=-500;
            if(counter==0){
            	this.tanks[counter].tankBody.position.x=-20*(numberOfEnemies-1);
            }
            else{
            	this.tanks[counter].tankBody.position.x=this.tanks[counter-1].tankBody.position.x+20;
            }
        	
            this.tanks[counter].point = this.pathing.findPath(this.pathing.getXLocation(this.tanks[counter].tankBody.position.x),
            		this.pathing.getYLocation(this.tanks[counter].tankBody.position.z),
            		this.pathing.getXLocation(tankYou.model.position.x),
            		this.pathing.getYLocation(tankYou.model.position.z)
            );
			
    		scene.add(this.tanks[counter].tankBody);
    	}
    }
    
    this.AiTankTurretSetup = function(material, geometry)
    {
    	for(var counter=0;counter<numberOfEnemies;counter++){
        	this.tanks[counter].tankTurret = new THREE.SkinnedMesh(geometry,material);
    		this.tanks[counter].tankTurret.scale.set(5,5,5);
         	this.tanks[counter].tankTurret.castShadow = true;
        	this.tanks[counter].tankTurret.receiveShadow = true;
            this.tanks[counter].tankTurret.position.z = -100;
            if(counter==0){
            	this.tanks[counter].tankTurret.position.x=-20*(numberOfEnemies-1);
            }
            else{
            	this.tanks[counter].tankTurret.position.x=this.tanks[counter-1].tankTurret.position.x+20;
            }

            this.tanks[counter].point = this.pathing.findPath(this.pathing.getXLocation(this.tanks[counter].tankTurret.position.x),this.pathing.getYLocation(this.tanks[counter].tankTurret.position.z),this.pathing.getXLocation(tankYou.model.position.x),this.pathing.getYLocation(tankYou.model.position.z));
           
    		scene.add(this.tanks[counter].tankTurret);
    	}
    }
    //use THREE.Vector2
	  this.SetTileAsOccupied = function(x,y)
	  {
	  	this.pathing.setLocationAsOccupide(x, y);
	  } 
	  
    this.Update = function() {

        this.pathing.setGroupOfPointsAsNotOccupied(_playerDeadZone);
        _playerDeadZone = new Array();
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x),this.pathing.getXLocation( tankYou.z)));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)+1,this.pathing.getXLocation( tankYou.z)));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)-1,this.pathing.getXLocation( tankYou.z)));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x),this.pathing.getXLocation( tankYou.z)+1));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x),this.pathing.getXLocation( tankYou.z)-1));

          _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x-1),this.pathing.getXLocation( tankYou.z)-1));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)+1,this.pathing.getXLocation( tankYou.z)+1));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)-1,this.pathing.getXLocation( tankYou.z)+1));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)+1,this.pathing.getXLocation( tankYou.z)+1));

       _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)-2,this.pathing.getXLocation( tankYou.z)));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x)+2,this.pathing.getXLocation( tankYou.z)));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x),this.pathing.getXLocation( tankYou.z)+2));
      _playerDeadZone.push( new THREE.Vector2( this.pathing.getXLocation( tankYou.x),this.pathing.getXLocation( tankYou.z)-2));
      this.pathing.setGroupOfPointsAsOccupied(_playerDeadZone);

		

        for (var i = this.tanks.length - 1; i >= 0; i--) {
        	if(Math.sqrt( ((this.tanks[i].tankBody.position.x-this.tanks[i].getPointToGoTo().x)*
        			(this.tanks[i].tankBody.position.x-this.tanks[i].getPointToGoTo().x)) + 
        			((this.tanks[i].tankBody.position.z-this.tanks[i].getPointToGoTo().z)*
        					(this.tanks[i].tankBody.position.z-this.tanks[i].getPointToGoTo().z))) < 15)
            {
                this.tanks[i].index++;

                if(this.tanks[i].index > this.tanks[i].point.length-1)
                {
                	var rotation = Math.random() * 3.14;
                	 this.tanks[i].point = this.pathing.findPath(this.pathing.getXLocation(this.tanks[i].tankBody.position.x),this.pathing.getYLocation(this.tanks[i].tankBody.position.z),this.pathing.getXLocation(tankYou.x  - (Math.cos(rotation)*100)),this.pathing.getYLocation(tankYou.z- (Math.sin(rotation)*100)));


                     this.tanks[i].index = 0;
                }
            }
        	var direction = new THREE.Vector3(this.tanks[i].getPointToGoTo().x-this.tanks[i].tankBody.position.x,0,this.tanks[i].getPointToGoTo().z-this.tanks[i].tankBody.position.z);
        	this.tanks[i].tankBody.position.x += direction.normalize().x/2;
        	this.tanks[i].tankBody.position.z += direction.normalize().z/2;
        	
        	this.tanks[i].tankTurret.position.x=this.tanks[i].tankBody.position.x;
        	this.tanks[i].tankTurret.position.y=this.tanks[i].tankBody.position.y;
        	this.tanks[i].tankTurret.position.z=this.tanks[i].tankBody.position.z;
        	
            //DudeOfAwesome's
            //This is to turn the tank's body to the correct direction
        	var bodyRotation=Math.atan2(this.tanks[i].oldX-this.tanks[i].tankBody.position.x,this.tanks[i].oldZ-this.tanks[i].tankBody.position.z)-(Math.PI/2*3);
        	this.tanks[i].tankBody.rotation.y=bodyRotation;
        	
        	this.tanks[i].oldX=this.tanks[i].tankBody.position.x;
        	this.tanks[i].oldZ=this.tanks[i].tankBody.position.z;
        	
            //this is to turn the tank's turret towards the player
        	var headRotation=Math.atan2((this.tanks[i].tankBody.position.x-tankYou.model.position.x),(this.tanks[i].tankBody.position.z-tankYou.model.position.z));
        	this.tanks[i].tankTurret.rotation.y=headRotation-(Math.PI/2)-(Math.PI/2)-(Math.PI/2);

            //this is to check if the tank should shoot at the player
        	var distance=Math.sqrt(Math.pow(tankYou.model.position.x+(tankYou.width/4)-this.tanks[i].tankTurret.position.x+(this.tanks[i].width/4),2) + Math.pow((tankYou.model.position.z+(tankYou.width/4)-this.tanks[i].tankTurret.position.z+(this.tanks[i].width/4)), 2));
        	var shootingDistance=500;
        	
        	if(distance<=shootingDistance){
                //gunShot.playover();
                var accuracy=4000;
                bullets[bullets.length]={};
                bullets[bullets.length-1].vX=Math.sin(this.tanks[i].tankTurret.rotation.y-Math.PI/2)*25+Math.random() * (shootingDistance/accuracy-shootingDistance/-accuracy)+shootingDistance/-accuracy;
                bullets[bullets.length-1].vY=0;
                bullets[bullets.length-1].vZ=Math.cos(this.tanks[i].tankTurret.rotation.y-Math.PI/2)*25+Math.random() * (shootingDistance/accuracy-shootingDistance/-accuracy)+shootingDistance/-accuracy;
                bullets[bullets.length-1].model=new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));
                bullets[bullets.length-1].model.scale.set(.2,.2,.2);
                bullets[bullets.length-1].model.position.x=this.tanks[i].tankTurret.position.x;
                bullets[bullets.length-1].model.position.y=4;
                bullets[bullets.length-1].model.position.z=this.tanks[i].tankTurret.position.z;
                scene.add(bullets[bullets.length-1].model);
        	}

            //end of DudeOfAwesome's
        };
    }

}
