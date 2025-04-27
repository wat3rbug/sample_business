<?php
require "Tables/Finance/PurchaseOrderRepository.php";

$db = new PurchaseOrderRepository();
$data = $db->getIncompletePurchaseOrders();
header('Content-type: application/json');
echo json_encode($data);
?>
