<?php
require "Tables/Finance/AccountRepository.php";

// $id = "7";
$id = $_POST["id"];
$db = new AccountRepository();
$data = $db->deleteAccount($id);
?>