<?php
require "Tables/Finance/PurchaseOrderRepository.php";
require "Tables/Finance/POLineItemRepository.php";
$id = $_POST["id"];

// $id = "3";
if (isset($id)) {
    $db = new POLineItemRepository();
    $db->deleteByPO($id);
    $db = new PurchaseOrderRepository();
    $db->deletePurchaseOrder($id);
}
?>