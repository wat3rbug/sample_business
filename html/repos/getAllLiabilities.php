<?php
require "Tables/Finance/LiabilityRepository.php";

$db = new LiabilityRepository();
$data = $db->getAllLiabilities();
header('Content-type: application/json');
echo json_encode($data);
?>