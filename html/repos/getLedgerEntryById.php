<?php
require "Tables/Finance/MainLedgerRepository.php";

$id = $_POST["id"];
// $id = "6";
if (isset($id)) {
    $db = new MainLedgerRepository();
    $data = $db->getLedgerEntryById($id);
    header('Content-type: application/json');
    echo json_encode($data);
} 
?>