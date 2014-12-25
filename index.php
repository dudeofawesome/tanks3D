<?php
	ini_set('display_errors',1); 
	error_reporting(E_ALL);
	/*
		UserCake
		http://usercake.com
		
		Developed by: Adam Davis
	*/
	require_once("models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is already logged in
	if(isUserLoggedIn()) { header("Location: ".$websiteUrl."account.php"); die(); }
?>
<?php
	/* 
		Below is a very simple example of how to process a login request.
		Some simple validation (ideally more is needed).
	*/

//Forms posted
if(!empty($_POST))
{
		$errors = array();
		$username = trim($_POST["username"]);
		$password = trim($_POST["password"]);
	
		//Perform some validation
		//Feel free to edit / change as required
		if($username == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_USERNAME");
		}
		if($password == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			//A security note here, never tell the user which credential was incorrect
			if(!usernameExists($username))
			{
				$errors[] = lang("ACCOUNT_USER_OR_PASS_INVALID");
			}
			else
			{
				$userdetails = fetchUserDetails($username);
			
				//See if the user's account is activation
				if($userdetails["Active"]==0)
				{
					$errors[] = lang("ACCOUNT_INACTIVE");
				}
				else
				{
					//Hash the password and use the salt from the database to compare the password.
					$entered_pass = generateHash($password,$userdetails["Password"]);

					if($entered_pass != $userdetails["Password"])
					{
						//Again, we know the password is at fault here, but lets not give away the combination incase of someone bruteforcing
						$errors[] = lang("ACCOUNT_USER_OR_PASS_INVALID");
					}
					else
					{
						//Passwords match! we're good to go'
						
						//Construct a new logged in user object
						//Transfer some db data to the session object
						$loggedInUser = new loggedInUser();
						$loggedInUser->email = $userdetails["Email"];
						$loggedInUser->user_id = $userdetails["User_ID"];
						$loggedInUser->hash_pw = $userdetails["Password"];
						$loggedInUser->display_username = $userdetails["Username"];
						$loggedInUser->clean_username = $userdetails["Username_Clean"];
						
						//Update last sign in
						$loggedInUser->updateLastSignIn();
		
						$_SESSION["userCakeUser"] = $loggedInUser;
						
						//Redirect to user account page
						header("Location: ".$websiteUrl."account.php");
						echo "test test test";
						die();
					}
				}
			}
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
        <?php include($_SERVER['DOCUMENT_ROOT'] . '/libs/google-analytics.php'); ?>
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

			<div class="navLoggedOut">
				<span class="arrow"></span><a href="login.php" style="cursor:hand; text-decoration:none;">Login</a><br />
				<?php include("layout_inc/left-nav.php"); ?>
			</div>

			<div class="tank">
			</div>
			<div class="title">
				Peace Makers
			</div>
			<div class="menu">
				<h1>Login</h1>

				<?php
				if(!empty($_POST))
				{
				?>
				<?php
				if(count($errors) > 0)
				{
				?>
				<div id="errors">
				<?php errorBlock($errors); ?>
				</div>     
				<?php
				} }
				?> 

				<div id="regbox">
				    <form name="newUser" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
				    <p>
				        <label>Username:</label>
				        <input type="text" name="username" />
				    </p>
				    
				    <p>
				         <label>Password:</label>
				         <input type="password" name="password" />
				    </p>
				    
				    <p>
				        <label>&nbsp;</label>
				        <input type="submit" value="Login" class="submit" />
				    </p>

				    </form>

				    <a href="register.php">Don't have an account yet?<br />Sign up here</a>
				</div>
			</div>

		</div>
		<div style="position:absolute;bottom:10px;right:0px;">
			<a href="http://www.w3.org/html/logo/">
				<img src="http://www.w3.org/html/logo/badge/html5-badge-h-connectivity-css3-graphics-multimedia-performance.png" width="261" height="64" alt="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration" title="HTML5 Powered with Connectivity / Realtime, CSS3 / Styling, Graphics, 3D &amp; Effects, Multimedia, and Performance &amp; Integration">
			</a>
		</div>
		<div class="usercake" style="color:#777;">&copy;<a href="http://0rleans.com">Louis Orleans</a> <a href="http://usercake.com" style="color:#777;">We use Usercake</a></div>
	</body>
</html>