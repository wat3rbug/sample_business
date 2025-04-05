<?php
require "Tables/Finance/UpdateFinanceRepository.php";

$id = $_POST["id"];
// $id = "12";
if (isset($id)) {
    $db = new UpdateFinanceRepository();
    $data = $db->getLedgerEntryById($id);
    header('Content-type: application/json');
    echo json_encode($data);
} 
?>