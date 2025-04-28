<?php
require "Tables/POS/MaterialRepository.php";

$db = new MaterialRepository();
$data = $db->getMaterials();
header('Content-type: application/json');
echo json_encode($data);
?>