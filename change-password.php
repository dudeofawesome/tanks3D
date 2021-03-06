<?php
	/*
		UserCake Version: 1.4
		http://usercake.com
		
		Developed by: Adam Davis
	*/
	include("models/config.php");
	
	//Prevent the user visiting the logged in page if he/she is not logged in
	if(!isUserLoggedIn()) { header("Location: login.php"); die(); }
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
		$password = $_POST["password"];
		$password_new = $_POST["passwordc"];
		$password_confirm = $_POST["passwordcheck"];
	
		//Perform some validation
		//Feel free to edit / change as required
		
		if(trim($password) == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_PASSWORD");
		}
		else if(trim($password_new) == "")
		{
			$errors[] = lang("ACCOUNT_SPECIFY_NEW_PASSWORD");
		}
		else if(minMaxRange(8,50,$password_new))
		{	
			$errors[] = lang("ACCOUNT_NEW_PASSWORD_LENGTH",array(8,50));
		}
		else if($password_new != $password_confirm)
		{
			$errors[] = lang("ACCOUNT_PASS_MISMATCH");
		}
		
		//End data validation
		if(count($errors) == 0)
		{
			//Confirm the hash's match before updating a users password
			$entered_pass = generateHash($password,$loggedInUser->hash_pw);
			
			//Also prevent updating if someone attempts to update with the same password
			$entered_pass_new = generateHash($password_new,$loggedInUser->hash_pw);
		
			if($entered_pass != $loggedInUser->hash_pw)
			{
				//No match
				$errors[] = lang("ACCOUNT_PASSWORD_INVALID");
			}
			else if($entered_pass_new == $loggedInUser->hash_pw)
			{
				//Don't update, this fool is trying to update with the same password ¬¬
				$errors[] = lang("NOTHING_TO_UPDATE");
			}
			else
			{
				//This function will create the new hash and update the hash_pw property.
				$loggedInUser->updatePassword($password_new);
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
				<h1>Change Password</h1>

				<?php
				    if(!empty($_POST))
				    {
						if(count($errors) > 0)
						{
				    ?>
				    <div id="errors">
				    <?php errorBlock($errors); ?>
				    </div>     
				    <?php } else { ?> 
				    <div id="success">
				       <p><?php echo lang("ACCOUNT_DETAILS_UPDATED"); ?></p>
				    </div>
				<?php } }?>



				<div id="regbox">
				    <form name="changePass" action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
				    
				        <p>
				            <label>Password:</label>
				            <input type="password" name="password" />
				        </p>
				        
				        <p>
				            <label>New Pass:</label>
				            <input type="password" name="passwordc" />
				        </p>
				        
				        <p>
				            <label>Confirm Pass:</label>
				            <input type="password" name="passwordcheck" />
				        </p>
				        
						<p>
				            <label>&nbsp;</label>
				            <input type="submit" value="Update Password" class="submit" />
				       </p>
				            
				    </form>

					<div class="clear"></div>
				</div>
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