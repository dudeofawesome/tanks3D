<?php error_reporting(E_ALL);
ini_set('display_errors', '1');?>

<?php
	include("models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is not logged in
	if(!isUserLoggedIn()) { header("Location: login.php"); die(); }
?>

<?php

	$messageToDisplay;

	//Forms posted
	if(!empty($_POST)){
		$errors = array();
		$newColor = $_POST["colorPicker"];

		//drop the %23 from the front of the string
		$newColor = substr($newColor, 3);
	
		//Perform some validation
		//Feel free to edit / change as required
		
		if($newColor == "")
		{
			$errors[] = lang("NO_COLOR_SELECTED");
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			//This function will create the new hash and update the hash_pw property.
			$loggedInUser->updateTankColor($newColor);
			$messageToDisplay = "Color updated!";
		}
		else{
			$messageToDisplay = "Something went wrong, try again.";
		}
	}
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
				<h1>Change Your Tank's Color</h1>
				<form name="changeTankColor" action="change-tank-color.php" method="post">
					<input type="color" name="colorPicker" /><br /><br />
					<input type="submit" value="Change Color" />
				</form>
				<?php echo $messageToDisplay ?>
			</div>

		</div>

		<div style="position:absolute;bottom:10px;right:0px;">
			<a href="http://www.w3.org/html/logo/">
				<img src="http://www.w3.org/html/logo/badge/html5-badge-h-connectivity-css3-graphics-multimedia-performance.png" width="261" height="64" alt="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration" title="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration">
			</a>
		</div>
		
		<div class="usercake" style="color:#777;">&copy;Louis Orleans <a href="http://usercake.com" style="color:#777;">We use Usercake</a></div>

		<div class="usersMenu">
			<?php include("layout_inc/users-nav.php"); ?>
		</div>

	</body>
</html>