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

		<!-- <script src="http://upaymeifixit.dlinkddns.com:4000/socket.io/socket.io.js"></script> -->
		<script src="socket.io.js"></script>
		<script type="text/javascript" src="../Audio.js"> </script>
		<script type="text/javascript" src="../drawProgressBar.js"></script>

		<script src="../Stats.js"></script>
		<script src="../Three.js"></script>

		<link rel="stylesheet" type="text/css" href="../gameStyle.css" />
		<link rel='shortcut icon' href='../favicon.ico' />

		<meta name="viewport" content="user-scalable=false" />
	</head>
	<body id="body" style="overflow:hidden;background-color:black;">
		
		<div id="cursor" style="width:30px;height:30px;font-size:30px;opacity:.7;top:50%;left:50%;position:absolute;z-index:10;-webkit-touch-callout: none;-webkit-user-select: none;-khtml-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;">+</div>
		

		<script src="controls.js"></script>

		<!--iPad Controls
		<div id="stick" class="stick">
			<div id="box" class="box"></div>
			<div id="center" class="center"></div>
			<dib id="head" class="head"></div>
		</div>
		end-->

		<script type="text/javascript">
			var tankColor = "0x" + '<?php
					$username = $loggedInUser->display_username;
					$userdetails = fetchUserDetails($username);
					echo($userdetails["tankColor"]);
				?>';

			var myUsername = '<?php $loggedInUser->display_username; ?>';
		</script>

		<script src="java.js"></script>

		<script type="text/javascript" src="makeobject.js"> </script>
		<script type="text/javascript" src="multiplayer.js"> </script>
		

		<!--<script src="tank.js"></script>
		<script src="pathing.js"></script>-->

		<div id="userInfo" style="display:none;">

		</div>

	</body>
</html>