<?php
require "Tables/Finance/UpdateFinanceRepository.php";
$id = $_POST["id"];
// $id ="2";
if (isset($id)) {
    $db = new UpdateFinanceRepository();
    $db->deleteLedgerEntry($id);
}
?>