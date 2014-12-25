<?php
error_reporting(E_ALL);
ini_set('display_errors', '1');
	/*
		UserCake Version: 1.4
		http://usercake.com
		
		Developed by: Adam Davis
	*/

	//General Settings
	//--------------------------------------------------------------------------
	
	//Database Information
	$dbtype = "mysql"; 
	$db_host = "tank3dsql.0rleans.com";
	$db_user = "tank3dsql";
	$db_pass = "phonelamppostdonkey";
	$db_name = "tank3dsql_cake";
	$db_port = "3306";
	$db_table_prefix = "userCake_";

	$langauge = "en";
	
	//Generic website variables
	$websiteName = "Peace Makers";
	$websiteUrl = "http://tank3d.0rleans.com/"; //including trailing slash

	//Do you wish UserCake to send out emails for confirmation of registration?
	//We recommend this be set to true to prevent spam bots.
	//False = instant activation
	//If this variable is falses the resend-activation file not work.
	$emailActivation = false;

	//In hours, how long before UserCake will allow a user to request another account activation email
	//Set to 0 to remove threshold
	$resend_activation_threshold = 1;
	
	//Tagged onto our outgoing emails
	$emailAddress = "noreply@tank3d.0rleans.com";
	
	//Date format used on email's
	$emailDate = date("l \\t\h\e jS");
	
	//Directory where txt files are stored for the email templates.
	$mail_templates_dir = "models/mail-templates/";
	
	$default_hooks = array("#WEBSITENAME#","#WEBSITEURL#","#DATE#");
	$default_replace = array($websiteName,$websiteUrl,$emailDate);
	
	//Display explicit error messages?
	$debug_mode = true;

	//Set Timeout for online users
	$userOnlineTime = 10; // Timeout in minutes
	//---------------------------------------------------------------------------
?>