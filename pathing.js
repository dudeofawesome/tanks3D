

 var linematerial = new THREE.LineBasicMaterial({
    color: 0x0000ff,
});
 var lineRedmaterial = new THREE.LineBasicMaterial({
    color: 0xff0000,
});
function PathFinding(width,height,xoffset,yoffset,widthOfTile,heightOfTile)
{
	//delecratons///////////////////////////////////////////////////////////////
	this.grid = new Array();

	//construcor///////////////////////////////////////////////////////////////
	for (var x = 0; x < width; x++) {
		this.grid.push(new Array);
		for (var y = 0; y < height; y++) {
			this.grid[x].push(0);
		};
	};
	
	//PRIVATE///////////////////////////////////////////////////////////////
	var hasBeenSearched = new Array();
	var GridGeometry ;
	var node = function node(node,x,y)
	{
		
		
		this.node = node;
		this.nodex = x;
		this.nodey = y;
	}
	var checkIfTileIsViable = function(x,y)
	{
		if(x < 0 || y < 0 || x > width-1 || y > height-1)
		{
			return false;
		}
	//	console.log("X:" + x,"Y:"+y);
		return hasBeenSearched[x][y];	
	}

	//public///////////////////////////////////////////////////////////////
	this.debug = function()
	{

	}

	this.setLocationAsOccupide = function(x,y)
	{
		if(x < width || x > 0|| y < height || y > 0)
		{
			this.grid[x][y] = 1;
			
		}
	}
	this.setLocationAsNotOccupide = function(x,y)
	{
		if(x < width || x > 0|| y < height || y > 0)
		{
			this.grid[x][y] = 0;
			
		}
	}

	//get the location on the node grid
	this.getXLocation = function(xlocation)
	{
		return Math.round((xlocation-xoffset)/widthOfTile);
	}
	this.getYLocation = function(ylocation)
	{
		return Math.round((ylocation-yoffset)/heightOfTile);
	}

	this.setGroupOfPointsAsOccupied = function(items)
	{
		for (var i = items.length - 1; i >= 0; i--) {
			this.setLocationAsOccupide(items[i].x,items[i].y);
		};
	}
	this.setGroupOfPointsAsNotOccupied = function(items)
	{
			for (var i = items.length - 1; i >= 0; i--) {
			this.setLocationAsNotOccupide(items[i].x,items[i].y)
		};
	}
		
	//generates the path
	this.findPath = function(startXLocation,startYLocation,endXLocation,endYLocation)
	{
	
		
				var nodes = new Array();
		var Points = new Array();
		var searchNode = new Array();
		
		if(startXLocation >width  ||startYLocation <0|| endYLocation > height || endYLocation < 0)
		{
			Points.push(new THREE.Vector3(0,0,0));
			return Points;
		}
		if(this.grid[startXLocation][startYLocation] === 1||this.grid[endXLocation][endYLocation] === 1)
		{
				Points.push(new THREE.Vector3(startXLocation,0,startYLocation));
					return Points;
		}

		hasBeenSearched = new Array();
			for (var x = 0; x < width; x++) {
				hasBeenSearched.push(new Array());
				for (var y = 0; y < height; y++) {
					hasBeenSearched[x].push(true);
					};
			};
	
	

		nodes.push(new node(null,endXLocation,endYLocation));
		while (true){
			var exit = false;
			for (var i = nodes.length - 1; i >= 0; i--) {
				
				if(nodes[i].nodex === startXLocation && nodes[i].nodey === startYLocation)
				{
					searchNode = nodes[i];
					exit= true;
					break;
				}
				if(checkIfTileIsViable(nodes[i].nodex-1,nodes[i].nodey) === true)
				{
					if(this.grid[nodes[i].nodex-1][nodes[i].nodey] !== 1)
					{
						hasBeenSearched[nodes[i].nodex-1][nodes[i].nodey] = false;
						searchNode.push(new node(nodes[i],nodes[i].nodex-1,nodes[i].nodey));
					}
				}

				if(checkIfTileIsViable(nodes[i].nodex+1,nodes[i].nodey) === true)
				{
					if(this.grid[nodes[i].nodex+1][nodes[i].nodey] !== 1)
					{
						hasBeenSearched[nodes[i].nodex+1][nodes[i].nodey] = false;
						searchNode.push(new node(nodes[i],nodes[i].nodex+1,nodes[i].nodey));
					}
				}

				if(checkIfTileIsViable(nodes[i].nodex,nodes[i].nodey+1) === true)
				{
					if(this.grid[nodes[i].nodex][nodes[i].nodey+1] !== 1)
					{
						hasBeenSearched[nodes[i].nodex][nodes[i].nodey+1] = false;
						searchNode.push(new node(nodes[i],nodes[i].nodex,nodes[i].nodey+1));
					}
				}
				
				if(checkIfTileIsViable(nodes[i].nodex,nodes[i].nodey-1) === true)
				{
					if(this.grid[nodes[i].nodex][nodes[i].nodey-1] !== 1)
					{
						hasBeenSearched[nodes[i].nodex][nodes[i].nodey-1] = false;
						searchNode.push(new node(nodes[i],nodes[i].nodex,nodes[i].nodey-1));
					}
				}
			};
							if(nodes.length-1 < 0)
				{
					Points.push(new THREE.Vector3(startXLocation,0,startYLocation));
					return Points;
				}
			if(exit === true) break;
			nodes =searchNode;
		}
		var ptdebug = new THREE.Geometry();
		while(true)
		{
			Points.push(new THREE.Vector3((searchNode.nodex * widthOfTile) +xoffset + (widthOfTile/2) ,0,(searchNode.nodey*heightOfTile)+ yoffset+(heightOfTile/2)));
			    ptdebug.vertices.push(new THREE.Vector3(new THREE.Vector3((searchNode.nodex * widthOfTile) +xoffset + (widthOfTile/2) ,5,(searchNode.nodey*heightOfTile)+ yoffset+(heightOfTile/2))));
			searchNode = searchNode.node;
			if(searchNode.node === null)
			{
				break;
			}
		}

		
		//more grid lines
		//scene.add(new THREE.Line(ptdebug,lineRedmaterial));
		return Points;

	}
	

	
}