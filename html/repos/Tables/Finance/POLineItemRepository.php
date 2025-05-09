<?php
class POLineItemRepository {

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
    function getLineItem($id) {
        if (isset($id)) {
            $sql = "SELECT * FROM polineitems WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
            $output = array();
            while ($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function addPOLineItem($lineitem) {
        $po = $lineitem["partorder"];
        $name = $lineitem["name"];
        $quantity = $lineitem["quantity"];
        $cost = $lineitem["cost"];
        if (isset($po) && isset($cost) && isset($quantity) && isset($name)) {
            $sql = "INSERT INTO polineitems (partorder, quantity, cost_per_unit, `name`) VALUES (?, ?, ?, ?)";
            $statement =$this->conn->prepare($sql);
            $statement->bindParam(1, $po);
            $statement->bindParam(2, $quantity);
            $statement->bindParam(3, $cost);
            $statement->bindParam(4, $name);
            $statement->execute();
        }
    }

    function getLineItemsForPO($po) {
        if (isset($po)) {
            $sql = "SELECT * FROM polineitems WHERE partorder = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $po);
            $statement->execute();
            $output = array();
            while($row = $statement->fetch()) {
                $output[] = $row;
            }
            return $output;
        }
    }

    function updateLineItem($lineitem) {
        $id = $lineitem["id"];
        $name = $lineitem["name"];
        $cost = $lineitem["cost"];
        $quantity = $lineitem["quantity"];
        $po = $lineitem["partorder"];

        if (isset($id) && isset($po) && isset($cost) && isset($quantity) && isset($name)) {
            $sql = "UPDATE polineitems SET partorder = ?, quantity = ?, cost_per_unit = ?, `name` = ? WHERE id = ?";
            $statement =$this->conn->prepare($sql);
            $statement->bindParam(1, $po);
            $statement->bindParam(2, $quantity);
            $statement->bindParam(3, $cost);
            $statement->bindParam(4, $name);
            $statement->bindParam(5, $id);
            $statement->execute();
        }
    }

    function deleteLineItem($id) {
        if (isset($id)) {
            $sql = "DELETE FROM polineitems WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }

    function deleteByPO($id) {
        if (isset($id)) {
            $sql = "DELETE FROM polineitems WHERE partorder = ?";
            $statement = $this->conn->prepare($sql);
            $statement->bindParam(1, $id);
            $statement->execute();
        }
    }
}