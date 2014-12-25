function particleFire(){
	threexSparks	= new THREEx.Sparks({
		maxParticles	: 50,
		counter		: new SPARKS.SteadyCounter(20)
	});

	// setup the emitter
	var emitter	= threexSparks.emitter();

	var initColorSize	= function(){
		this.initialize = function( emitter, particle ){
			particle.target.color().setHSV(0.1, 0.9, 0.4);
			particle.target.size(150);
		};
	};


	emitter.addInitializer(new initColorSize());
	emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3(0,0,0) ) ) );
	emitter.addInitializer(new SPARKS.Lifetime(0,0.8));
	emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,200,00))));

	emitter.addAction(new SPARKS.Age());
	emitter.addAction(new SPARKS.Move());
	emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));
	emitter.addAction(new SPARKS.Accelerate(0,-200,0));
}

function particleSmoke(){
	threexSparks	= new THREEx.Sparks({
		maxParticles	: 50,
		counter		: new SPARKS.SteadyCounter(20)
	});

	// setup the emitter
	var emitter	= threexSparks.emitter();

	var initColorSize	= function(){
		this.initialize = function( emitter, particle ){
			particle.target.color().setHSV(0.1, 0.9, 0.4);
			particle.target.size(150);
		};
	};


	emitter.addInitializer(new initColorSize());
	emitter.addInitializer(new SPARKS.Position( new SPARKS.PointZone( new THREE.Vector3(0,0,0) ) ) );
	emitter.addInitializer(new SPARKS.Lifetime(0,0.8));
	emitter.addInitializer(new SPARKS.Velocity(new SPARKS.PointZone(new THREE.Vector3(0,200,00))));

	emitter.addAction(new SPARKS.Age());
	emitter.addAction(new SPARKS.Move());
	emitter.addAction(new SPARKS.RandomDrift(1000,0,1000));
	emitter.addAction(new SPARKS.Accelerate(0,-200,0));
}

function updateParticleLocation(newLocation){
	
}