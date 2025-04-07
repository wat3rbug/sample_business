<?php
require "Tables/Finance/AccountRepository.php";

$id = $_POST["id"];
// $id = "7";
if (isset($id)) {
    $db = new AccountRepository();
    $data = $db->getAccountById($id);
    header('Content-type: application/json');
    echo json_encode($data);
} 
?>