<?php
require "Tables/Finance/TagRepository.php";
$vendor = $_POST["vendor"];

// $vendor = "1";
if (isset($vendor)) {
    $db = new TagRepository();
    $data = $db->getTagsByVendor($vendor);
    header('Content-type: application/json');
    echo json_encode($data);
}