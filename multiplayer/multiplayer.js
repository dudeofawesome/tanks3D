scene=new THREE.Scene();

/*
 * Multiplayer Engine Demo
 * @author Josh Gibbs - uPaymeiFixit@gmail.com
*/ console.log("r05071906 at " + new Date());

if ( typeof io !== "undefined" ) {
// socket = io.connect('http://upaymeifixit.dlinkddns.com:4000');
socket = io.connect('http://tanks3d-0rleans.rhcloud.com:80');
} else {
	socket = { on: function() { return null; } };
}

player = [];
bullets = [];
shells = [];
var me;

// nothing is in here, but this is the first event to fire (this socket)
socket.on("connect", function(){
	console.log("Socket ID: " + socket.socket.sessionid);
	console.log(socket);
});



// assigns the me id and loads all other client data
socket.on("loadPlayers", function( id, clients ) {
	console.log( "loadPlayers fired with data { id: " + id + ", clients: " + clients + " }" );
	me = id;

	// Make other players
	for (var i = 0; i < clients.length; i++) {
		if ( clients[i][0][1] > 0 ) { // If y > 0 then add helicopter
			player.push(Helicopter(
								clients[i][0][0], /*x*/
								clients[i][0][1], /*y*/
								clients[i][0][2], /*z*/
								clients[i][0][3], /*rx*/
								clients[i][0][4], /*ry*/
								clients[i][0][5]  /*rz*/
							));
		} else {
			player.push(Tank(
								i,										//					<-------this line
								myUsername,								//					<-------this line
								clients[i][0][0], /*x*/
								clients[i][0][1], /*y*/
								clients[i][0][2], /*z*/
								clients[i][0][3], /*rx*/
								clients[i][0][4], /*ry*/
								clients[i][0][5], /*rz*/
								clients[i][0][6], /*r2x*/
								clients[i][0][7], /*r2y*/
								clients[i][0][8]  /*r2z*/
							));
		}

		// Make new bullets
		for (var j = 0; j < clients[i][1].length; j++) {
			bullets.push(Bullet(
								clients[i][1][j][0], /*x*/
								clients[i][1][j][1], /*y*/
								clients[i][1][j][2], /*z*/
								clients[i][1][j][3], /*vx*/
								clients[i][1][j][4], /*vy*/
								clients[i][1][j][5]  /*vz*/
								));
		}

		// Make new shells
		for ( j = 0; j < clients[i][2].length; j++) {
			shells.push(Bullet(
								clients[i][2][j][0], /*x*/
								clients[i][2][j][1], /*y*/
								clients[i][2][j][2], /*z*/
								clients[i][2][j][3], /*vx*/
								clients[i][2][j][4], /*vy*/
								clients[i][2][j][5]  /*vz*/
								));
		}


	}


	console.log("loadPlayers has finished loading players, logging players below:");
	console.log(player);
});


socket.on("addPlayer", function( client ) {
	console.log( "addPlayer fired with data { client: " + client + " }" );
	

	if ( client[0][1] > 0 ) { // If y > 0 then add helicopter
		player.push(Helicopter(
							client[0][0], /*x*/
							client[0][1], /*y*/
							client[0][2], /*z*/
							client[0][3], /*rx*/
							client[0][4], /*ry*/
							client[0][5]  /*rz*/
						));
	} else {
		player.push(Tank(
							client,										//					<-------this line
							client[0][0], /*x*/
							client[0][1], /*y*/
							client[0][2], /*z*/
							client[0][3], /*rx*/
							client[0][4], /*ry*/
							client[0][5], /*rz*/
							client[0][6], /*r2x*/
							client[0][7], /*r2y*/
							client[0][8]  /*r2z*/
						));
	}

	//README – the above four chunks could be put into a function because
	// they exist elsewhere. I just need to make it so that when the server
	// emmits addPlayer, it wraps the data in an extra array so that the data
	// is in a consisitant format
	// the function would look something like this:
	// addClient(clients[i])
	// function addClient( cl ) { // cl[1][j][0] }

// okay, new note to self, the above is crap. I fixed it - ish.
// there really needs to just me a new vehicle method


	if ( player.length == me + 1 ) {
		setup();
	}
});

// this thing is melting my brain <-- yum!

// receives data from the server at a regular interval (all sockets)
socket.on('message', function( clients ) {
	//console.log(clients)
	sendData();
	for (var i = 0; i < clients.length; i++) {
		if ( i != me ) {

			// Update positions
			//console.log(i + ", " + clients[i][0][0] + ", " + clients[i][0][1] + ", " + clients[i][0][2]);
			player[i].body.position.set(clients[i][0][0],clients[i][0][1],clients[i][0][2]);
			player[i].body.rotation.set(clients[i][0][3],clients[i][0][4],clients[i][0][5]);
			if ( player[i].turret ) {
				//player[i].turret.position.set(clients[i][0][0],clients[i][0][1]+4.7,clients[i][0][2]);
				//player[i].turret.rotation.set(clients[i][0][6],clients[i][0][7],clients[i][0][8]);
			}
			
			// Make new bullets
			for (var j = 0; j < clients[i][1].length; j++) {
				bullets.push(Bullet(
									clients[i][1][j][0], /*x*/
									clients[i][1][j][1], /*y*/
									clients[i][1][j][2], /*z*/
									clients[i][1][j][3], /*vx*/
									clients[i][1][j][4], /*vy*/
									clients[i][1][j][5]  /*vz*/
									));
			}

			// Make new shells
			for ( j = 0; j < clients[i][2].length; j++) {
				var a=new THREE.Vector3(clients[i][2][j][0],clients[i][2][j][1],clients[i][2][j][2])
				var volume=1-(player[me].body.position.distanceTo(a)/2000);
	            if(volume<0){
	                volume=0;
	            }
	            artilleryShot.volume=volume;
	            artilleryShot.playover();

				shells.push(Shell(
									clients[i][2][j][0], /*x*/
									clients[i][2][j][1], /*y*/
									clients[i][2][j][2], /*z*/
									clients[i][2][j][3], /*vx*/
									clients[i][2][j][4], /*vy*/
									clients[i][2][j][5]  /*vz*/
									));
			}
		}

	}
});

socket.on("disconnect", function( cID ){
      console.log("Removing cID " + cID );
      scene.remove( player[cID] );
      player.splice(cID,1);
      me = cID < me ? --me : me;
      console.log( "My ID is now " + me );
});

function sendData() {
	var data =	[
					[
						player[me].body.position.x,
						player[me].body.position.y,
						player[me].body.position.z,
						player[me].body.rotation.x,
						player[me].body.rotation.y,
						player[me].body.rotation.z,
						camera.rotation.x,
						camera.rotation.y,
						camera.rotation.z
					],
				data_bullets,
				data_shells];
				//console.log(data)

	socket.emit( "message", data );
	data_bullets = [];
	data_shells = [];
}
// [[bullet], ..., [bullet]]
var data_bullets = [];
function addBulletData( o ) {
	data_bullets.push([o.position.x, o.position.y, o.position.z, o.velocity.x, o.velocity.y, o.velocity.z]);
}

var data_shells = [];
function addShellData( o ) {
	data_shells.push([o.position.x, o.position.y, o.position.z, o.velocity.x, o.velocity.y, o.velocity.z]);
}

/**

First is player
	First is vehicle
		First is x
		Second is y
		...
		Ninth is r2z
	Second is bullets
		First is first bullet
		...
		N is Nth bullet
	Third is shells
		First is first shell
		...
		N is Nth shell
[

]

*/