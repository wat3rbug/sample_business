<?php
require "Tables/Finance/UpdateFinanceRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$transdate = $_POST["transdate"];
$amount = $_POST["amount"];
$entrytype = $_POST["entrytype"];

// $id = "6";
// $name = "Bambu Lab A1 printer";
// $transdate = "2025-04-02";
// $amount = "431.95";
// $entrytype = "1";
$cust_dict = array(
    "id" => $id,
    "transdate" => $transdate,
    "amount" => $amount,
    "name" => $name,
    "entrytype" => $entrytype
);

if (isset($cust_dict)) {
    $db = new UpdateFinanceRepository();
    $db->updateLedger($cust_dict);
}