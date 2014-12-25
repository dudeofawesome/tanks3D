<?php
	/*
		UserCake Version: 1.4
		http://usercake.com
		
		Developed by: Adam Davis
	*/
	require_once("../models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is not logged in
	if(!isUserLoggedIn()) { header("Location: ../login.php"); die(); }
?>
<html>
<head>
<title>Peace Makers</title>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0">
<script type="text/javascript" src="../Audio.js"> </script>
<!--<script type="text/javascript" src="../Sparks.js"> </script>-->
<script type="text/javascript" src="../particle.js"> </script>
<!--<script type="text/javascript" src="../jquery.js"> </script>
<script type="text/javascript" src="../jquery-ui-1.8.16.custom.min.js"> </script>-->
<script src="../Three.js"></script>
<script src="../Stats.js"></script>
<script src="tank.js"></script>
<script src="controls.js"></script>
<script src="pathing.js"></script>
<script src="../IntersectsWith.js"></script>
<script src="../drawProgressBar.js"></script>

<link rel="stylesheet" type="text/css" href="../gameStyle.css" />
<link rel='shortcut icon' href='../favicon.ico' />
</head>
<body id="body" style="overflow:hidden;background-color:black;">
	
	<div id="cursor" style="width:30px;height:30px;font-size:30px;opacity:.7;top:50%;left:50%;position:absolute;z-index:10;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;">+</div>
	<script src="java.js"></script>

	<!--iPad Controls
	<div id="stick" class="stick">
		<div id="box" class="box"></div>
		<div id="center" class="center"></div>
		<dib id="head" class="head"></div>
	</div>
	end-->

	<script type="text/javascript">
		var tankColor = '<?php
				$username = $loggedInUser->display_username;
				$userdetails = fetchUserDetails($username);
				echo($userdetails["tankColor"]);
			?>';
		setup();
	</script>

	<div id="errorMessage" style="position: static; width: 300px; height: 200px; margin: auto; color:white;">Unfortuanetly, it appears that your web browser does not support WebGL; a necessary component for modern 3D games on the internet.<br />
		Please consider upgrading to <a href="http://chrome.google.com">Google Chrome</a> in order to play this game, and, in general, a better internet experience.</div>

</body>
</html>
