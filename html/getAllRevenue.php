<?php
require "Tables/Finance/RevenueRepository.php";

$db = new RevenueRepository();
$data = $db->getAllRevenue();
header('Content-type: application/json');
echo json_encode($data);
?>