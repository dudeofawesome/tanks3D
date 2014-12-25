<?php
	if (isset($_GET['member'])) {
		$username = $_GET['member'];
	}
?>
<script type="text/javascript">
var tankColor = "0x" + '<?php
							$username = $loggedInUser->display_username;
							$userdetails = fetchUserDetails($username);
							echo($userdetails["tankColor"]);
						?>';
</script>