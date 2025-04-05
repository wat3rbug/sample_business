<?php
require "Tables/Finance/UpdateFinanceRepository.php";
$id = $_POST["id"];
// $id ="3";
if (isset($id)) {
    $db = new UpdateFinanceRepository();
    $db->deleteLedgerEntry($id);
}
?>