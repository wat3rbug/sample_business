<?php
class InventoryRepository {

    private $conn;

    function __construct() {
        include_once("OrderConnection.php");
        $db = new OrderConnection();
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

    function addInventory($data) {
        $product = $data["product"];
        $amount = $data["amount"];
        if (isset($amount) && isset($product)) {
            $sql = "INSERT INTO inventory (product, amount) VALUES (?, ?)";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $product);
            $statement->bindParam(2, $amount);
            $statement->execute();
        }

    }

    function increaseInventory($id) {
        if (isset($id)) {
            $sql = "UPDATE inventory SET amount = amount + 1 WHERE product = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function decreaseInventory($id) {
        // fix this so it doesnt update if 0, no neg numbers
        if (isset($id)) {
            $sql = "UPDATE inventory SET amount = amount - 1 WHERE product = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function getInventory() {
        $sql = "SELECT * FROM inventory AS i JOIN products AS p on i.product = p.id";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $output = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }
}