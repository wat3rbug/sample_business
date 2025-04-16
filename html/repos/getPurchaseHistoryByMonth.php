<?php
require "Tables/Finance/MainLedgerRepository.php";
$current = $_POST["current"];

// $current = "2025-04-04";
if (isset($current)) {
    $db = new MainLedgerRepository();
    $data = $db->getPurchaseHistoryByMonth($current);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>