<?php
require "Tables/Finance/PurchaseOrderRepository.php";

// $id = $_POST["id"];
$id = "26";

if (isset($id)) {
    $db = new PurchaseOrderRepository();
    $data = $db->getOfficalPurchaseOrderById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}