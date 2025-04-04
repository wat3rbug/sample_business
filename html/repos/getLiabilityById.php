<?php
require "Tables/Finance/LiabilityRepository.php";

$id = $_POST["id"];
// $id = "8";
if (isset($id)) {
    $db = new LiabilityRepository();
    $data = $db->getLiabilityById($id);
    header('Content-type: application/json');
    echo json_encode($data);
}
?>
