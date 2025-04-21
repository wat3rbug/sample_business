<?php
require "Tables/Finance/MainLedgerRepository.php";
require "Tables/Finance/TransactionRepository.php";
require "Tables/Finance/PurchaseOrderRepository.php";

$id= $_POST["id"];
$account = $_POST["account"];
$amount = $_POST["amount"];

if (isset($id) && isset($account) && isset($account)) {
    
    $db = new TransactionRepository();
    $db->addTransaction();
    $data = getLastTransaction();
    $cust_dict = array(
        "id" => $id,
        "account" => $account,
        "amount" => $amount,
        "transdate" => $data["transdate"]
    );
    var_dump($cust_dict);
    $db = new MainLedgerRepository();
    $db->completePurchaseOrder($cust_dict);
    $data = $db->getLastLedgerEntry();
    $db = new PurchaseOrderRepository();
    $db->addLedgerToPO($id, $data["ledger"]);
}