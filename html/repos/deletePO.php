<?php
require "Tables/Finance/POLineItemRepository.php";
require "Tables/Finance/MainLedgerRepository.php";
require "Tables/Finance/PurchaseOrderRepository.php";

$id = $_POST["id"];
// $id = "26";

if (isset($id)) {
    $db = new POLineItemRepository();
    $db->deleteByPO($id);
    $db = new PurchaseOrderRepository();
    $data = $db->getPurchaseOrderById($id);
    $db->deletePurchaseOrder($id);
    $db = new MainLedgerRepository();
    $db->deleteLedgerEntry($data[0]["ledger"]);
}