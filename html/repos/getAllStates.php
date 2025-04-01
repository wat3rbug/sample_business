<?php
require "Tables/POS/StatesRepository.php";

$db = new StatesRepository();
$data = $db->getAllStates();
header('Content-type: application/json');
echo json_encode($data);
?>