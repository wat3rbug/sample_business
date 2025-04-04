<?php
require "Tables/Finance/UpdateFinanceRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$transdate = $_POST["transdate"];
$amount = $_POST["amount"];

// $id = "2";
// $name = "generic expenses";
// $transdate = "2025-04-01";
// $amount = "6.75";
$cust_dict = array(
    "id" => $id,
    "transdate" => $transdate,
    "amount" => $amount,
    "name" => $name,
);

if (isset($cust_dict)) {
    $db = new UpdateFinanceRepository();
    $db->updateLedger($cust_dict);
}