<?php

public function displayUsers
	{
	global $db,$db_table_prefix;
		$out = "";
		$sql="SELECT COUNT(Username) FROM userCake_Users_Online";
			$sql_result = $db->sql_query($sql);
			$row = mysql_fetch_array($sql_result);
			$totalGroups=$row[0];
			$sql = "SELECT * FROM ".$db_table_prefix."Users";
			$sql_result = $db->sql_query($sql);
				$out= $out. '<table valign="top"><tr><td>';
				while ($row = mysql_fetch_array($sql_result)) {
				$Name = $row["Username"]; 
					$out= $out. ''; 
					$out= $out. "<div>$Name</div><br/> ";}
			$out= $out. '</td></tr></table>';
		return $out;
}

?>