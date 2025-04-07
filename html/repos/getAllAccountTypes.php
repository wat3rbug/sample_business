<?php
require "Tables/Finance/AccountRepository.php";

$db = new AccountRepository();
$data = $db->getAllAccountTypes();
header('Content-type: application/json');
echo json_encode($data);
?>