function Particle()
{
	this.Update =  function()
	{

	}

	this.IsDead =  function()
	{

	}

	this.Delete =  function()
	{

	}
	
		this.Load = function()
	{

	}
}

function ParticleManager()
{
	var _particles = new Array();

	var AddParticle = function(Particle)
	{
		Particle.Load();
		_particles.push(Particle);
	}

	this.AddSmoke = function(xloc,yloc,zloc)
	{
		for (var i = 0; i <= 20; i++) {

			AddParticle(new SmokeParticle(xloc,yloc-100,zloc));
			
		};
	}

	this.AddExplosion = function()
	{

	}

	this.Update = function()
	{
		for (var i =0; i <= _particles.length-1; i++) {
			_particles[i].Update();

			if(_particles[i].IsDead() === true)
			{
				
				_particles[i].Delete();
				_particles.splice(i,1);
				i--;
			}
		};
	}

}