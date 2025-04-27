<?php
require "Tables/Finance/PurchaseOrderRepository.php";
$id= $_POST["id"];

if (isset($id)) {
    $db = new PurchaseOrderRepository();
    $db->shipPOById($id);
}