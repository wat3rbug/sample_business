<?php
require "Tables/Finance/UpdateFinanceRepository.php";
// $id = $_POST["id"];
// $name = $_POST["name"];
// $transdate = $_POST["transdate"];
// $amount = $_POST["amount"];

$id = "6";
$name = "equipment";
$transdate = "2025-04-01";
$amount = "431.96";
if (isset($id) && isset($name) && isset($amount) && isset($transdate)) {
    $cust_dict = array(
        "id" => $id,
        "transdate" => $transdate,
        "amount" => $amount,
        "name" => $name,
    );
    if (isset($cust_dict)) {
        $db = new UpdateFinanceRepository();
        $db->updateLedger($cust_dict);
        echo "made it";
    }
}
?>


