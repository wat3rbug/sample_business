<?php
class PurchaseOrderRepository {

    private $conn;

    function __construct() {
        include_once("FinanceConnection.php");
        $db = new FinanceConnection();
        $servername = $db->hostname;
        $username = $db->username;
        $password = $db->password;
        $charset = "utf8mb4";
        $database = $db->database;
        $dsn = "mysql:host=$servername;dbname=$database;charset=$charset";
        $options = [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => true,
        ];
        try {
            $this->conn = new PDO($dsn, $username, $password);
        } catch (\PDOException $e) {
            throw new \PDOException($e->getMessage(), (int)$e->getCode());
        }
    }

    function createPurchaseOrder($vendor) {
        if (isset($vendor)) {
            $sql = "INSERT INTO partorders (vendor) VALUES (?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $vendor);
            $statement->execute();
        }
    }

    function getLastPurchaseOrder() {
        $sql = "SELECT * FROM partorders ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
 
    function getAllPurchaseOrders() {

    }

    function getPurchaseOrderById($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM partorders WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function updatePurchaseOrder($po) {
        $id = $po["id"];
        $vendor = $po["vendor"];
        $shipped = $po["shipped"];
        $ordered = $po["ordered"];
        $received = $po["received"];
        $eta = $po["scheduled"];
        if (isset($id) && isset($vendor)) {
            $sql = "UPDATE partorders SET vendor = ?, ordered = ?, shipped = ?, received = ?, scheduled = ? WHERE id =?";
            $statement =$this->conn->prepare($sql);
            $statement->bindParam(1, $vendor);
            $statement->bindParam(2, $ordered);
            $statement->bindParam(3, $shipped);
            $statement->bindParam(4, $received);
            $statement->bindParm(5, $eta);
            $statement->bindParam(6, $id);
            $statement->execute();
        }

    }

    function addLedgerToPO($id, $ledger) {
        if (isset($id) && isset($ledger)) {
            $sql = "UPDATE partorders SET ledger = ? WHERE id = ?";
            $statement =$this->conn->prepare($sql);
            $statement->bindParam(1, $ledger);
            $statement->bindParam(2, $id);
            $statement->execute();
        }
    }

    function getIncompletePurchaseOrders() {
        $sql = "SELECT l.name, p.*, v.name AS vendor FROM partorders AS p JOIN vendors AS v ON p.vendor = v.id JOIN ledgerentries AS l ON l.id = p.ledger WHERE received IS NULL";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function getOfficalPurchaseOrderById($id) {
        if (isset($id)) {
            $sql = "SELECT l.name, a.name AS account, l.entrytype, p.id, p.ordered, p.shipped, p.received, v.name AS vendor, p.scheduled FROM partorders AS p JOIN ledgerentries AS l ON l.id = p.ledger JOIN accounts AS a ON l.account = a.id JOIN vendors AS v ON p.vendor = v.id WHERE p.id = ?";
            $statement =$this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function shipPOById($id) {
        if (isset($id)) {
            $sql = "UPDATE partorders SET shipped = curdate() WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function receivePOById($id) {
        if (isset($id)) {
            $sql = "UPDATE partorders SET received = curdate() WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function deletePurchaseOrder($id) {
        if (isset($id)) {
            $sql = "DELETE FROM partorders WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function getVendorDeliveryStats() {
        $sql = "SELECT p.id, ABS(Datediff(received, ordered)) AS 'day', v.name AS vendor FROM partorders AS p JOIN vendors AS v ON p.vendor = v.id ORDER BY vendor, day ASC";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
}