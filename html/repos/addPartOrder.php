<?php
require "Tables/Finance/PurchaseOrderRepository.php";

$vendor = $_POST["vendor"];
// $vendor = "1";
if (isset($vendor)) {
    $db = new PurchaseOrderRepository();
    $db->createPurchaseOrder($vendor);
    $data = $db->getLastPurchaseOrder();
    header('Content-type: application/json');
    echo json_encode($data);
}
