var	SmokeMaterial = new THREE.ParticleBasicMaterial({
      color: 0xFFFFFF,
        size: 0.5,
        map: THREE.ImageUtils.loadTexture(
            "Content/particle.png"
        ),
        transparent: true
    });

function SmokeParticle(xlocation, ylocation, zlocation)
{
	var _smoke = new THREE.Particle(SmokeMaterial);
	var _time = 50;
	
	var _xvel = (Math.random()*5)-1;
	var _yvel = (Math.random()*5)-1;
	var _zvel = (Math.random()*5)-1;
	this.Load = function()
	{
		
		_smoke.position.x = xlocation +Math.random() * 300 ;
		_smoke.position.y = ylocation+Math.random() * 300 ;
		_smoke.position.z = zlocation+Math.random() * 300 ;
	
			_smoke.rotation.z = 180;

		//	var GridGeometry = new THREE.Geometry();
		 // GridGeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(_smoke.position.x,_smoke.position.y, _smoke.position.z)));
		//   GridGeometry.vertices.push(new THREE.Vertex(new THREE.Vector3(_smoke.position.x,_smoke.position.y+5, _smoke.position.z)));
		//		scene.add(new THREE.Line(  GridGeometry,linematerial));
		Scene.add(_smoke);
	}

	this.Update =  function()
	{
	//	_smoke.position.x += _xvel;
	//	_smoke.position.y += _yvel;
		//_smoke.position.z += _zvel;

		//_smoke.material.opacity -= 0.001;
		//if(	_smoke.material.opacity <= 0)
		//{
		//	_smoke.material.opacity  = 0;
		//}
	}

	this.IsDead =  function()
	{
		
		if(_time <= 0)
		{
			return true;
		}
		_time-= 1;
	}

	this.Delete =  function()
	{
		Scene.remove(_smoke);

	}
}