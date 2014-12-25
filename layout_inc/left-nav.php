
		<?php if(!isUserLoggedIn()) { ?>
          <br />
          <a href="index.php" style="cursor:hand; text-decoration:none;">Home</a><br />
          <a href="login.php" style="cursor:hand; text-decoration:none;">Login</a><br />
          <a href="register.php" style="cursor:hand; text-decoration:none;">Register</a><br />
          <a href="resend-activation.php" style="cursor:hand; text-decoration:none;">Resend Activation Email</a>
          
       <?php } else { ?>
       		<br />
          <a href="update-email-address.php" style="cursor:hand; text-decoration:none;">Update Email Address</a><br />
          <a href="change-tank-color.php" style="cursor:hand; text-decoration:none;">Change Tank Color</a><br />
          <a href="change-password.php" style="cursor:hand; text-decoration:none;">Change Password</a><br />
          <a href="upload-picture.php" style="cursor:hand; text-decoration:none;">Upload Avatar</a><br />
          <a href="logout.php" style="cursor:hand; text-decoration:none;">Logout</a>
       		
       <?php } ?>
