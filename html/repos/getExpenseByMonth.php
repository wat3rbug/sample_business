<?php
require "Tables/Finance/ExpenseRepository.php";

$month = $_POST["current"];
// $month = date('y-m-d');
// var_dump($month);
if(isset($month)) {
    $db = new ExpenseRepository();
    $data = $db->getExpenseByMonth($month);
    header('Content-type: application/json');
    echo json_encode($data);
}

?>