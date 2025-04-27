<?php
require "Tables/Finance/PurchaseOrderRepository.php";
$id= $_POST["id"];

// $id = "26";
if (isset($id)) {
    $db = new PurchaseOrderRepository();
    $db->receivePOById($id);
}