<?php
require "Tables/Finance/AccountRepository.php";
$id = $_POST["id"];
$name = $_POST["name"];
$accttype = $_POST["accttype"];

// $id = "17";
// $name = "test spool purchase";
// $accttype = "5";

$cust_dict = array(
    "id" => $id,
    "name" => $name,
    "accttype" => $accttype
);

if (isset($cust_dict)) {
    $db = new AccountRepository();
    $db->updateAccount($cust_dict);
}