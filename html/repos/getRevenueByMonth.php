<?php
require "Tables/Finance/RevenueRepository.php";

$month = $_POST["current"];
// $month = date('y-m-d');
// var_dump($month);
if(isset($month)) {
    $db = new RevenueRepository();
    $data = $db->getRevenueByMonth($month);
    header('Content-type: application/json');
    echo json_encode($data);
}

?>