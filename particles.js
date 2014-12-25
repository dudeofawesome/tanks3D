function particles(parts){
	//// EMITTER STUFF
	var h = 0;
	var s = 0;
	var v = 0;
	
	var callback = function() {

		var material = new THREE.ParticleCanvasMaterial( {  program: SPARKS.CanvasShadersUtils.circles, blending:THREE.AdditiveBlending } );
		
		var rand=Math.floor(Math.random()*2);

		switch(rand){
			case 0:
				h=.236;
				s=.2;
				v=.2;
			break;
			case 1:
				h=.236;
				s=.18;
				v=.2;
			break;
			case 2:
				h=.236;
				s=.206;
				v=.2;
			break;
		}

		material.color.setRGB(h, s, v); //0.7
		//material.color.setHSV(h, 95.5, 88.7); //0.7
		
		particle = new THREE.Particle( material );

		particle.scale.x = particle.scale.y = 1 + Math.random()*3;
		group.add( particle );	

		return particle;
	};

	
	
	sparksEmitter = new SPARKS.Emitter(new SPARKS.SteadyCounter(100));

	sparksEmitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( parts ) ) );
	sparksEmitter.addInitializer(new SPARKS.Lifetime(0,3));
	sparksEmitter.addInitializer(new SPARKS.Target(null, callback));
	sparksEmitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,100,00))));
	

	sparksEmitter.addAction(new SPARKS.Age());
	sparksEmitter.addAction(new SPARKS.Move()); 
	sparksEmitter.addAction(new SPARKS.RandomDrift(2*3000,3000,2*3000));
	sparksEmitter.addAction(new SPARKS.Accelerate(10,-40,10));
	
	
	sparksEmitter.addCallback("created", function(particle) {
		particle.target.position = particle.position;	
	});
	sparksEmitter.addCallback("dead", function(particle) {
		particle.target.visible = false; // is this a work around?
		group.remove(particle.target); 
	});

	sparksEmitter.start();
}