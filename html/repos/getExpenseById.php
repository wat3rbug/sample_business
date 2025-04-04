<?php
require "Tables/Finance/ExpenseRepository.php";

$id = $_POST["id"];
// $id = "2";
if (isset($id)) {
    $db = new ExpenseRepository();
    $data = $db->getExpenseById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>