<?php
require "Tables/Finance/POLineItemRepository.php";

$id = $_POST["id"];
// $id = "1";

 if (isset($id)) {
    $db = new POLineItemRepository();
    $data = $db->getLineItem($id);
    header('Content-type: application/json');
    echo json_encode($data);
 }
 ?>
