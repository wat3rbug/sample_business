<?php
require "Tables/Finance/EquityRepository.php";

$db = new EquityRepository();
$data = $db->getAllEquity();
header('Content-type: application/json');
echo json_encode($data);
?>