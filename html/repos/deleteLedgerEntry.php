<?php
require "Tables/Finance/MainLedgerRepository.php";
$id = $_POST["id"];
// $id ="3";
if (isset($id)) {
    $db = new MainLedgerRepository();
    $db->deleteLedgerEntry($id);
}
?>