<?php
class TransactionRepository {

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

    function addTransaction() {
        $sql = "INSERT INTO transactions (transdate) VALUES(curdate())";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
    }

    function getLastTransaction() {
        $sql = "SELECT * FROM transactions ORDER BY id DESC LIMIT 1";
        $statement = $this->conn->prepare($sql);
        $statement->execute();
        $ouput = array();
        while ($row = $statement->fetch()) {
            $output[] = $row;
        }
        return $output;
    }

    function deleteTransaction($id) {
        if (isset($id)) {
            $sql = "DELETE FROM transactions WHERE id = ?";
            $statement = $this->conn->prepare($sql);
            $sattement->bindParam(1, $id);
            $statement->execute();
        }
    }
}