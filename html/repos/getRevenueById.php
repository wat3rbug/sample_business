<?php
require "Tables/Finance/RevenueRepository.php";

$id = $_POST["id"];
// $id = "2";
if (isset($id)) {
    $db = new RevenueRepository();
    $data = $db->getRevenueById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>