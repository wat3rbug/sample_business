<?php
require "Tables/Finance/AssetRepository.php";

$db = new AssetRepository();
$data = $db->getAllAssets();
header('Content-type: application/json');
echo json_encode($data);
?>