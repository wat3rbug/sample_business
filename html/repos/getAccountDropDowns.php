<?php
require "Tables/Finance/AccountRepository.php";

$db = new AccountRepository();
$data = $db->getPOAcctDropDown();
header('Content-type: application/json');
echo json_encode($data);
?>