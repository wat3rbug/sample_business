<?php
require "Tables/Finance/POLineItemRepository.php";
$partorder = $_POST["partorder"];
// $partorder = "2";

if (isset($partorder)) {
    $db = new POLineItemRepository();
    $data = $db->getLineItemsForPO($partorder);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>