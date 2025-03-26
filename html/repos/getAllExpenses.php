<?php
require "Tables/Finance/ExpenseRepository.php";

$db = new ExpenseRepository();
$data = $db->getAllExpenses();
header('Content-type: application/json');
echo json_encode($data);
?>