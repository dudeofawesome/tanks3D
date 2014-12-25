<?php
	ini_set('display_errors',1); 
	error_reporting(E_ALL);

	/*
		UserCake Version: 1.4
		http://usercake.com
		
		Developed by: Adam Davis
	*/
	require_once("models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is not logged in
	if(!isUserLoggedIn()) { header("Location: /"); die(); }
?>
<html>
	<head>
		<title>Peace Makers</title>
		<link href='http://fonts.googleapis.com/css?family=Electrolize' rel='stylesheet' type='text/css'>
		<link rel="stylesheet" type="text/css" href="style.css" />
		<link rel='shortcut icon' href='favicon.ico' />
		<script type="text/javascript" src="jquery.js"> </script>
		<script type="text/javascript" src="jquery-ui-1.8.16.custom.min.js"> </script>
		<script>
			var controlsVisible=false;

			function showControls(){
				if(controlsVisible==false){
					controlsVisible=true;
					$("#controls").fadeIn(1000);
				}
			}

			function hideControls(){
				if(controlsVisible==true){
					controlsVisible=false;
					$("#controls").fadeOut(1000);
				}
			}
		</script>
	</head>
	<body>

		<div id="controls" class="controls" style="font-size:35px;" onclick="hideControls();">
			<span style="position:absolute; right:25px; cursor:hand; font-size:15px;">Click here to close</span>
			Left Click ( hold ) - Fire machine gun<br />
			Right Click - Fire artillery shell<br />
			Mouse Move - Look around ( the closer the mouse is to the center of the screen, the slower it rotates )<br />
			W - Move forward<br />
			A - Turn left<br />
			S - Move backward<br />
			D - Turn right<br />
			<!--Space - Fly up ( if helicopter )<br />
			Shift - Fly down ( if helicopter )<br />-->
		</div>

		<div class="content">

			<div class="navLoggedIn">
				<span class="arrow"></span><a href="account.php" style="cursor:hand; text-decoration:none;"><span class="username"><?php echo $loggedInUser->display_username; ?></span><span class="profilePic"><?php $loggedInUser->displayPicture();?></span></a><div></div>
				<?php include("layout_inc/left-nav.php"); ?>
			</div>

			<div class="tank">
			</div>
			<div class="title">
				Peace Makers
			</div>
			<div class="menu">
				<a href="singleplayer/tank.php?1?0" style="font-size:30px;">Singleplayer</a>
				<br />
				&nbsp; &nbsp;<span style="font-size:14px;">Want to play on your own? Singleplayer!</span>
				<br />
				<a href="#multiplayer/tank.php" onclick="alert('Multiplayer is currently unavailable due to lack of funding for server hosting.\n Sorry :/');" style="font-size:30px;">Multiplayer</a>
				<br />
				&nbsp; &nbsp;<span style="font-size:14px;">Craving to blow up your friends? Multiplayer!</span>
				<br />
				<a href="#" onclick="showControls();" style="font-size:30px;">Controls</a>
				<br />
				&nbsp; &nbsp;<span style="font-size:14px;">Don't know how to play? Find out here!</span>
				<br />
				<a href="mailto:www.dudeofawesome@gmail.com?Subject=Feedback" style="font-size:30px;">Feedback</a>
				<br />
				&nbsp; &nbsp;<span style="font-size:14px;">Love the game? Hate the game? Tell us why!</span>
			</div>

		</div>

		<div style="position:absolute;bottom:10px;right:0px;">
			<a href="http://www.w3.org/html/logo/">
				<img src="http://www.w3.org/html/logo/badge/html5-badge-h-connectivity-css3-graphics-multimedia-performance.png" width="261" height="64" alt="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration" title="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration">
			</a>
		</div>
		
		<div class="usercake" style="color:#777;">&copy;<a href="http://0rleans.com" style="color:#777;">Louis Orleans</a></div>

		<div class="usersMenu">
			<?php include("layout_inc/users-nav.php"); ?>
		</div>

	</body>
</html>