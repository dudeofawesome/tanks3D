Helicopter = function(x,y,z,rx,ry,rz) {
	var build={};
		materials = [];
	while ( materials.length < 6 ) {
		materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
	}
	build.body = new THREE.Mesh( new THREE.CubeGeometry( 50, 100, 50, 1, 1, 1, materials ), new THREE.MeshBasicMaterial({color:0xffffff}) );

	//var model = new THREE.JSONLoader();
	//model.load("../models/heli.js",function(geometry){
		var material=new THREE.MeshBasicMaterial({color:0xffffff});

		build.body = new THREE.SkinnedMesh(geometry,material);

		build.body.scale.set(5,5,5);

		build.body.position.set(x,y,z);
		build.body.rotation.set(1,1,1);

		build.body.castShadow = true;
		build.body.receiveShadow = true;
	//});

	scene.add( build.body );

	return build;
};

//var build={};

Tank = function(playerID,playerUsername,x,y,z,rx,ry,rz,r2x,r2y,r2z) {              //original version: Tank = function(x,y,z,rx,ry,rz,r2x,r2y,r2z) {
	var build={};//common

	materials = [];
	while ( materials.length < 6 ) {
		materials.push( new THREE.MeshBasicMaterial( { color: Math.random() * 0xffffff } ) );
	}

	var material=new THREE.MeshBasicMaterial({color:0xffffff});
	build.body = new THREE.SkinnedMesh( new THREE.CubeGeometry( 50, 100, 50, 1, 1, 1, materials ), new THREE.MeshBasicMaterial({color:0xffffff}) );

	//var material=new THREE.MeshBasicMaterial({color:0xffffff});
	build.turret = new THREE.SkinnedMesh( new THREE.CubeGeometry( 50, 100, 50, 1, 1, 1, materials ), new THREE.MeshBasicMaterial({color:0xffffff}) );

    var bodyGeo;
    var turretGeo;
    model=new THREE.JSONLoader();
    model.load("../models/tankBody.json",function(bodyGeo){
    	var x = 0;
    	x *=1;

    	scene.remove(build.body);

    	if(playerID == me){
        	var material=new THREE.MeshLambertMaterial({color:tankColor}); //original version: var material=new THREE.MeshLambertMaterial({color:0xffffff});
    	}
    	else{
			if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
				xmlhttp=new XMLHttpRequest();
			}
			else{// code for IE6, IE5
				xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			}
			xmlhttp.onreadystatechange=function(){
				if (xmlhttp.readyState==4 && xmlhttp.status==200){
					document.getElementById("userInfo").innerHTML=xmlhttp.responseText;
				}
			}
			xmlhttp.open("GET","getUserDetails.php?q="+playerUsername,true);
			xmlhttp.send();
			
    		var material=new THREE.MeshLambertMaterial({color:0xffffff});
    	}

        build.body=new THREE.SkinnedMesh(bodyGeo,material);

        //this.tanks[counter].tankBody.doubleSided=true;
        build.body.scale.set(5,5,5);
        build.body.castShadow = true;
        build.body.receiveShadow = true;
       	build.body.position.set(x,y,z);//common

        //build.body.position.z=-500;
    });
    model.load("../models/tankTurret.json",function(turretGeo){

    	scene.remove(build.turret);

        //this.tanks[counter].tankTurret.doubleSided=true;
        var material=new THREE.MeshLambertMaterial({color:0xffffff});
        build.turret=new THREE.SkinnedMesh(turretGeo,material);
        build.turret.scale.set(5,5,5);
        build.turret.castShadow = true;
        build.turret.receiveShadow = true;

        build.turret.rotation.set(0,0,0);//common

        build.turret.position = build.body.position;

        scene.add(build.body);
        scene.add(build.turret);
    });


	//build.body = new THREE.SkinnedMesh( new THREE.CubeGeometry( 50, 100, 50, 1, 1, 1, materials ), new THREE.MeshBasicMaterial({color:0xffffff}) );
	//build.turret = new THREE.SkinnedMesh( new THREE.CubeGeometry( 50, 100, 50, 1, 1, 1, materials ), new THREE.MeshBasicMaterial({color:0xffffff}) );

	//var model = new THREE.JSONLoader();
	//model.load("../models/tankBody.js",tankBody);

	//model.load("../models/tankTurret.js",tankTurret);
	
	//build.body.scale.set(.5,.05,.3);//common

	//build.turret.scale.set(.15,.15,.15);//common

	//build.turret.position = build.body.position;

	//build.turret.position.set(build.body.position.x,build.body.position.y+4.7,build.body.position.z);//							<--for boxes

	scene.add( build.body );//common
	scene.add( build.turret );//common

	return build;//common
};

Bullet = function(x,y,z,vx,vy,vz) {
	var build={};
	build = new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));

	build.scale.set(.2,.2,.2);

	build.position.set(x,y,z);
	build.velocity = new THREE.Vector3(vx,vy,vz);

	build.castShadow = false;
	build.receiveShadow = false;

	scene.add( build );
	return build;
};

Shell = function(x,y,z,vx,vy,vz) {
	var build={};
	build = new THREE.Mesh(new THREE.SphereGeometry(1,3,3), new THREE.MeshLambertMaterial({color: 0xE3B707}));

	build.scale.set(1,1,1);

	build.position.set(x,y,z);
	build.velocity = new THREE.Vector3(vx,vy,vz);

	build.castShadow = false;
	build.receiveShadow = true;

	scene.add( build );
	return build;
};