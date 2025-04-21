<?php
require "Tables/Finance/MainLedgerRepository.php";
require "Tables/Finance/AccountRepository.php";


$id= $_POST["id"];

if (isset($id)) {
    $db = new MainLedgerRepository();
    $db->completePurchaseOrder($id);
}