<?php
require "Tables/Finance/AccountRepository.php";

$name = $_POST["name"];
$accttype = $_POST["accttype"];
// $name ="test";
// $accttype = "1";

$customer_dict = array(
    "name" => $name,
    "accttype" => $accttype,
);

$db = new AccountRepository();
$db->createAccount($customer_dict);
?>