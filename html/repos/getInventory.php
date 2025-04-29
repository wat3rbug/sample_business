<?php
require "Tables/POS/InventoryRepository.php";
$db = new InventoryRepository();
$data = $db->getInventory();
header('Content-type: application/json');
echo json_encode($data);
?>