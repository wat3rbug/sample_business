<?php
require "Tables/Finance/MainLedgerRepository.php";
require "Tables/Finance/TransactionRepository.php";
require "Tables/Finance/PurchaseOrderRepository.php";

$id= $_POST["id"];
$account = $_POST["account"];
$amount = $_POST["amount"];
$name = $_POST["name"];
$entrytype = $_POST["entrytype"];
$eta = $POST["scheduled"];
// $id = "15";
// $account = "4";
// $amount = "49.99";
// $name = "test po";
// $entrytype = "1";

if (isset($id) && isset($account) && isset($account)) {
    
    $db = new TransactionRepository();
    $db->addTransaction();
    $data = $db->getLastTransaction();
    // var_dump($data);
    $cust_dict = array(
        "id" => $id,
        "account" => $account,
        "amount" => $amount,
        "transdate" => $data[0]["id"],
        "name" => $name,
        "entrytype" => $entrytype,
        "scheduled" => $eta
    );
    // var_dump($cust_dict);
    $db = new MainLedgerRepository();
    $db->completePurchaseOrder($cust_dict);
    $data = $db->getLastLedgerEntry();
    // var_dump($data);
    $db = new PurchaseOrderRepository();
    $db->addLedgerToPO($id, $data[0]["id"]);
}