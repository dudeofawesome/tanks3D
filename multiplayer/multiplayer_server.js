/*
 * Multiplayer Engine Demo
 * @author Josh Gibbs - uPaymeiFixit@gmail.com
*/ console.log("r05081918 at " + new Date());

/********** SERVER_SIDE_SCRIPT **********/

/* FIXME - How does the client know what type all of the other items are? */
/* We will experiment with leaving the last indexes undefined for helicopters */

var io,
    client = [], // Data for clients **client[0] = "hello"**
    cID = [], // Contains unorganized intexes as socket.id s **cID[socket.id] = 0**
    sID = []; // Contains organized intex with data as socket.id s **sID[0] = socket.id**

//[x,y,z, rx1,ry1,rz1, rx2,ry2,rz2]
var spawnpoints = [
                    [ /* Tank */
                      [0,0,0,0,0,0,0,0,0],
                      [300,0,0,0,0,0,0,0,0],
                      [200,0,200,0,0,0,0,0,0]
                    ],
                    [ /* Helicopter */
                      [0,100,0,0,0,0,0,0,0],
                      [300,100,0,0,0,0,0,0,0],
                      [200,100,200,0,0,0,0,0,0]
                    ]
                  ];


( function() {
  io = require( 'socket.io' ).listen( 4000 );

  // io.set('log level', 1);

  setInterval( function(){
    io.sockets.emit("message", client );
    //console.log("client.length = " + client.length + ", client[0] = " + client[0] + ", client[1] = " + client[1] );
  }, 1000/30 );



  // This is for the multiplayer menu
  // setInterval( function(){
  //   io.sockets.emit("playerCount", sID.length );
  // }, 10000 );



  // Connection -- starts connection
  io.sockets.on( 'connection', function( socket ) {
    cID[socket.id] = sID.push(socket.id) - 1; // cID = sID.length; sID pushes socket.id
    //
    console.log("Client with SID: " + socket.id + " and CID: " + cID[socket.id] + " has connected.");
    console.log("There are now " + sID.length + " clients.");

    socket.emit( "loadPlayers", ( sID.length - 1 ), client );

    // Assigns data to new player ( if sID is even they will be a tank )
    //console.log("new player, sID%2 = " + sID.length % 2);
    client[cID[socket.id]] = spawnpoints[ sID.length % 2 ][ Math.floor( Math.random() * spawnpoints[ sID.length % 2 ].length ) ];

    io.sockets.emit( "addPlayer", client[cID[socket.id]] );


    // On message received
    socket.on("message", function(data){
      //

      client[cID[socket.id]] = data; // assigns that client data
    });

    socket.on("mobileconsole", function( data ) {
      io.sockets.emit( "mobileconsole", data );
    });


    // This is for the multiplayer menu
    socket.on("requestCount",function(){
      socket.emit("playerCount", sID.length );
    });



    // Disconnect -- removes client
    return socket.on( 'disconnect', function() {
      //
      io.sockets.emit("disconnect", cID[socket.id] );
      console.log("Client with SID: " + socket.id + " and CID: " + cID[socket.id] + " is disconnecting.");

      // Removes all of the client data
      client.splice(cID[socket.id],1);
      sID.splice(cID[socket.id],1);
      var n = cID[socket.id];
      delete cID[socket.id];
      for (var i = n; i < sID.length; i++) {
        --cID[sID[i]];
      }

      console.log("There are now " + sID.length + " clients.");
    });




  });
}).call(this);