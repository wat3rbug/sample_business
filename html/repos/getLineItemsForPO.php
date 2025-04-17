<?php
require "Tables/Finance/POLineItemRepository.php";
$id = $_POST["partorder"];

if (isset($id)) {
    $db = new POLineItemRepository();
    $data = $db->getLineItemsForPO($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>